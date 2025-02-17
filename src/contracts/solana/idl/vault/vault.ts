export type IdlVault = {
  address: 'GtTBznMzJiND5niGV3az8LLnUbNLphqkJVHDKuCt2VYy';
  metadata: {
    name: 'vaultStaking';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'claimReward';
      discriminator: [149, 95, 181, 242, 94, 90, 158, 162];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'vaultConfig';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vaultTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'vaultConfig';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: 'stakerInfoPda';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              },
              {
                kind: 'account';
                path: 'signer';
              }
            ];
          };
        },
        {
          name: 'stakerTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'signer';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: 'stakeCurrencyMint';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
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
      name: 'createVault';
      discriminator: [29, 237, 247, 208, 193, 82, 54, 135];
      accounts: [
        {
          name: 'admin';
          writable: true;
          signer: true;
        },
        {
          name: 'authority';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              }
            ];
          };
        },
        {
          name: 'stakeCurrencyMint';
        },
        {
          name: 'vaultConfig';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vaultTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'vaultConfig';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        }
      ];
      args: [
        {
          name: 'rps';
          type: 'u64';
        },
        {
          name: 'minAprBps';
          type: 'u64';
        }
      ];
    },
    {
      name: 'initialize';
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'authority';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              }
            ];
          };
        },
        {
          name: 'pause';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [112, 97, 117, 115, 101];
              }
            ];
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'stake';
      discriminator: [206, 176, 202, 18, 200, 209, 179, 108];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'vaultConfig';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vaultTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'vaultConfig';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: 'stakerInfoPda';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              },
              {
                kind: 'account';
                path: 'signer';
              }
            ];
          };
        },
        {
          name: 'stakerTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'signer';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: 'stakeCurrencyMint';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
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
      name: 'unstake';
      discriminator: [90, 95, 107, 42, 205, 124, 50, 225];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'vaultConfig';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vaultTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'vaultConfig';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: 'stakerInfoPda';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              },
              {
                kind: 'account';
                path: 'signer';
              }
            ];
          };
        },
        {
          name: 'stakerTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'signer';
              },
              {
                kind: 'const';
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
            program: {
              kind: 'const';
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: 'stakeCurrencyMint';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
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
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'updateVault';
      discriminator: [67, 229, 185, 188, 226, 11, 210, 60];
      accounts: [
        {
          name: 'admin';
          writable: true;
          signer: true;
        },
        {
          name: 'authority';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121];
              }
            ];
          };
        },
        {
          name: 'vaultConfig';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'vault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: 'account';
                path: 'stakeCurrencyMint';
              }
            ];
          };
        },
        {
          name: 'stakeCurrencyMint';
        }
      ];
      args: [
        {
          name: 'rps';
          type: 'u64';
        },
        {
          name: 'minAprBps';
          type: 'u64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'authority';
      discriminator: [36, 108, 254, 18, 167, 144, 27, 36];
    },
    {
      name: 'pause';
      discriminator: [168, 183, 252, 225, 28, 17, 138, 174];
    },
    {
      name: 'stakerInfo';
      discriminator: [241, 238, 149, 141, 241, 59, 35, 107];
    },
    {
      name: 'vault';
      discriminator: [211, 8, 232, 43, 2, 152, 117, 119];
    },
    {
      name: 'vaultConfig';
      discriminator: [99, 86, 43, 216, 184, 102, 119, 77];
    }
  ];
  events: [
    {
      name: 'eventNewVault';
      discriminator: [62, 85, 178, 155, 210, 80, 16, 125];
    },
    {
      name: 'eventStake';
      discriminator: [193, 220, 225, 33, 201, 27, 61, 43];
    },
    {
      name: 'eventUnstake';
      discriminator: [7, 14, 248, 129, 43, 55, 41, 104];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'notStaked';
      msg: 'Tokens not staked';
    },
    {
      code: 6001;
      name: 'noTokens';
      msg: 'No Tokens';
    },
    {
      code: 6002;
      name: 'overflowError';
      msg: 'overflow';
    },
    {
      code: 6003;
      name: 'incorrectAuthority';
      msg: 'incorrectAuthority';
    },
    {
      code: 6004;
      name: 'invalidAmount';
      msg: 'invalidAmount';
    }
  ];
  types: [
    {
      name: 'authority';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'admin';
            type: 'pubkey';
          },
          {
            name: 'pendingAdmin';
            type: 'pubkey';
          }
        ];
      };
    },
    {
      name: 'eventNewVault';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'rps';
            type: 'u64';
          },
          {
            name: 'minAprBps';
            type: 'u64';
          },
          {
            name: 'stakeCurrencyMint';
            type: 'pubkey';
          }
        ];
      };
    },
    {
      name: 'eventStake';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'stakeCurrencyMint';
            type: 'pubkey';
          },
          {
            name: 'staker';
            type: 'pubkey';
          },
          {
            name: 'amount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'eventUnstake';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'stakeCurrencyMint';
            type: 'pubkey';
          },
          {
            name: 'staker';
            type: 'pubkey';
          },
          {
            name: 'amount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'pause';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'paused';
            type: 'bool';
          }
        ];
      };
    },
    {
      name: 'stakerInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'staker';
            type: 'pubkey';
          },
          {
            name: 'index';
            type: 'f64';
          },
          {
            name: 'pendingReward';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'vault';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'totalStaked';
            docs: ['total staked'];
            type: 'u64';
          },
          {
            name: 'globalIndex';
            type: 'f64';
          },
          {
            name: 'lastUpdated';
            type: 'i64';
          }
        ];
      };
    },
    {
      name: 'vaultConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            docs: ['Bump seed used to generate the program address / authority'];
            type: {
              array: ['u8', 1];
            };
          },
          {
            name: 'stakeCurrencyMint';
            docs: ['currency mint of token to stake'];
            type: 'pubkey';
          },
          {
            name: 'rps';
            type: 'u64';
          },
          {
            name: 'minAprBps';
            type: 'u64';
          }
        ];
      };
    }
  ];
};

export const idlVault: IdlVault = {
  address: 'GtTBznMzJiND5niGV3az8LLnUbNLphqkJVHDKuCt2VYy',
  metadata: {
    name: 'vaultStaking',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'claimReward',
      discriminator: [149, 95, 181, 242, 94, 90, 158, 162],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'vaultConfig',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vaultTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'vaultConfig',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123,
                216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'stakerInfoPda',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
              {
                kind: 'account',
                path: 'signer',
              },
            ],
          },
        },
        {
          name: 'stakerTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'signer',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123,
                216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'stakeCurrencyMint',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
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
      name: 'createVault',
      discriminator: [29, 237, 247, 208, 193, 82, 54, 135],
      accounts: [
        {
          name: 'admin',
          writable: true,
          signer: true,
        },
        {
          name: 'authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'stakeCurrencyMint',
        },
        {
          name: 'vaultConfig',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vaultTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'vaultConfig',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123,
                216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [
        {
          name: 'rps',
          type: 'u64',
        },
        {
          name: 'minAprBps',
          type: 'u64',
        },
      ],
    },
    {
      name: 'initialize',
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'authority',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'pause',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 97, 117, 115, 101],
              },
            ],
          },
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'stake',
      discriminator: [206, 176, 202, 18, 200, 209, 179, 108],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'vaultConfig',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vaultTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'vaultConfig',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123,
                216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'stakerInfoPda',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
              {
                kind: 'account',
                path: 'signer',
              },
            ],
          },
        },
        {
          name: 'stakerTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'signer',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123,
                216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'stakeCurrencyMint',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
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
      name: 'unstake',
      discriminator: [90, 95, 107, 42, 205, 124, 50, 225],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'vaultConfig',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vaultTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'vaultConfig',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123,
                216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'stakerInfoPda',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
              {
                kind: 'account',
                path: 'signer',
              },
            ],
          },
        },
        {
          name: 'stakerTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'signer',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123,
                216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'stakeCurrencyMint',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
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
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updateVault',
      discriminator: [67, 229, 185, 188, 226, 11, 210, 60],
      accounts: [
        {
          name: 'admin',
          writable: true,
          signer: true,
        },
        {
          name: 'authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'vaultConfig',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: 'account',
                path: 'stakeCurrencyMint',
              },
            ],
          },
        },
        {
          name: 'stakeCurrencyMint',
        },
      ],
      args: [
        {
          name: 'rps',
          type: 'u64',
        },
        {
          name: 'minAprBps',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'authority',
      discriminator: [36, 108, 254, 18, 167, 144, 27, 36],
    },
    {
      name: 'pause',
      discriminator: [168, 183, 252, 225, 28, 17, 138, 174],
    },
    {
      name: 'stakerInfo',
      discriminator: [241, 238, 149, 141, 241, 59, 35, 107],
    },
    {
      name: 'vault',
      discriminator: [211, 8, 232, 43, 2, 152, 117, 119],
    },
    {
      name: 'vaultConfig',
      discriminator: [99, 86, 43, 216, 184, 102, 119, 77],
    },
  ],
  events: [
    {
      name: 'eventNewVault',
      discriminator: [62, 85, 178, 155, 210, 80, 16, 125],
    },
    {
      name: 'eventStake',
      discriminator: [193, 220, 225, 33, 201, 27, 61, 43],
    },
    {
      name: 'eventUnstake',
      discriminator: [7, 14, 248, 129, 43, 55, 41, 104],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'notStaked',
      msg: 'Tokens not staked',
    },
    {
      code: 6001,
      name: 'noTokens',
      msg: 'No Tokens',
    },
    {
      code: 6002,
      name: 'overflowError',
      msg: 'overflow',
    },
    {
      code: 6003,
      name: 'incorrectAuthority',
      msg: 'incorrectAuthority',
    },
    {
      code: 6004,
      name: 'invalidAmount',
      msg: 'invalidAmount',
    },
  ],
  types: [
    {
      name: 'authority',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'pubkey',
          },
          {
            name: 'pendingAdmin',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'eventNewVault',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'rps',
            type: 'u64',
          },
          {
            name: 'minAprBps',
            type: 'u64',
          },
          {
            name: 'stakeCurrencyMint',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'eventStake',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stakeCurrencyMint',
            type: 'pubkey',
          },
          {
            name: 'staker',
            type: 'pubkey',
          },
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'eventUnstake',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stakeCurrencyMint',
            type: 'pubkey',
          },
          {
            name: 'staker',
            type: 'pubkey',
          },
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'pause',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'paused',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'stakerInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'staker',
            type: 'pubkey',
          },
          {
            name: 'index',
            type: 'f64',
          },
          {
            name: 'pendingReward',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'vault',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'totalStaked',
            docs: ['total staked'],
            type: 'u64',
          },
          {
            name: 'globalIndex',
            type: 'f64',
          },
          {
            name: 'lastUpdated',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'vaultConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            docs: ['Bump seed used to generate the program address / authority'],
            type: {
              array: ['u8', 1],
            },
          },
          {
            name: 'stakeCurrencyMint',
            docs: ['currency mint of token to stake'],
            type: 'pubkey',
          },
          {
            name: 'rps',
            type: 'u64',
          },
          {
            name: 'minAprBps',
            type: 'u64',
          },
        ],
      },
    },
  ],
};
