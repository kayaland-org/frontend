import {ChainId, ETHER, WETH, Token, Pair, TokenAmount, Trade, CurrencyAmount, JSBI} from '@uniswap/sdk'
import ERC20_ABI from '../utils/contracts/erc20.json'
import ERC20_BYTES32_ABI from '../utils/contracts/erc20_bytes32.json'
import {abi as IUniswapV2Pair} from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { parseUnits } from '@ethersproject/units'
import flatMap from 'lodash.flatmap'
import { parseBytes32String } from '@ethersproject/strings'

export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')

const WETH_ONLY = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR]
}

const chainId = process.env.NODE_ENV === 'production' ? 1 : 1
let Web3

const PairState = {
  LOADING: 0,
  NOT_EXISTS: 1,
  EXISTS: 2,
  INVALID: 3
}

function wrappedCurrency (currency, chainId) {
  return chainId && currency === ETHER ? WETH[chainId] : currency instanceof Token ? currency : undefined
}

export function useCurrency (currencyId, WEB3) {
  Web3 = WEB3
  const isETH = currencyId.toUpperCase() === 'ETH'
  const token = isETH ? undefined : useToken(currencyId)
  return isETH ? ETHER : token
}

async function useToken (currencyId) {
  let tokenContract = new Web3.eth.Contract(ERC20_ABI, currencyId)
  let allRes
  if (currencyId) {
    try {
      let tokenName = tokenContract.methods.name().call()
      let tokenSymbol = tokenContract.methods.symbol().call()
      let tokenDecimals = tokenContract.methods.decimals().call()
      allRes = await Promise.all([tokenName, tokenSymbol, tokenDecimals])
      return new Token(
        chainId,
        currencyId,
        allRes[2],
        allRes[1],
        allRes[0]
      )
    } catch (e) {
      let tokenContractBytes32 = new Web3.eth.Contract(ERC20_BYTES32_ABI, currencyId)
      let tokenName = tokenContractBytes32.methods.name().call()
      let tokenSymbol = tokenContractBytes32.methods.symbol().call()
      let tokenDecimals = tokenContract.methods.decimals().call()
      allRes = await Promise.all([tokenName, tokenSymbol, tokenDecimals])
      return new Token(
        chainId,
        currencyId,
        allRes[2],
        parseStringOrBytes32(undefined, allRes[1], 'UNKNOWN'),
        parseStringOrBytes32(undefined, allRes[0], 'Unknown Token')
      )
    }
  }
}
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/
function parseStringOrBytes32 (str, bytes32, defaultValue) {
  return str && str.length > 0
    ? str
    : bytes32 && BYTES32_REGEX.test(bytes32)
      ? parseBytes32String(bytes32)
      : defaultValue
}
const CUSTOM_BASES = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  }
}

async function usePairs (currencies) {
  const tokens = currencies.map(([currencyA, currencyB]) => [
    wrappedCurrency(currencyA, chainId),
    wrappedCurrency(currencyB, chainId)
  ])
  const pairAddresses = tokens.map(([tokenA, tokenB]) => {
    return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
  })
  let pairRes = []
  for (let i = 0; i < pairAddresses.length; i++) {
    let pairContract = new Web3.eth.Contract(IUniswapV2Pair, pairAddresses[i])
    pairRes.push(pairContract.methods.getReserves().call().then(result => result)
      .catch(e => undefined))
  }
  let allPairs = await Promise.all(pairRes)
  allPairs = allPairs.map((result, i) => {
    const tokenA = tokens[i][0]
    const tokenB = tokens[i][1]
    if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
    if (!result) return [PairState.NOT_EXISTS, null]
    const { reserve0, reserve1 } = result
    const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
    return [
      PairState.EXISTS,
      new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
    ]
  })
  return allPairs
}

export async function useAllCommonPairs (currencyA, currencyB) {
  const bases = chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : []
  const tokenA = chainId ? wrappedCurrency(currencyA, chainId) : undefined
  const tokenB = chainId ? wrappedCurrency(currencyB, chainId) : undefined
  const basePairs = flatMap(bases, (base) => bases.map(otherBase => [base, otherBase])).filter(
    ([t0, t1]) => t0.address !== t1.address
  )
  const allPairCombinations = tokenA && tokenB
    ? [
      // the direct pair
      [tokenA, tokenB],
      // token A against all bases
      ...bases.map((base) => [tokenA, base]),
      // token B against all bases
      ...bases.map((base) => [tokenB, base]),
      // each base against all bases
      ...basePairs
    ]
      .filter((tokens) => Boolean(tokens[0] && tokens[1]))
      .filter(([t0, t1]) => t0.address !== t1.address)
      .filter(([tokenA, tokenB]) => {
        if (!chainId) return true
        const customBases = CUSTOM_BASES[chainId]
        if (!customBases) return true

        const customBasesA = customBases[tokenA.address]
        const customBasesB = customBases[tokenB.address]

        if (!customBasesA && !customBasesB) return true

        if (customBasesA && !customBasesA.find(base => tokenB.equals(base))) return false
        if (customBasesB && !customBasesB.find(base => tokenA.equals(base))) return false

        return true
      })
    : []
  const allPairs = await usePairs(allPairCombinations)
  return Object.values(
    allPairs
      // filter out invalid pairs
      .filter((result) => Boolean(result[0] === PairState.EXISTS && result[1]))
    // filter out duplicated pairs
      .reduce((memo, [, curr]) => {
        memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ? memo[curr.liquidityToken.address] : curr
        return memo
      }, {})
  )
}

function tryParseAmount (value, currency) {
  if (!value || !currency) {
    return undefined
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}

export async function useTradeExact (currencyA, currencyB, amount, typy) {
  if (typy === 'in') {
    let allowedPairs = await useAllCommonPairs(currencyA, currencyB)
    let amount_ = tryParseAmount(amount, currencyA)
    if (amount_ && currencyB && allowedPairs.length > 0) {
      let res = await Trade.bestTradeExactIn(allowedPairs, amount_, currencyB, {maxHops: 3, maxNumResults: 1})[0]
      return res
    }
    return null
  } else {
    let allowedPairs = await useAllCommonPairs(currencyB, currencyA)
    let amount_ = tryParseAmount(amount, currencyA)
    if (amount_ && currencyB && allowedPairs.length > 0) {
      let res = await Trade.bestTradeExactOut(allowedPairs, currencyB, amount_, { maxHops: 3, maxNumResults: 1 })[0]
      return res
    }
    return null
  }
}
