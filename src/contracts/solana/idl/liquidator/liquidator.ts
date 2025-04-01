import { liquidatorProgramId } from 'src/constants/contractAddress/solana';

export type IdlLiquidator = {
  address: typeof liquidatorProgramId;
  metadata: {
    name: 'liquidatorPool';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'claimLiquidatorPoolReward';
      discriminator: [21, 222, 242, 44, 155, 222, 107, 36];
      accounts: [
        {
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'pool';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76];
              }
            ];
          };
        },
        {
          name: 'lpAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 80, 95, 80, 82, 79, 86, 73, 68, 69, 82];
              },
              {
                kind: 'account';
                path: 'pool';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'userCollateralAccount';
          writable: true;
        },
        {
          name: 'poolCollateralAccount';
          writable: true;
        },
        {
          name: 'collateral';
          writable: true;
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        }
      ];
      args: [];
    },
    {
      name: 'depositLiquidatorPool';
      discriminator: [76, 178, 75, 237, 247, 15, 192, 122];
      accounts: [
        {
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        },
        {
          name: 'pool';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76];
              }
            ];
          };
        },
        {
          name: 'lpAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 80, 95, 80, 82, 79, 86, 73, 68, 69, 82];
              },
              {
                kind: 'account';
                path: 'pool';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'userStablecoinAccount';
          writable: true;
        },
        {
          name: 'poolStablecoinAccount';
          writable: true;
        },
        {
          name: 'stablecoinMint';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'editLiquidatorPool';
      discriminator: [148, 96, 240, 91, 150, 88, 224, 207];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        },
        {
          name: 'pool';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76];
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'fields';
          type: {
            defined: {
              name: 'updateLiquidatorPoolFields';
            };
          };
        }
      ];
    },
    {
      name: 'editLiquidatorPoolCollateral';
      discriminator: [177, 7, 171, 122, 209, 82, 216, 121];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        },
        {
          name: 'pool';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76];
              }
            ];
          };
        },
        {
          name: 'newCollateral';
          optional: true;
        },
        {
          name: 'oldCollateral';
          optional: true;
        }
      ];
      args: [];
    },
    {
      name: 'editLiquidatorPoolController';
      discriminator: [171, 148, 250, 117, 109, 100, 162, 216];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        }
      ];
      args: [
        {
          name: 'fields';
          type: {
            defined: {
              name: 'editLiquidatorPoolControllerFields';
            };
          };
        }
      ];
    },
    {
      name: 'initializeLiquidatorPool';
      discriminator: [242, 44, 139, 100, 14, 102, 34, 89];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        },
        {
          name: 'pool';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76];
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'supplyCap';
          type: 'u64';
        }
      ];
    },
    {
      name: 'initializeLiquidatorPoolController';
      discriminator: [162, 7, 182, 247, 43, 94, 148, 205];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        },
        {
          name: 'stablecoinMint';
        },
        {
          name: 'liquidator';
          docs: ['CHECK'];
          writable: true;
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'liquidateWithLiquidatorPool';
      discriminator: [82, 218, 152, 158, 238, 188, 192, 44];
      accounts: [
        {
          name: 'liquidator';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        },
        {
          name: 'pool';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76];
              }
            ];
          };
        },
        {
          name: 'liquidatorStablecoinAccount';
          writable: true;
        },
        {
          name: 'poolStablecoinAccount';
          writable: true;
        },
        {
          name: 'stablecoinMint';
          writable: true;
        },
        {
          name: 'collateral';
          writable: true;
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        }
      ];
      args: [
        {
          name: 'collateralAmount';
          type: 'u64';
        },
        {
          name: 'repayAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'updateLiquidatorPoolAuthority';
      discriminator: [218, 108, 148, 17, 175, 45, 143, 11];
      accounts: [
        {
          name: 'newAuthority';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: 'withdrawLiquidityPool';
      discriminator: [253, 35, 65, 120, 197, 101, 176, 225];
      accounts: [
        {
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82];
              }
            ];
          };
        },
        {
          name: 'pool';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76];
              }
            ];
          };
        },
        {
          name: 'lpAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 80, 95, 80, 82, 79, 86, 73, 68, 69, 82];
              },
              {
                kind: 'account';
                path: 'pool';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'userStablecoinAccount';
          writable: true;
        },
        {
          name: 'poolStablecoinAccount';
          writable: true;
        },
        {
          name: 'stablecoinMint';
          writable: true;
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'controller';
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110];
    },
    {
      name: 'liquidatorPool';
      discriminator: [56, 163, 231, 120, 120, 3, 115, 26];
    },
    {
      name: 'lpProvider';
      discriminator: [161, 78, 184, 131, 158, 0, 254, 131];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'invalidAuthority';
      msg: 'Only the Program initializer authority can access this instructions.';
    },
    {
      code: 6001;
      name: 'invalidCollateralMint';
      msg: "The provided collateral mint does not match the depository's collateral mint.";
    },
    {
      code: 6002;
      name: 'invalidStablecoinMint';
      msg: "The Stablecoin Mint provided does not match the Stability Pool's one.";
    },
    {
      code: 6003;
      name: 'invalidOwner';
      msg: 'The provided token account is not owner by the expected party.';
    },
    {
      code: 6004;
      name: 'invalidDepositoryCollateral';
      msg: "The provided depository collateral does not match the depository's one.";
    },
    {
      code: 6005;
      name: 'invalidAccount';
      msg: 'Invalid account provided.';
    },
    {
      code: 6006;
      name: 'stabilityPoolSupplyCapExceeded';
      msg: 'The supplied stablecoin in stability pool exceeds its supply cap';
    },
    {
      code: 6007;
      name: 'invalidLiquidator';
      msg: 'The liquidator is not whitelisted';
    },
    {
      code: 6008;
      name: 'invalidCollateralAmount';
      msg: 'Collateral amount cannot be 0';
    },
    {
      code: 6009;
      name: 'invalidStablecoinAmount';
      msg: 'Stablecoin amount must be > 0 in order to redeem.';
    },
    {
      code: 6010;
      name: 'programAlreadyFrozenOrResumed';
      msg: 'Program is already frozen/resumed.';
    },
    {
      code: 6011;
      name: 'programFrozen';
      msg: 'The program is currently in Frozen state.';
    },
    {
      code: 6012;
      name: 'authorityPulled';
      msg: 'The authority of this program has been pulled.';
    },
    {
      code: 6013;
      name: 'nonZeroCollateralState';
      msg: 'The collateral state still has some amount left.';
    },
    {
      code: 6014;
      name: 'collateralNotFound';
      msg: 'The provided collateral does not exist in the pool.';
    },
    {
      code: 6015;
      name: 'noEmptyCollateralSlot';
      msg: 'The pool is already full.';
    }
  ];
  types: [
    {
      name: 'collateralDistributedState';
      serialization: 'bytemuck';
      repr: {
        kind: 'c';
      };
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'sum';
            type: {
              array: ['f64', 8];
            };
          },
          {
            name: 'index';
            type: {
              array: ['u8', 8];
            };
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 0];
            };
          }
        ];
      };
    },
    {
      name: 'controller';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'pubkey';
          },
          {
            name: 'pendingAuthority';
            type: 'pubkey';
          },
          {
            name: 'stablecoinMint';
            type: 'pubkey';
          },
          {
            name: 'liquidator';
            type: 'pubkey';
          }
        ];
      };
    },
    {
      name: 'editLiquidatorPoolControllerFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'stablecoinMint';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'newLiquidator';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'newAuthority';
            type: {
              option: 'pubkey';
            };
          }
        ];
      };
    },
    {
      name: 'liquidatorPool';
      serialization: 'bytemuck';
      repr: {
        kind: 'c';
      };
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateralDistributedState';
            type: {
              array: [
                {
                  defined: {
                    name: 'collateralDistributedState';
                  };
                },
                32
              ];
            };
          },
          {
            name: 'collateralPubkey';
            type: {
              array: ['pubkey', 32];
            };
          },
          {
            name: 'currentProduct';
            type: 'f64';
          },
          {
            name: 'supply';
            type: 'u64';
          },
          {
            name: 'supplycap';
            type: 'u64';
          },
          {
            name: 'currentIndex';
            type: 'u8';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'isPaused';
            type: 'u8';
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 5];
            };
          }
        ];
      };
    },
    {
      name: 'lpProvider';
      serialization: 'bytemuck';
      repr: {
        kind: 'c';
      };
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateral';
            type: {
              array: ['pubkey', 32];
            };
          },
          {
            name: 'sum';
            type: {
              array: ['f64', 32];
            };
          },
          {
            name: 'reward';
            type: {
              array: ['u64', 32];
            };
          },
          {
            name: 'product';
            type: 'f64';
          },
          {
            name: 'supply';
            type: 'u64';
          },
          {
            name: 'index';
            type: 'u8';
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 7];
            };
          }
        ];
      };
    },
    {
      name: 'updateLiquidatorPoolFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'newSupplyCap';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'pause';
            type: {
              option: 'u8';
            };
          }
        ];
      };
    }
  ];
};

export const idlLiquidator: IdlLiquidator = {
  address: liquidatorProgramId,
  metadata: {
    name: 'liquidatorPool',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'claimLiquidatorPoolReward',
      discriminator: [21, 222, 242, 44, 155, 222, 107, 36],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'pool',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76],
              },
            ],
          },
        },
        {
          name: 'lpAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 80, 95, 80, 82, 79, 86, 73, 68, 69, 82],
              },
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'userCollateralAccount',
          writable: true,
        },
        {
          name: 'poolCollateralAccount',
          writable: true,
        },
        {
          name: 'collateral',
          writable: true,
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
      ],
      args: [],
    },
    {
      name: 'depositLiquidatorPool',
      discriminator: [76, 178, 75, 237, 247, 15, 192, 122],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76],
              },
            ],
          },
        },
        {
          name: 'lpAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 80, 95, 80, 82, 79, 86, 73, 68, 69, 82],
              },
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'userStablecoinAccount',
          writable: true,
        },
        {
          name: 'poolStablecoinAccount',
          writable: true,
        },
        {
          name: 'stablecoinMint',
          writable: true,
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'editLiquidatorPool',
      discriminator: [148, 96, 240, 91, 150, 88, 224, 207],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76],
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'fields',
          type: {
            defined: {
              name: 'updateLiquidatorPoolFields',
            },
          },
        },
      ],
    },
    {
      name: 'editLiquidatorPoolCollateral',
      discriminator: [177, 7, 171, 122, 209, 82, 216, 121],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76],
              },
            ],
          },
        },
        {
          name: 'newCollateral',
          optional: true,
        },
        {
          name: 'oldCollateral',
          optional: true,
        },
      ],
      args: [],
    },
    {
      name: 'editLiquidatorPoolController',
      discriminator: [171, 148, 250, 117, 109, 100, 162, 216],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'fields',
          type: {
            defined: {
              name: 'editLiquidatorPoolControllerFields',
            },
          },
        },
      ],
    },
    {
      name: 'initializeLiquidatorPool',
      discriminator: [242, 44, 139, 100, 14, 102, 34, 89],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76],
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'supplyCap',
          type: 'u64',
        },
      ],
    },
    {
      name: 'initializeLiquidatorPoolController',
      discriminator: [162, 7, 182, 247, 43, 94, 148, 205],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
        {
          name: 'stablecoinMint',
        },
        {
          name: 'liquidator',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'liquidateWithLiquidatorPool',
      discriminator: [82, 218, 152, 158, 238, 188, 192, 44],
      accounts: [
        {
          name: 'liquidator',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76],
              },
            ],
          },
        },
        {
          name: 'liquidatorStablecoinAccount',
          writable: true,
        },
        {
          name: 'poolStablecoinAccount',
          writable: true,
        },
        {
          name: 'stablecoinMint',
          writable: true,
        },
        {
          name: 'collateral',
          writable: true,
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
      ],
      args: [
        {
          name: 'collateralAmount',
          type: 'u64',
        },
        {
          name: 'repayAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updateLiquidatorPoolAuthority',
      discriminator: [218, 108, 148, 17, 175, 45, 143, 11],
      accounts: [
        {
          name: 'newAuthority',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
      ],
      args: [],
    },
    {
      name: 'withdrawLiquidityPool',
      discriminator: [253, 35, 65, 120, 197, 101, 176, 225],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [67, 79, 78, 84, 82, 79, 76, 76, 69, 82],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 73, 81, 85, 73, 68, 65, 84, 79, 82, 95, 80, 79, 79, 76],
              },
            ],
          },
        },
        {
          name: 'lpAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 80, 95, 80, 82, 79, 86, 73, 68, 69, 82],
              },
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'userStablecoinAccount',
          writable: true,
        },
        {
          name: 'poolStablecoinAccount',
          writable: true,
        },
        {
          name: 'stablecoinMint',
          writable: true,
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'controller',
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110],
    },
    {
      name: 'liquidatorPool',
      discriminator: [56, 163, 231, 120, 120, 3, 115, 26],
    },
    {
      name: 'lpProvider',
      discriminator: [161, 78, 184, 131, 158, 0, 254, 131],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'invalidAuthority',
      msg: 'Only the Program initializer authority can access this instructions.',
    },
    {
      code: 6001,
      name: 'invalidCollateralMint',
      msg: "The provided collateral mint does not match the depository's collateral mint.",
    },
    {
      code: 6002,
      name: 'invalidStablecoinMint',
      msg: "The Stablecoin Mint provided does not match the Stability Pool's one.",
    },
    {
      code: 6003,
      name: 'invalidOwner',
      msg: 'The provided token account is not owner by the expected party.',
    },
    {
      code: 6004,
      name: 'invalidDepositoryCollateral',
      msg: "The provided depository collateral does not match the depository's one.",
    },
    {
      code: 6005,
      name: 'invalidAccount',
      msg: 'Invalid account provided.',
    },
    {
      code: 6006,
      name: 'stabilityPoolSupplyCapExceeded',
      msg: 'The supplied stablecoin in stability pool exceeds its supply cap',
    },
    {
      code: 6007,
      name: 'invalidLiquidator',
      msg: 'The liquidator is not whitelisted',
    },
    {
      code: 6008,
      name: 'invalidCollateralAmount',
      msg: 'Collateral amount cannot be 0',
    },
    {
      code: 6009,
      name: 'invalidStablecoinAmount',
      msg: 'Stablecoin amount must be > 0 in order to redeem.',
    },
    {
      code: 6010,
      name: 'programAlreadyFrozenOrResumed',
      msg: 'Program is already frozen/resumed.',
    },
    {
      code: 6011,
      name: 'programFrozen',
      msg: 'The program is currently in Frozen state.',
    },
    {
      code: 6012,
      name: 'authorityPulled',
      msg: 'The authority of this program has been pulled.',
    },
    {
      code: 6013,
      name: 'nonZeroCollateralState',
      msg: 'The collateral state still has some amount left.',
    },
    {
      code: 6014,
      name: 'collateralNotFound',
      msg: 'The provided collateral does not exist in the pool.',
    },
    {
      code: 6015,
      name: 'noEmptyCollateralSlot',
      msg: 'The pool is already full.',
    },
  ],
  types: [
    {
      name: 'collateralDistributedState',
      serialization: 'bytemuck',
      repr: {
        kind: 'c',
      },
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'sum',
            type: {
              array: ['f64', 8],
            },
          },
          {
            name: 'index',
            type: {
              array: ['u8', 8],
            },
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 0],
            },
          },
        ],
      },
    },
    {
      name: 'controller',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'pubkey',
          },
          {
            name: 'pendingAuthority',
            type: 'pubkey',
          },
          {
            name: 'stablecoinMint',
            type: 'pubkey',
          },
          {
            name: 'liquidator',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'editLiquidatorPoolControllerFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stablecoinMint',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'newLiquidator',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'newAuthority',
            type: {
              option: 'pubkey',
            },
          },
        ],
      },
    },
    {
      name: 'liquidatorPool',
      serialization: 'bytemuck',
      repr: {
        kind: 'c',
      },
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralDistributedState',
            type: {
              array: [
                {
                  defined: {
                    name: 'collateralDistributedState',
                  },
                },
                32,
              ],
            },
          },
          {
            name: 'collateralPubkey',
            type: {
              array: ['pubkey', 32],
            },
          },
          {
            name: 'currentProduct',
            type: 'f64',
          },
          {
            name: 'supply',
            type: 'u64',
          },
          {
            name: 'supplycap',
            type: 'u64',
          },
          {
            name: 'currentIndex',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'isPaused',
            type: 'u8',
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 5],
            },
          },
        ],
      },
    },
    {
      name: 'lpProvider',
      serialization: 'bytemuck',
      repr: {
        kind: 'c',
      },
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateral',
            type: {
              array: ['pubkey', 32],
            },
          },
          {
            name: 'sum',
            type: {
              array: ['f64', 32],
            },
          },
          {
            name: 'reward',
            type: {
              array: ['u64', 32],
            },
          },
          {
            name: 'product',
            type: 'f64',
          },
          {
            name: 'supply',
            type: 'u64',
          },
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 7],
            },
          },
        ],
      },
    },
    {
      name: 'updateLiquidatorPoolFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'newSupplyCap',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'pause',
            type: {
              option: 'u8',
            },
          },
        ],
      },
    },
  ],
};
