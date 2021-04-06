const useCurrencyArr = process.env.NODE_ENV !== 'production' ? {
  'usdt': {
    id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    name: 'USDT',
    coinGeckoId: 'tether',
    decimals: 6
  },
  'eth': {
    id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    name: 'ETH',
    coinGeckoId: 'ethereum',
    decimals: 18
  }
} : {
  'usdt': {
    id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    name: 'USDT',
    coinGeckoId: 'tether',
    decimals: 6
  },
  'eth': {
    id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    name: 'ETH',
    coinGeckoId: 'ethereum',
    decimals: 18
  }
}

const funds = process.env.NODE_ENV === 'production' ? [
  {
    address: '0xf919b5C36762999D8073aCC72A3bceBA57B07AC5',
    icon: 'icon_KFUNLF.png',
    tradeUrl: `https://app.uniswap.org/#/swap?inputCurrency=${useCurrencyArr.usdt.id}&outputCurrency=0xf919b5C36762999D8073aCC72A3bceBA57B07AC5`,
    useCurrency: useCurrencyArr.usdt,
    type: 'ACTIVE LIQUIDITY VAULT',
    decimals: 6,
    abi: [
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldCap',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newCap',
            'type': 'uint256'
          }
        ],
        'name': 'CapChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'outstandingFee',
            'type': 'uint256'
          }
        ],
        'name': 'ChargeManagementFee',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'previousController',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'newController',
            'type': 'address'
          }
        ],
        'name': 'ControllerChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolExited',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolJoined',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'account',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'chargeOutstandingManagementFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'decimals',
        'outputs': [
          {
            'internalType': 'uint8',
            'name': '',
            'type': 'uint8'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'subtractedValue',
            'type': 'uint256'
          }
        ],
        'name': 'decreaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'getCap',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getController',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getExitFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          }
        ],
        'name': 'getFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getGovernance',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getJoinFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getRewards',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getStrategist',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'addedValue',
            'type': 'uint256'
          }
        ],
        'name': 'increaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'min_management_fee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'cap',
            'type': 'uint256'
          }
        ],
        'name': 'setCap',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'controller',
            'type': 'address'
          }
        ],
        'name': 'setController',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_governance',
            'type': 'address'
          }
        ],
        'name': 'setGovernance',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_rewards',
            'type': 'address'
          }
        ],
        'name': 'setRewards',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_strategist',
            'type': 'address'
          }
        ],
        'name': 'setStrategist',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'token',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'symbol',
            'type': 'string'
          }
        ],
        'name': 'updateName',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': '_name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': '_symbol',
            'type': 'string'
          },
          {
            'internalType': 'address',
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'init',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': '_min_management_fee',
            'type': 'uint256'
          }
        ],
        'name': 'setMinManagementFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'joinPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPoolOfUnderlying',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferCash',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcKfToToken',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcTokenToKf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'assets',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      }
    ]
  },
  {
    address: '0x4696000C7022A2C72E871020429AF7644008BDC8',
    icon: 'icon_KFDFPF.png',
    tradeUrl: `https://app.uniswap.org/#/swap?inputCurrency=${useCurrencyArr.usdt.id}&outputCurrency=0x4696000C7022A2C72E871020429AF7644008BDC8`,
    useCurrency: useCurrencyArr.usdt,
    type: 'ETF VAULT',
    decimals: 6,
    abi: [
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'outstandingFee',
            'type': 'uint256'
          }
        ],
        'name': 'ChargeStreamingFee',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'previousController',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'newController',
            'type': 'address'
          }
        ],
        'name': 'ControllerChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolExited',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolJoined',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'account',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'chargeOutstandingStreamingFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'decimals',
        'outputs': [
          {
            'internalType': 'uint8',
            'name': '',
            'type': 'uint8'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'subtractedValue',
            'type': 'uint256'
          }
        ],
        'name': 'decreaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'getController',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getExitFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          }
        ],
        'name': 'getFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getGovernance',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getJoinFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getRewards',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getStrategist',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'addedValue',
            'type': 'uint256'
          }
        ],
        'name': 'increaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'controller',
            'type': 'address'
          }
        ],
        'name': 'setController',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_governance',
            'type': 'address'
          }
        ],
        'name': 'setGovernance',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_rewards',
            'type': 'address'
          }
        ],
        'name': 'setRewards',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_strategist',
            'type': 'address'
          }
        ],
        'name': 'setStrategist',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'token',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'symbol',
            'type': 'string'
          }
        ],
        'name': 'updateName',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': '_name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': '_symbol',
            'type': 'string'
          },
          {
            'internalType': 'uint256',
            'name': '_initialSupply',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'init',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'joinPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferCash',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcKfToToken',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcTokenToKf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'assets',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      }
    ]
  },
  {
    address: '0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535',
    icon: 'KFBET.png',
    tradeUrl: `https://app.uniswap.org/#/swap?inputCurrency=${useCurrencyArr.usdt.id}&outputCurrency=0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535`,
    useCurrency: useCurrencyArr.usdt,
    type: 'ETF VAULT',
    decimals: 6,
    abi: [
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldCap',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newCap',
            'type': 'uint256'
          }
        ],
        'name': 'CapChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'previousController',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'newController',
            'type': 'address'
          }
        ],
        'name': 'ControllerChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldDenominator',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newDenominator',
            'type': 'uint256'
          }
        ],
        'name': 'ExitFeeRatioChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'total',
            'type': 'uint256'
          }
        ],
        'name': 'Invest',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldDenominator',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newDenominator',
            'type': 'uint256'
          }
        ],
        'name': 'JoinFeeRatioChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolExited',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolJoined',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'liquidity',
            'type': 'uint256'
          }
        ],
        'name': 'RemoveLiquidity',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'WithdrawFee',
        'type': 'event'
      },
      {
        'inputs': [],
        'name': 'MAX_USDT_FEE',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'USDT',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'WETH',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'account',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'decimals',
        'outputs': [
          {
            'internalType': 'uint8',
            'name': '',
            'type': 'uint8'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'subtractedValue',
            'type': 'uint256'
          }
        ],
        'name': 'decreaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'getCap',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getController',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getExitFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getJoinFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'addedValue',
            'type': 'uint256'
          }
        ],
        'name': 'increaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'isExtractFee',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'pair',
        'outputs': [
          {
            'internalType': 'contract IUniswapV2Pair',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'route',
        'outputs': [
          {
            'internalType': 'contract IUniswapV2Router02',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'rpSlot',
        'outputs': [
          {
            'internalType': 'bytes32',
            'name': '',
            'type': 'bytes32'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'cap',
            'type': 'uint256'
          }
        ],
        'name': 'setCap',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'controller',
            'type': 'address'
          }
        ],
        'name': 'setController',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setExitFeeRatio',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setJoinFeeRatio',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'tokenA',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'tokenB',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_tokenA',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': '_tokenB',
            'type': 'address'
          },
          {
            'internalType': 'string',
            'name': '_name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': '_symbol',
            'type': 'string'
          }
        ],
        'name': 'init',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'joinPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'removeAll',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'withdrawFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'invest',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcKfToUsdt',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcUsdtToKf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcLiquidityDesiredByAdd',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcLiquidityDesiredByRomove',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'liquidityDesired',
            'type': 'uint256'
          }
        ],
        'name': 'calcSwapAfterDesiredAmount',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'liquidity',
            'type': 'uint256'
          }
        ],
        'name': 'calcSwapBeforeDesiredAmount',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': 'amountA',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'amountB',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalValue',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'lpBal',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'lpValue',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      }
    ]
  },
  {
    address: '0x9799e1cc190def06d14270304164a7463173d7df',
    icon: 'KFBTC.png',
    tradeUrl: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x9799e1cc190def06d14270304164a7463173d7df',
    useCurrency: useCurrencyArr.eth,
    type: 'ETF',
    decimals: 18,
    abi: [{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'}, {
      'stateMutability': 'payable',
      'type': 'fallback'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_value', 'type': 'address'}],
      'name': 'addressToBytes32',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_value', 'type': 'bytes32'}],
      'name': 'bytes32ToAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getImplementation',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPaused',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPauzer',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getProxyOwner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readBool',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'renouncePauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newImplementation', 'type': 'address'}],
      'name': 'setImplementation',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': '_value', 'type': 'bool'}],
      'name': 'setPaused',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newPauzer', 'type': 'address'}],
      'name': 'setPauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newOwner', 'type': 'address'}],
      'name': 'setProxyOwner',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'storageRead',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {'stateMutability': 'payable', 'type': 'receive'}, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Approval',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldCap',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newCap', 'type': 'uint256'}],
      'name': 'CapChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousController',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newController', 'type': 'address'}],
      'name': 'ControllerChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'ExitFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'JoinFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenOut',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountOut', 'type': 'uint256'}],
      'name': 'LOG_EXIT',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenIn',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountIn', 'type': 'uint256'}],
      'name': 'LOG_JOIN',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolExited',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolJoined',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'bool',
        'name': 'value',
        'type': 'bool'
      }],
      'name': 'PublicSwapSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousSetter',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newSetter', 'type': 'address'}],
      'name': 'PublicSwapSetterChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newFee',
        'type': 'uint256'
      }],
      'name': 'SwapFeeSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousTokenBinder',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'TokenBinderChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'TokensApproved',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Transfer',
      'type': 'event'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }],
      'name': 'allowance',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'approve',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'approveTokens',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
      'name': 'balanceOf',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'bind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'calcTokensForAmount',
      'outputs': [{'internalType': 'address[]', 'name': 'tokens', 'type': 'address[]'}, {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'decimals',
      'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'subtractedValue',
        'type': 'uint256'
      }],
      'name': 'decreaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'exitPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getBPool',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getCap',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getController',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getExitFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getJoinFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPublicSwapSetter',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getSwapFee',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokenBinder',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'token', 'type': 'address'}],
      'name': 'getTokenWeight',
      'outputs': [{'internalType': 'uint256', 'name': 'weight', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokens',
      'outputs': [{'internalType': 'address[]', 'name': '', 'type': 'address[]'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'addedValue',
        'type': 'uint256'
      }],
      'name': 'increaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'bPool', 'type': 'address'}, {
        'internalType': 'string',
        'name': 'name',
        'type': 'string'
      }, {'internalType': 'string', 'name': 'symbol', 'type': 'string'}, {
        'internalType': 'uint256',
        'name': 'initialSupply',
        'type': 'uint256'
      }],
      'name': 'init',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'isPublicSwap',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'joinPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'name',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'rebind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'rpSlot',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'cap', 'type': 'uint256'}],
      'name': 'setCap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'controller', 'type': 'address'}],
      'name': 'setController',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setExitFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setJoinFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': 'isPublic', 'type': 'bool'}],
      'name': 'setPublicSwap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newPublicSwapSetter', 'type': 'address'}],
      'name': 'setPublicSwapSetter',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'swapFee', 'type': 'uint256'}],
      'name': 'setSwapFee',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'setTokenBinder',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'symbol',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'totalSupply',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'recipient', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'transfer',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'transferFrom',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}],
      'name': 'unbind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }]
  },
  {
    address: '0x17A30d8eAAF1149f0F133f048041eb167597efb0',
    icon: 'KFDFLC.png',
    tradeUrl: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x17A30d8eAAF1149f0F133f048041eb167597efb0',
    useCurrency: useCurrencyArr.eth,
    type: 'ETF',
    decimals: 18,
    abi: [{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'}, {
      'stateMutability': 'payable',
      'type': 'fallback'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_value', 'type': 'address'}],
      'name': 'addressToBytes32',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_value', 'type': 'bytes32'}],
      'name': 'bytes32ToAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getImplementation',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPaused',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPauzer',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getProxyOwner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readBool',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'renouncePauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newImplementation', 'type': 'address'}],
      'name': 'setImplementation',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': '_value', 'type': 'bool'}],
      'name': 'setPaused',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newPauzer', 'type': 'address'}],
      'name': 'setPauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newOwner', 'type': 'address'}],
      'name': 'setProxyOwner',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'storageRead',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {'stateMutability': 'payable', 'type': 'receive'}, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Approval',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldCap',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newCap', 'type': 'uint256'}],
      'name': 'CapChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousController',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newController', 'type': 'address'}],
      'name': 'ControllerChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'ExitFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'JoinFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenOut',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountOut', 'type': 'uint256'}],
      'name': 'LOG_EXIT',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenIn',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountIn', 'type': 'uint256'}],
      'name': 'LOG_JOIN',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolExited',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolJoined',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'bool',
        'name': 'value',
        'type': 'bool'
      }],
      'name': 'PublicSwapSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousSetter',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newSetter', 'type': 'address'}],
      'name': 'PublicSwapSetterChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newFee',
        'type': 'uint256'
      }],
      'name': 'SwapFeeSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousTokenBinder',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'TokenBinderChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'TokensApproved',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Transfer',
      'type': 'event'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }],
      'name': 'allowance',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'approve',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'approveTokens',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
      'name': 'balanceOf',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'bind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'calcTokensForAmount',
      'outputs': [{'internalType': 'address[]', 'name': 'tokens', 'type': 'address[]'}, {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'decimals',
      'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'subtractedValue',
        'type': 'uint256'
      }],
      'name': 'decreaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'exitPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getBPool',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getCap',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getController',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getExitFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getJoinFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPublicSwapSetter',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getSwapFee',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokenBinder',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'token', 'type': 'address'}],
      'name': 'getTokenWeight',
      'outputs': [{'internalType': 'uint256', 'name': 'weight', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokens',
      'outputs': [{'internalType': 'address[]', 'name': '', 'type': 'address[]'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'addedValue',
        'type': 'uint256'
      }],
      'name': 'increaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'bPool', 'type': 'address'}, {
        'internalType': 'string',
        'name': 'name',
        'type': 'string'
      }, {'internalType': 'string', 'name': 'symbol', 'type': 'string'}, {
        'internalType': 'uint256',
        'name': 'initialSupply',
        'type': 'uint256'
      }],
      'name': 'init',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'isPublicSwap',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'joinPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'name',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'rebind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'rpSlot',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'cap', 'type': 'uint256'}],
      'name': 'setCap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'controller', 'type': 'address'}],
      'name': 'setController',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setExitFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setJoinFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': 'isPublic', 'type': 'bool'}],
      'name': 'setPublicSwap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newPublicSwapSetter', 'type': 'address'}],
      'name': 'setPublicSwapSetter',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'swapFee', 'type': 'uint256'}],
      'name': 'setSwapFee',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'setTokenBinder',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'symbol',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'totalSupply',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'recipient', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'transfer',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'transferFrom',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}],
      'name': 'unbind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }]
  }
] : [
  {
    address: '0xf919b5C36762999D8073aCC72A3bceBA57B07AC5',
    icon: 'icon_KFUNLF.png',
    tradeUrl: `https://app.uniswap.org/#/swap?inputCurrency=${useCurrencyArr.usdt.id}&outputCurrency=0xf919b5C36762999D8073aCC72A3bceBA57B07AC5`,
    useCurrency: useCurrencyArr.usdt,
    type: 'ACTIVE LIQUIDITY VAULT',
    decimals: 6,
    abi: [
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldCap',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newCap',
            'type': 'uint256'
          }
        ],
        'name': 'CapChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'outstandingFee',
            'type': 'uint256'
          }
        ],
        'name': 'ChargeManagementFee',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'previousController',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'newController',
            'type': 'address'
          }
        ],
        'name': 'ControllerChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolExited',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolJoined',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'account',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'chargeOutstandingManagementFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'decimals',
        'outputs': [
          {
            'internalType': 'uint8',
            'name': '',
            'type': 'uint8'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'subtractedValue',
            'type': 'uint256'
          }
        ],
        'name': 'decreaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'getCap',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getController',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getExitFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          }
        ],
        'name': 'getFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getGovernance',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getJoinFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getRewards',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getStrategist',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'addedValue',
            'type': 'uint256'
          }
        ],
        'name': 'increaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'min_management_fee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'cap',
            'type': 'uint256'
          }
        ],
        'name': 'setCap',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'controller',
            'type': 'address'
          }
        ],
        'name': 'setController',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_governance',
            'type': 'address'
          }
        ],
        'name': 'setGovernance',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_rewards',
            'type': 'address'
          }
        ],
        'name': 'setRewards',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_strategist',
            'type': 'address'
          }
        ],
        'name': 'setStrategist',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'token',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'symbol',
            'type': 'string'
          }
        ],
        'name': 'updateName',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': '_name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': '_symbol',
            'type': 'string'
          },
          {
            'internalType': 'address',
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'init',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': '_min_management_fee',
            'type': 'uint256'
          }
        ],
        'name': 'setMinManagementFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'joinPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPoolOfUnderlying',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferCash',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcKfToToken',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcTokenToKf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'assets',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      }
    ]
  },
  {
    address: '0x4696000C7022A2C72E871020429AF7644008BDC8',
    icon: 'icon_KFDFPF.png',
    tradeUrl: `https://app.uniswap.org/#/swap?inputCurrency=${useCurrencyArr.usdt.id}&outputCurrency=0x4696000C7022A2C72E871020429AF7644008BDC8`,
    useCurrency: useCurrencyArr.usdt,
    type: 'ETF VAULT',
    decimals: 6,
    abi: [
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'outstandingFee',
            'type': 'uint256'
          }
        ],
        'name': 'ChargeStreamingFee',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'previousController',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'newController',
            'type': 'address'
          }
        ],
        'name': 'ControllerChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolExited',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolJoined',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'account',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'chargeOutstandingStreamingFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'decimals',
        'outputs': [
          {
            'internalType': 'uint8',
            'name': '',
            'type': 'uint8'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'subtractedValue',
            'type': 'uint256'
          }
        ],
        'name': 'decreaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'getController',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getExitFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          }
        ],
        'name': 'getFee',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getGovernance',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getJoinFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getRewards',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getStrategist',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'pure',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'addedValue',
            'type': 'uint256'
          }
        ],
        'name': 'increaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'controller',
            'type': 'address'
          }
        ],
        'name': 'setController',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'enum SmartPoolStorage.FeeType',
            'name': 'ft',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_governance',
            'type': 'address'
          }
        ],
        'name': 'setGovernance',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_rewards',
            'type': 'address'
          }
        ],
        'name': 'setRewards',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_strategist',
            'type': 'address'
          }
        ],
        'name': 'setStrategist',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'token',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': 'symbol',
            'type': 'string'
          }
        ],
        'name': 'updateName',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'string',
            'name': '_name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': '_symbol',
            'type': 'string'
          },
          {
            'internalType': 'uint256',
            'name': '_initialSupply',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'init',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'joinPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferCash',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcKfToToken',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcTokenToKf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'assets',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      }
    ]
  },
  {
    address: '0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535',
    icon: 'KFBET.png',
    tradeUrl: `https://app.uniswap.org/#/swap?inputCurrency=${useCurrencyArr.usdt.id}&outputCurrency=0x18e9BE45B0E917b5648Eb6716ECE2dE87474E535`,
    useCurrency: useCurrencyArr.usdt,
    type: 'ETF VAULT',
    decimals: 6,
    abi: [
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldCap',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newCap',
            'type': 'uint256'
          }
        ],
        'name': 'CapChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'previousController',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'newController',
            'type': 'address'
          }
        ],
        'name': 'ControllerChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldDenominator',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newDenominator',
            'type': 'uint256'
          }
        ],
        'name': 'ExitFeeRatioChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'total',
            'type': 'uint256'
          }
        ],
        'name': 'Invest',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'setter',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'oldDenominator',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newRatio',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'newDenominator',
            'type': 'uint256'
          }
        ],
        'name': 'JoinFeeRatioChanged',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolExited',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'PoolJoined',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'liquidity',
            'type': 'uint256'
          }
        ],
        'name': 'RemoveLiquidity',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'from',
            'type': 'address'
          },
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'internalType': 'address',
            'name': 'to',
            'type': 'address'
          },
          {
            'indexed': false,
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'WithdrawFee',
        'type': 'event'
      },
      {
        'inputs': [],
        'name': 'MAX_USDT_FEE',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'USDT',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'WETH',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'account',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'decimals',
        'outputs': [
          {
            'internalType': 'uint8',
            'name': '',
            'type': 'uint8'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'subtractedValue',
            'type': 'uint256'
          }
        ],
        'name': 'decreaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'getCap',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getController',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getExitFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'getJoinFeeRatio',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'spender',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'addedValue',
            'type': 'uint256'
          }
        ],
        'name': 'increaseAllowance',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'isExtractFee',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'pair',
        'outputs': [
          {
            'internalType': 'contract IUniswapV2Pair',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'route',
        'outputs': [
          {
            'internalType': 'contract IUniswapV2Router02',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'rpSlot',
        'outputs': [
          {
            'internalType': 'bytes32',
            'name': '',
            'type': 'bytes32'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'cap',
            'type': 'uint256'
          }
        ],
        'name': 'setCap',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'controller',
            'type': 'address'
          }
        ],
        'name': 'setController',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setExitFeeRatio',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'ratio',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'denominator',
            'type': 'uint256'
          }
        ],
        'name': 'setJoinFeeRatio',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'internalType': 'string',
            'name': '',
            'type': 'string'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'tokenA',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'tokenB',
        'outputs': [
          {
            'internalType': 'address',
            'name': '',
            'type': 'address'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': 'sender',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'recipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'internalType': 'bool',
            'name': '',
            'type': 'bool'
          }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'address',
            'name': '_tokenA',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': '_tokenB',
            'type': 'address'
          },
          {
            'internalType': 'string',
            'name': '_name',
            'type': 'string'
          },
          {
            'internalType': 'string',
            'name': '_symbol',
            'type': 'string'
          }
        ],
        'name': 'init',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'joinPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'exitPool',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'removeAll',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'withdrawFee',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'name': 'invest',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcKfToUsdt',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcUsdtToKf',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcLiquidityDesiredByAdd',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'amount',
            'type': 'uint256'
          }
        ],
        'name': 'calcLiquidityDesiredByRomove',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'liquidityDesired',
            'type': 'uint256'
          }
        ],
        'name': 'calcSwapAfterDesiredAmount',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [
          {
            'internalType': 'uint256',
            'name': 'liquidity',
            'type': 'uint256'
          }
        ],
        'name': 'calcSwapBeforeDesiredAmount',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': 'amountA',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'amountB',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'totalValue',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'lpBal',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      },
      {
        'inputs': [],
        'name': 'lpValue',
        'outputs': [
          {
            'internalType': 'uint256',
            'name': '',
            'type': 'uint256'
          }
        ],
        'stateMutability': 'view',
        'type': 'function',
        'constant': true
      }
    ]
  },
  {
    address: '0x9799e1cc190def06d14270304164a7463173d7df',
    icon: 'KFBTC.png',
    tradeUrl: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x9799e1cc190def06d14270304164a7463173d7df',
    useCurrency: useCurrencyArr.eth,
    type: 'ETF',
    decimals: 18,
    abi: [{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'}, {
      'stateMutability': 'payable',
      'type': 'fallback'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_value', 'type': 'address'}],
      'name': 'addressToBytes32',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_value', 'type': 'bytes32'}],
      'name': 'bytes32ToAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getImplementation',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPaused',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPauzer',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getProxyOwner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readBool',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'renouncePauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newImplementation', 'type': 'address'}],
      'name': 'setImplementation',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': '_value', 'type': 'bool'}],
      'name': 'setPaused',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newPauzer', 'type': 'address'}],
      'name': 'setPauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newOwner', 'type': 'address'}],
      'name': 'setProxyOwner',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'storageRead',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {'stateMutability': 'payable', 'type': 'receive'}, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Approval',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldCap',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newCap', 'type': 'uint256'}],
      'name': 'CapChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousController',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newController', 'type': 'address'}],
      'name': 'ControllerChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'ExitFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'JoinFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenOut',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountOut', 'type': 'uint256'}],
      'name': 'LOG_EXIT',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenIn',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountIn', 'type': 'uint256'}],
      'name': 'LOG_JOIN',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolExited',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolJoined',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'bool',
        'name': 'value',
        'type': 'bool'
      }],
      'name': 'PublicSwapSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousSetter',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newSetter', 'type': 'address'}],
      'name': 'PublicSwapSetterChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newFee',
        'type': 'uint256'
      }],
      'name': 'SwapFeeSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousTokenBinder',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'TokenBinderChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'TokensApproved',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Transfer',
      'type': 'event'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }],
      'name': 'allowance',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'approve',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'approveTokens',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
      'name': 'balanceOf',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'bind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'calcTokensForAmount',
      'outputs': [{'internalType': 'address[]', 'name': 'tokens', 'type': 'address[]'}, {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'decimals',
      'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'subtractedValue',
        'type': 'uint256'
      }],
      'name': 'decreaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'exitPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getBPool',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getCap',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getController',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getExitFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getJoinFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPublicSwapSetter',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getSwapFee',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokenBinder',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'token', 'type': 'address'}],
      'name': 'getTokenWeight',
      'outputs': [{'internalType': 'uint256', 'name': 'weight', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokens',
      'outputs': [{'internalType': 'address[]', 'name': '', 'type': 'address[]'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'addedValue',
        'type': 'uint256'
      }],
      'name': 'increaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'bPool', 'type': 'address'}, {
        'internalType': 'string',
        'name': 'name',
        'type': 'string'
      }, {'internalType': 'string', 'name': 'symbol', 'type': 'string'}, {
        'internalType': 'uint256',
        'name': 'initialSupply',
        'type': 'uint256'
      }],
      'name': 'init',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'isPublicSwap',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'joinPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'name',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'rebind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'rpSlot',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'cap', 'type': 'uint256'}],
      'name': 'setCap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'controller', 'type': 'address'}],
      'name': 'setController',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setExitFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setJoinFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': 'isPublic', 'type': 'bool'}],
      'name': 'setPublicSwap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newPublicSwapSetter', 'type': 'address'}],
      'name': 'setPublicSwapSetter',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'swapFee', 'type': 'uint256'}],
      'name': 'setSwapFee',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'setTokenBinder',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'symbol',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'totalSupply',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'recipient', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'transfer',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'transferFrom',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}],
      'name': 'unbind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }]
  },
  {
    address: '0x17A30d8eAAF1149f0F133f048041eb167597efb0',
    icon: 'KFDFLC.png',
    tradeUrl: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x17A30d8eAAF1149f0F133f048041eb167597efb0',
    useCurrency: useCurrencyArr.eth,
    type: 'ETF',
    decimals: 18,
    abi: [{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'}, {
      'stateMutability': 'payable',
      'type': 'fallback'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_value', 'type': 'address'}],
      'name': 'addressToBytes32',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_value', 'type': 'bytes32'}],
      'name': 'bytes32ToAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'pure',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getImplementation',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPaused',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPauzer',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getProxyOwner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readAddress',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'readBool',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'renouncePauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newImplementation', 'type': 'address'}],
      'name': 'setImplementation',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': '_value', 'type': 'bool'}],
      'name': 'setPaused',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newPauzer', 'type': 'address'}],
      'name': 'setPauzer',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_newOwner', 'type': 'address'}],
      'name': 'setProxyOwner',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bytes32', 'name': '_key', 'type': 'bytes32'}],
      'name': 'storageRead',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {'stateMutability': 'payable', 'type': 'receive'}, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Approval',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldCap',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newCap', 'type': 'uint256'}],
      'name': 'CapChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousController',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newController', 'type': 'address'}],
      'name': 'ControllerChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'ExitFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'oldRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'oldDenominator', 'type': 'uint256'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newRatio',
        'type': 'uint256'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'newDenominator', 'type': 'uint256'}],
      'name': 'JoinFeeRatioChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenOut',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountOut', 'type': 'uint256'}],
      'name': 'LOG_EXIT',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'caller', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'tokenIn',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'tokenAmountIn', 'type': 'uint256'}],
      'name': 'LOG_JOIN',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolExited',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'PoolJoined',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'bool',
        'name': 'value',
        'type': 'bool'
      }],
      'name': 'PublicSwapSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousSetter',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newSetter', 'type': 'address'}],
      'name': 'PublicSwapSetterChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'setter', 'type': 'address'}, {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newFee',
        'type': 'uint256'
      }],
      'name': 'SwapFeeSet',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousTokenBinder',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'TokenBinderChanged',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'TokensApproved',
      'type': 'event'
    }, {
      'anonymous': false,
      'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address'}, {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }, {'indexed': false, 'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}],
      'name': 'Transfer',
      'type': 'event'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }],
      'name': 'allowance',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'approve',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'approveTokens',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
      'name': 'balanceOf',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'bind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'calcTokensForAmount',
      'outputs': [{'internalType': 'address[]', 'name': 'tokens', 'type': 'address[]'}, {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'decimals',
      'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'subtractedValue',
        'type': 'uint256'
      }],
      'name': 'decreaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'exitPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getBPool',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getCap',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getController',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getExitFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getJoinFeeRatio',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getPublicSwapSetter',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getSwapFee',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokenBinder',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'token', 'type': 'address'}],
      'name': 'getTokenWeight',
      'outputs': [{'internalType': 'uint256', 'name': 'weight', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'getTokens',
      'outputs': [{'internalType': 'address[]', 'name': '', 'type': 'address[]'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'spender', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'addedValue',
        'type': 'uint256'
      }],
      'name': 'increaseAllowance',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'bPool', 'type': 'address'}, {
        'internalType': 'string',
        'name': 'name',
        'type': 'string'
      }, {'internalType': 'string', 'name': 'symbol', 'type': 'string'}, {
        'internalType': 'uint256',
        'name': 'initialSupply',
        'type': 'uint256'
      }],
      'name': 'init',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'isPublicSwap',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'joinPool',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'name',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'denorm', 'type': 'uint256'}],
      'name': 'rebind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'rpSlot',
      'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'cap', 'type': 'uint256'}],
      'name': 'setCap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'controller', 'type': 'address'}],
      'name': 'setController',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setExitFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'ratio', 'type': 'uint256'}, {
        'internalType': 'uint256',
        'name': 'denominator',
        'type': 'uint256'
      }],
      'name': 'setJoinFeeRatio',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'bool', 'name': 'isPublic', 'type': 'bool'}],
      'name': 'setPublicSwap',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newPublicSwapSetter', 'type': 'address'}],
      'name': 'setPublicSwapSetter',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'swapFee', 'type': 'uint256'}],
      'name': 'setSwapFee',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newTokenBinder', 'type': 'address'}],
      'name': 'setTokenBinder',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'symbol',
      'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'totalSupply',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'recipient', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }],
      'name': 'transfer',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'sender', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}],
      'name': 'transferFrom',
      'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'tokenAddress', 'type': 'address'}],
      'name': 'unbind',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }]
  }
]
const tokens = process.env.NODE_ENV === 'production' ? {
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
    name: 'ETH',
    id: 'ethereum',
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
    trend: 'https://www.coingecko.com/coins/279/sparkline'
  },
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': {
    name: 'wBTC',
    id: 'wrapped-bitcoin',
    icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
    trend: 'https://www.coingecko.com/coins/7598/sparkline'
  },
  '0xbfCA02171BA2D492B70Fde77bEf97898f98a3744': {
    name: 'wBTC',
    id: 'wrapped-bitcoin',
    icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
    trend: 'https://www.coingecko.com/coins/7598/sparkline'
  },
  '0x514910771af9ca656af840dff83e8264ecf986ca': {
    name: 'LINK',
    id: 'chainlink',
    icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
    trend: 'https://www.coingecko.com/coins/877/sparkline'
  },
  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': {
    name: 'UNI',
    id: 'uniswap',
    icon: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    trend: 'https://www.coingecko.com/coins/12504/sparkline'
  },
  '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2': {
    name: 'MKR',
    id: 'maker',
    icon: 'https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png?1585191826',
    trend: 'https://www.coingecko.com/coins/1364/sparkline'
  },
  '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e': {
    name: 'YFI',
    id: 'yearn-finance',
    icon: 'https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330',
    trend: 'https://www.coingecko.com/coins/11849/sparkline'
  },
  '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f': {
    name: 'SNX',
    id: 'havven',
    icon: 'https://assets.coingecko.com/coins/images/3406/small/SNX.png?1598631139',
    trend: 'https://www.coingecko.com/coins/3406/sparkline'
  },
  '0x04fa0d235c4abf4bcf4787af4cf447de572ef828': {
    name: 'UMA',
    id: 'uma',
    icon: 'https://assets.coingecko.com/coins/images/10951/small/UMA.png?1586307916',
    trend: 'https://www.coingecko.com/coins/10951/sparkline'
  },
  '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d': {
    name: 'renBTC',
    id: 'renbtc',
    icon: 'https://assets.coingecko.com/coins/images/11370/small/renBTC.png?1589985711',
    trend: 'https://www.coingecko.com/coins/11370/sparkline'
  },
  '0xdac17f958d2ee523a2206206994597c13d831ec7': {
    name: 'USDT',
    id: 'tether',
    icon: 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707',
    trend: 'https://www.coingecko.com/coins/325/sparkline'
  },
  '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2': {
    name: 'SUSHI',
    id: 'sushi',
    icon: 'https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688',
    trend: 'https://www.coingecko.com/coins/12271/sparkline'
  },
  '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': {
    name: 'AAVE',
    id: 'aave',
    icon: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
    trend: 'https://www.coingecko.com/coins/12645/sparkline'
  },
  '0xc00e94cb662c3520282e6f5717214004a7f26888': {
    name: 'COMP',
    id: 'compound-governance-token',
    icon: 'https://assets.coingecko.com/coins/images/10775/thumb/COMP.png?1592625425',
    trend: 'https://www.coingecko.com/coins/10775/sparkline'
  },
  '0xc944e90c64b2c07662a292be6244bdf05cda44a7': {
    name: 'GRT',
    id: 'the-graph',
    icon: 'https://assets.coingecko.com/coins/images/13397/small_2x/Graph_Token.png',
    trend: 'https://www.coingecko.com/coins/13397/sparkline'
  }
} : {
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
    name: 'ETH',
    id: 'ethereum',
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
    trend: 'https://www.coingecko.com/coins/279/sparkline'
  },
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': {
    name: 'wBTC',
    id: 'wrapped-bitcoin',
    icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
    trend: 'https://www.coingecko.com/coins/7598/sparkline'
  },
  '0xbfCA02171BA2D492B70Fde77bEf97898f98a3744': {
    name: 'wBTC',
    id: 'wrapped-bitcoin',
    icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
    trend: 'https://www.coingecko.com/coins/7598/sparkline'
  },
  '0x514910771af9ca656af840dff83e8264ecf986ca': {
    name: 'LINK',
    id: 'chainlink',
    icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
    trend: 'https://www.coingecko.com/coins/877/sparkline'
  },
  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': {
    name: 'UNI',
    id: 'uniswap',
    icon: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    trend: 'https://www.coingecko.com/coins/12504/sparkline'
  },
  '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2': {
    name: 'MKR',
    id: 'maker',
    icon: 'https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png?1585191826',
    trend: 'https://www.coingecko.com/coins/1364/sparkline'
  },
  '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e': {
    name: 'YFI',
    id: 'yearn-finance',
    icon: 'https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330',
    trend: 'https://www.coingecko.com/coins/11849/sparkline'
  },
  '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f': {
    name: 'SNX',
    id: 'havven',
    icon: 'https://assets.coingecko.com/coins/images/3406/small/SNX.png?1598631139',
    trend: 'https://www.coingecko.com/coins/3406/sparkline'
  },
  '0x04fa0d235c4abf4bcf4787af4cf447de572ef828': {
    name: 'UMA',
    id: 'uma',
    icon: 'https://assets.coingecko.com/coins/images/10951/small/UMA.png?1586307916',
    trend: 'https://www.coingecko.com/coins/10951/sparkline'
  },
  '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d': {
    name: 'renBTC',
    id: 'renbtc',
    icon: 'https://assets.coingecko.com/coins/images/11370/small/renBTC.png?1589985711',
    trend: 'https://www.coingecko.com/coins/11370/sparkline'
  },
  '0xdac17f958d2ee523a2206206994597c13d831ec7': {
    name: 'USDT',
    id: 'tether',
    icon: 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707',
    trend: 'https://www.coingecko.com/coins/325/sparkline'
  },
  '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2': {
    name: 'SUSHI',
    id: 'sushi',
    icon: 'https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688',
    trend: 'https://www.coingecko.com/coins/12271/sparkline'
  },
  '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': {
    name: 'AAVE',
    id: 'aave',
    icon: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
    trend: 'https://www.coingecko.com/coins/12645/sparkline'
  },
  '0xc00e94cb662c3520282e6f5717214004a7f26888': {
    name: 'COMP',
    id: 'compound-governance-token',
    icon: 'https://assets.coingecko.com/coins/images/10775/thumb/COMP.png?1592625425',
    trend: 'https://www.coingecko.com/coins/10775/sparkline'
  },
  '0xc944e90c64b2c07662a292be6244bdf05cda44a7': {
    name: 'GRT',
    id: 'the-graph',
    icon: 'https://assets.coingecko.com/coins/images/13397/small_2x/Graph_Token.png',
    trend: 'https://www.coingecko.com/coins/13397/sparkline'
  }
}
const smartRecipe = process.env.NODE_ENV === 'production'
  ? {
    abi: [{
      'inputs': [{
        'internalType': 'address',
        'name': '_defaultMarket',
        'type': 'address'
      }, {'internalType': 'address', 'name': '_registry', 'type': 'address'}, {
        'internalType': 'address',
        'name': '_weth',
        'type': 'address'
      }, {'internalType': 'address payable', 'name': '_gasSponsor', 'type': 'address'}],
      'stateMutability': 'nonpayable',
      'type': 'constructor'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousOwner',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newOwner', 'type': 'address'}],
      'name': 'OwnershipTransferred',
      'type': 'event'
    }, {'stateMutability': 'payable', 'type': 'fallback'}, {
      'inputs': [{
        'internalType': 'address',
        'name': 'market',
        'type': 'address'
      }],
      'name': 'addMarket',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }, {'internalType': 'address[][]', 'name': 'paths', 'type': 'address[][]'}],
      'name': 'calcBestBuy',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'address[][]', 'name': 'paths', 'type': 'address[][]'}],
      'name': 'calcBestSell',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }, {'internalType': 'address', 'name': 'payToken', 'type': 'address'}],
      'name': 'calcBuy',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'fromToken', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'toToken',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amountIn', 'type': 'uint256'}],
      'name': 'calcMaxAmountOut',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'maxAmountOut',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amountIn', 'type': 'uint256'}, {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]'
      }],
      'name': 'calcMaxAmountsOut',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'maxAmountOut',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'fromToken', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'toToken',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amountOut', 'type': 'uint256'}],
      'name': 'calcMinAmountIn',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'minAmountIn',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amountOut', 'type': 'uint256'}, {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]'
      }],
      'name': 'calcMinAmountsIn',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'minAmountIn',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'address', 'name': 'sellToken', 'type': 'address'}],
      'name': 'calcSell',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'cleanEth',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_token', 'type': 'address'}],
      'name': 'cleanToken',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'destroy',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }, {'internalType': 'address[][]', 'name': 'paths', 'type': 'address[][]'}],
      'name': 'erc20ToKF',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }],
      'name': 'ethToKF',
      'outputs': [],
      'stateMutability': 'payable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'gasSponsor',
      'outputs': [{'internalType': 'address payable', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'minAmount', 'type': 'uint256'}, {
        'internalType': 'address[][]',
        'name': 'paths',
        'type': 'address[][]'
      }],
      'name': 'kfToErc20',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'minAmount', 'type': 'uint256'}],
      'name': 'kfToEth',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'owner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'registry',
      'outputs': [{'internalType': 'contract ISmartPoolRegistry', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}],
      'name': 'removeMarket',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'renounceOwnership',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'togglePause',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newOwner', 'type': 'address'}],
      'name': 'transferOwnership',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'weth',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {'stateMutability': 'payable', 'type': 'receive'}],
    address: '0xA1ddf5dA5C4d05EbC3dFbBf72f984F5CD87732aA'
  }
  : {
    abi: [{
      'inputs': [{
        'internalType': 'address',
        'name': '_defaultMarket',
        'type': 'address'
      }, {'internalType': 'address', 'name': '_registry', 'type': 'address'}, {
        'internalType': 'address',
        'name': '_weth',
        'type': 'address'
      }, {'internalType': 'address payable', 'name': '_gasSponsor', 'type': 'address'}],
      'stateMutability': 'nonpayable',
      'type': 'constructor'
    }, {
      'anonymous': false,
      'inputs': [{
        'indexed': true,
        'internalType': 'address',
        'name': 'previousOwner',
        'type': 'address'
      }, {'indexed': true, 'internalType': 'address', 'name': 'newOwner', 'type': 'address'}],
      'name': 'OwnershipTransferred',
      'type': 'event'
    }, {'stateMutability': 'payable', 'type': 'fallback'}, {
      'inputs': [{
        'internalType': 'address',
        'name': 'market',
        'type': 'address'
      }],
      'name': 'addMarket',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }, {'internalType': 'address[][]', 'name': 'paths', 'type': 'address[][]'}],
      'name': 'calcBestBuy',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'address[][]', 'name': 'paths', 'type': 'address[][]'}],
      'name': 'calcBestSell',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }, {'internalType': 'address', 'name': 'payToken', 'type': 'address'}],
      'name': 'calcBuy',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'fromToken', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'toToken',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amountIn', 'type': 'uint256'}],
      'name': 'calcMaxAmountOut',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'maxAmountOut',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amountIn', 'type': 'uint256'}, {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]'
      }],
      'name': 'calcMaxAmountsOut',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'maxAmountOut',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'fromToken', 'type': 'address'}, {
        'internalType': 'address',
        'name': 'toToken',
        'type': 'address'
      }, {'internalType': 'uint256', 'name': 'amountOut', 'type': 'uint256'}],
      'name': 'calcMinAmountIn',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'minAmountIn',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'uint256', 'name': 'amountOut', 'type': 'uint256'}, {
        'internalType': 'address[]',
        'name': 'path',
        'type': 'address[]'
      }],
      'name': 'calcMinAmountsIn',
      'outputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'minAmountIn',
        'type': 'uint256'
      }],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'address', 'name': 'sellToken', 'type': 'address'}],
      'name': 'calcSell',
      'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'cleanEth',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': '_token', 'type': 'address'}],
      'name': 'cleanToken',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'destroy',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }, {'internalType': 'address[][]', 'name': 'paths', 'type': 'address[][]'}],
      'name': 'erc20ToKF',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'buyAmount',
        'type': 'uint256'
      }],
      'name': 'ethToKF',
      'outputs': [],
      'stateMutability': 'payable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'gasSponsor',
      'outputs': [{'internalType': 'address payable', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'minAmount', 'type': 'uint256'}, {
        'internalType': 'address[][]',
        'name': 'paths',
        'type': 'address[][]'
      }],
      'name': 'kfToErc20',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'pool', 'type': 'address'}, {
        'internalType': 'uint256',
        'name': 'sellAmount',
        'type': 'uint256'
      }, {'internalType': 'uint256', 'name': 'minAmount', 'type': 'uint256'}],
      'name': 'kfToEth',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'owner',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'registry',
      'outputs': [{'internalType': 'contract ISmartPoolRegistry', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'market', 'type': 'address'}],
      'name': 'removeMarket',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'renounceOwnership',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'togglePause',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [{'internalType': 'address', 'name': 'newOwner', 'type': 'address'}],
      'name': 'transferOwnership',
      'outputs': [],
      'stateMutability': 'nonpayable',
      'type': 'function'
    }, {
      'inputs': [],
      'name': 'weth',
      'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
      'stateMutability': 'view',
      'type': 'function'
    }, {'stateMutability': 'payable', 'type': 'receive'}],
    address: '0xA1ddf5dA5C4d05EbC3dFbBf72f984F5CD87732aA'
  }
const WETHAddress = '0xd0a1e359811322d97991e03f863a0c30c2cf029c'

const defaultPath = {
  '0x9799e1cc190def06d14270304164a7463173d7df': {
    'pathIn': [
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D']
    ],
    'pathOut': [
      ['0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2']
    ]
  },
  '0x17A30d8eAAF1149f0F133f048041eb167597efb0': {
    'pathIn': [
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x514910771AF9Ca656af840dff83E8264EcF986CA'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828'],
      ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F']
    ],
    'pathOut': [
      ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0x514910771AF9Ca656af840dff83E8264EcF986CA', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      ['0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2']
    ]
  }
}

export {funds, tokens, smartRecipe, WETHAddress, useCurrencyArr, defaultPath}
