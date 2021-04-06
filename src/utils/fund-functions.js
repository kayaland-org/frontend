import {globalConfig} from './global-config'
import {smartRecipe, tokens as tokenDetail, defaultPath} from './contracts/fund'
import axios from 'axios'
import {useCurrency, useTradeExact} from './trade'
import {BigNumber} from 'bignumber.js'
import vaultTokens from './vault-tokens'

const getFundData = async (fundData, web3, isLocked) => {
  let [symbol, fullName] = await Promise.all([getFundName(fundData), getFundFullName(fundData)])
  fundData.symbol = symbol
  fundData.fullName = fullName
  switch (fundData.type) {
    case 'ETF':
      fundData.tokens = await getFundTokens(fundData)
      let [pathIn, pathOut, useStorage] = await handlePaths(fundData, web3)
      fundData.pathIn = pathIn
      fundData.pathOut = pathOut
      fundData.useStorage = useStorage
      let recipeContract = new web3.eth.Contract(smartRecipe.abi, smartRecipe.address)
      let [originalPriceEtf, priceEtf, priceUsdEtf] = await getFundPriceEtf(fundData, recipeContract)
      fundData.originalPrice = originalPriceEtf
      fundData.price = priceEtf
      fundData.priceUsd = priceUsdEtf
      let [aumEthEtf, aumUsdEtf] = await getFundAmountEtf(fundData, recipeContract)
      fundData.aumEth = aumEthEtf
      fundData.aumUsd = aumUsdEtf
      if (!isLocked) {
        let [balanceEtf, balanceUsdEtf] = await getFundBalanceEtf(fundData, recipeContract)
        fundData.balance = balanceEtf
        fundData.balanceUsd = balanceUsdEtf
      }
      break
    case 'ETF VAULT': case 'ACTIVE LIQUIDITY VAULT':
      fundData.tokens = vaultTokens[fundData.address]
      let [originalPriceVault, priceVault, priceUsdVault] = fundData.address === '0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535' ? await getFundPriceVaultCopy(fundData) : await getFundPriceVault(fundData)
      fundData.originalPrice = originalPriceVault
      fundData.price = priceVault
      fundData.priceUsd = priceUsdVault
      let [aumEthVault, aumUsdVault] = fundData.address === '0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535' ? await getFundAmountVaultCopy(fundData) : await getFundAmountVault(fundData)
      fundData.aumEth = aumEthVault
      fundData.aumUsd = aumUsdVault
      if (!isLocked) {
        let [balanceVault, balanceUsdVault] = fundData.address === '0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535' ? await getFundBalanceVaultCopy(fundData) : await getFundBalanceVault(fundData)
        fundData.balance = balanceVault
        fundData.balanceUsd = balanceUsdVault
      }
      break
  }
  let [[changeDay, changeDayStatus], [changeWeek, changeWeekStatus], [changeMonth, changeMonthStatus], [sinceInception, sinceInceptionStatus]] = await Promise.all([getQuoteChangeDay(fundData), getQuoteChangeWeek(fundData), getQuoteChangeMonth(fundData), getSinceInception(fundData)])
  fundData.changeDay = changeDay
  fundData.changeDayStatus = changeDayStatus
  fundData.changeWeek = changeWeek
  fundData.changeWeekStatus = changeWeekStatus
  fundData.changeMonth = changeMonth
  fundData.changeMonthStatus = changeMonthStatus
  fundData.sinceInception = sinceInception
  fundData.sinceInceptionStatus = sinceInceptionStatus
  return fundData
}

const getFundName = async (fundData) => {
  let symbol = await fundData.contract.methods.symbol().call()
  symbol = symbol.replace(/\"/g, '')
  return symbol
}
const getFundFullName = async (fundData) => {
  let fullName = await fundData.contract.methods.name().call()
  fullName = fullName.replace(/\"/g, '')
  return fullName
}

const getExchangheRate = async (ids, vsCurrency) => {
  let result = await axios.get(`${globalConfig.coinGeckoBaseUrl}/simple/price`, {params: {ids: ids, vs_currencies: 'usd'}})
  let rate = result.status === 200 ? result.data[ids][vsCurrency] : undefined
  return rate
}

const getFundTokens = async (fundData) => {
  let tokens = await fundData.contract.methods.getTokens().call()
  let tokensData = tokens.map(token => {
    for (let key in tokenDetail) {
      if (key.toLowerCase() === token.toLowerCase()) {
        let detail = tokenDetail[key]
        detail.address = key
        return detail
      }
    }
  })
  return tokensData
}
const handlePaths = async (fundData, web3) => {
  let address = fundData.address
  let localStoragePath = localStorage.getItem(address) ? JSON.parse(localStorage.getItem(address)) : undefined
  let pathIn, pathOut
  let useStorage = false
  if (localStoragePath) {
    pathIn = localStoragePath.pathIn
    pathOut = localStoragePath.pathOut
    useStorage = true
  } else {
    pathIn = defaultPath[fundData.address].pathIn
    pathOut = defaultPath[fundData.address].pathOut
    useStorage = false
    // updatePaths(fundData, web3)
  }
  return [pathIn, pathOut, useStorage]
}

const updatePaths = async (fundData, web3) => {
  let pathIn, pathOut
  pathIn = await getPaths(fundData.tokens, fundData.useCurrency, 'in', web3)
  pathOut = await getPaths(fundData.tokens, fundData.useCurrency, 'out', web3)
  localStorage.setItem(fundData.address, JSON.stringify({'pathIn': pathIn, 'pathOut': pathOut}))
}

const isPathNew = async (fundData, web3) => {
  let address = fundData.address
  let localStoragePath = localStorage.getItem(address)
  let pathIn, pathOut, paths
  let isPathNew = true
  if (localStoragePath) {
    pathIn = await getPaths(fundData.tokens, fundData.useCurrency, 'in', web3)
    pathOut = await getPaths(fundData.tokens, fundData.useCurrency, 'out', web3)
    paths = JSON.stringify({'pathIn': pathIn, 'pathOut': pathOut})
    isPathNew = localStoragePath === paths
  }
  return isPathNew
}

const getPaths = async (tokens, currency, type, web3) => {
  let currencyA = await useCurrency(currency.name.toLowerCase() === 'eth' ? 'eth' : currency.id, web3)
  let TradeExactArr = tokens.map(async (token) => {
    let currencyB = await useCurrency(token.address, web3)
    return type === 'in' ? useTradeExact(currencyA, currencyB, '1', 'in').then(result => result).catch(e => undefined) : useTradeExact(currencyB, currencyA, '1', 'in').then(result => result).catch(e => undefined)
  })
  let tradeArr = await Promise.all(TradeExactArr)
  return tradeArr.map((trade, index) => {
    if (trade) {
      let itemPath = trade.route.path.map(token => {
        return token.address
      })
      return itemPath
    } else {
      return [currency.id, currency.id]
    }
  })
}

const getFundPriceEtf = async (fundData, recipeContract) => {
  let priceRes = await recipeContract.methods.calcBestBuy(fundData.address, new BigNumber(1e18).toString(), fundData.pathIn).call()
  let originalPrice = priceRes
  let price = new BigNumber(priceRes).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).toFixed(globalConfig.fixedConfig)
  let priceUsd = new BigNumber(priceRes).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  return [originalPrice, price, priceUsd]
}

const getFundPriceVault = async (fundData) => {
  let priceRes = await fundData.contract.methods.calcKfToToken(new BigNumber(10 ** fundData.decimals).toString()).call()
  let originalPrice = priceRes
  let price = new BigNumber(priceRes).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).toFixed(globalConfig.fixedConfig)
  let priceUsd = new BigNumber(priceRes).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  return [originalPrice, price, priceUsd]
}
const getFundPriceVaultCopy = async (fundData) => {
  let priceRes = await fundData.contract.methods.calcKfToUsdt(new BigNumber(10 ** fundData.decimals).toString()).call()
  let originalPrice = priceRes
  let price = new BigNumber(priceRes).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).toFixed(globalConfig.fixedConfig)
  let priceUsd = new BigNumber(priceRes).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  return [originalPrice, price, priceUsd]
}

const getFundBalanceEtf = async (fundData, recipeContract) => {
  let balanceRes = await fundData.contract.methods.balanceOf(fundData.defaultAccount).call()
  let balance = new BigNumber(balanceRes).dividedBy(new BigNumber(1e18)).toFixed(globalConfig.fixedConfig)
  let balanceUsd, balanceUsdRes
  if (new BigNumber(balanceRes).dividedBy(new BigNumber(1e18)).comparedTo(new BigNumber(0)) === 0) {
    balanceUsd = new BigNumber(0).toFixed(globalConfig.usdFixedConfig)
  } else {
    balanceUsdRes = await recipeContract.methods.calcBestSell(fundData.address, balanceRes, fundData.pathOut).call()
    balanceUsd = new BigNumber(balanceUsdRes).dividedBy(10 ** fundData.useCurrency.decimals).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  }
  return [balance, balanceUsd]
}

const getFundBalanceVault = async (fundData) => {
  let balanceRes = await fundData.contract.methods.balanceOf(fundData.defaultAccount).call()
  let balance = new BigNumber(balanceRes).dividedBy(new BigNumber(10 ** fundData.decimals)).toFixed(globalConfig.fixedConfig)
  let balanceUsd, balanceUsdRes
  if (new BigNumber(balanceRes).dividedBy(new BigNumber(10 ** fundData.decimals)).comparedTo(new BigNumber(0)) === 0) {
    balanceUsd = new BigNumber(0).toFixed(globalConfig.usdFixedConfig)
  } else {
    balanceUsdRes = await fundData.contract.methods.calcKfToToken(balanceRes).call()
    balanceUsd = new BigNumber(balanceUsdRes).dividedBy(10 ** fundData.useCurrency.decimals).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  }
  return [balance, balanceUsd]
}
const getFundBalanceVaultCopy = async (fundData) => {
  let balanceRes = await fundData.contract.methods.balanceOf(fundData.defaultAccount).call()
  let balance = new BigNumber(balanceRes).dividedBy(new BigNumber(10 ** fundData.decimals)).toFixed(globalConfig.fixedConfig)
  let balanceUsd, balanceUsdRes
  if (new BigNumber(balanceRes).dividedBy(new BigNumber(10 ** fundData.decimals)).comparedTo(new BigNumber(0)) === 0) {
    balanceUsd = new BigNumber(0).toFixed(globalConfig.usdFixedConfig)
  } else {
    balanceUsdRes = await fundData.contract.methods.calcKfToUsdt(balanceRes).call()
    balanceUsd = new BigNumber(balanceUsdRes).dividedBy(10 ** fundData.useCurrency.decimals).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  }
  return [balance, balanceUsd]
}

const getFundAmountEtf = async (fundData, recipeContract) => {
  let totalSupplyRes = await fundData.contract.methods.totalSupply().call()
  let amount = await recipeContract.methods.calcBestBuy(fundData.address, totalSupplyRes, fundData.pathIn).call()
  let aumEth = new BigNumber(amount).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals))
  let aumUsd = new BigNumber(amount).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  return [aumEth, aumUsd]
}

const getFundAmountVault = async (fundData) => {
  let totalSupplyRes = await fundData.contract.methods.totalSupply().call()
  let amount = await fundData.contract.methods.calcKfToToken(totalSupplyRes).call()
  let aumEth = new BigNumber(amount).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals))
  let aumUsd = new BigNumber(amount).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  return [aumEth, aumUsd]
}
const getFundAmountVaultCopy = async (fundData) => {
  let totalSupplyRes = await fundData.contract.methods.totalSupply().call()
  let amount = await fundData.contract.methods.calcKfToUsdt(totalSupplyRes).call()
  let aumEth = new BigNumber(amount).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals))
  let aumUsd = new BigNumber(amount).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate)).toFixed(globalConfig.usdFixedConfig)
  return [aumEth, aumUsd]
}

const getQuoteChangeDay = async (fundData) => {
  let res = await axios.get(`${globalConfig.historyDataBaseUrl}/beast/initial_price/${getTimeZone()}/${fundData.address}/D1`)
  let changeDay, changeDayStatus
  if (res.status === 200 && res.data) {
    let historyData = new BigNumber(res.data.price).dividedBy(new BigNumber(10 ** res.data.currencyPrecision)).times(new BigNumber(res.data.rate))
    let nowPrice = new BigNumber(fundData.originalPrice).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate))
    changeDay = new BigNumber(nowPrice).minus(historyData).dividedBy(historyData).times(100).toFixed(globalConfig.percentFixedConfig)
    if (new BigNumber(changeDay).comparedTo(0) >= 0) {
      changeDayStatus = 'up'
    } else {
      changeDayStatus = 'down'
    }
  } else {
    changeDay = new BigNumber(0).toFixed(globalConfig.percentFixedConfig)
    changeDayStatus = 'up'
  }
  return [changeDay, changeDayStatus]
}

const getQuoteChangeWeek = async (fundData) => {
  let res = await axios.get(`${globalConfig.historyDataBaseUrl}/beast/initial_price/${getTimeZone()}/${fundData.address}/W1`)
  let changeWeek, changeWeekStatus
  if (res.status === 200 && res.data) {
    let historyData = new BigNumber(res.data.price).dividedBy(new BigNumber(10 ** res.data.currencyPrecision)).times(new BigNumber(res.data.rate))
    let nowPrice = new BigNumber(fundData.originalPrice).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate))
    changeWeek = new BigNumber(nowPrice).minus(historyData).dividedBy(historyData).times(100).toFixed(globalConfig.percentFixedConfig)
    if (new BigNumber(changeWeek).comparedTo(0) >= 0) {
      changeWeekStatus = 'up'
    } else {
      changeWeekStatus = 'down'
    }
  } else {
    changeWeek = new BigNumber(0).toFixed(globalConfig.percentFixedConfig)
    changeWeekStatus = 'up'
  }
  return [changeWeek, changeWeekStatus]
}

const getQuoteChangeMonth = async (fundData) => {
  let res = await axios.get(`${globalConfig.historyDataBaseUrl}/beast/initial_price/${getTimeZone()}/${fundData.address}/M1`)
  let changeMonth, changeMonthStatus
  if (res.status === 200 && res.data) {
    let historyData = new BigNumber(res.data.price).dividedBy(new BigNumber(10 ** res.data.currencyPrecision)).times(new BigNumber(res.data.rate))
    let nowPrice = new BigNumber(fundData.originalPrice).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate))
    changeMonth = new BigNumber(nowPrice).minus(historyData).dividedBy(historyData).times(100).toFixed(globalConfig.percentFixedConfig)
    if (new BigNumber(changeMonth).comparedTo(0) >= 0) {
      changeMonthStatus = 'up'
    } else {
      changeMonthStatus = 'down'
    }
  } else {
    changeMonth = new BigNumber(0).toFixed(globalConfig.percentFixedConfig)
    changeMonthStatus = 'up'
  }
  return [changeMonth, changeMonthStatus]
}

const getSinceInception = async (fundData) => {
  let res = await axios.get(`${globalConfig.historyDataBaseUrl}/beast/since_inception/${fundData.address}`)
  let sinceInception, sinceInceptionStatus
  if (res.status === 200 && res.data) {
    let historyData = new BigNumber(res.data.originalPrice).dividedBy(new BigNumber(10 ** res.data.cashTokenPrecision)).times(new BigNumber(res.data.rate))
    let nowPrice = new BigNumber(fundData.originalPrice).dividedBy(new BigNumber(10 ** fundData.useCurrency.decimals)).times(new BigNumber(fundData.useCurrency.exchangeRate))
    sinceInception = new BigNumber(nowPrice).minus(historyData).dividedBy(historyData).times(100).toFixed(globalConfig.percentFixedConfig)
    if (new BigNumber(sinceInception).comparedTo(0) >= 0) {
      sinceInceptionStatus = 'up'
    } else {
      sinceInceptionStatus = 'down'
    }
  } else {
    sinceInception = new BigNumber(0).toFixed(globalConfig.percentFixedConfig)
    sinceInceptionStatus = 'up'
  }
  return [sinceInception, sinceInceptionStatus]
}

let getTimeZone = () => {
  let timeZone = (0 - new Date().getTimezoneOffset() / 60)
  return timeZone >= 0 ? `+${timeZone}` : timeZone
}

export {getFundData, getExchangheRate, getQuoteChangeDay, getQuoteChangeWeek, getQuoteChangeMonth, getSinceInception, updatePaths}
