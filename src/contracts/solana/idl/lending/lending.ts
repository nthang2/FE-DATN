import { lendingProgramId } from 'src/constants/contractAddress/solana';

export type IdlLending = {
  address: typeof lendingProgramId;
  metadata: {
    name: 'lending';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'addCollateralRedeemConfigV2';
      discriminator: [178, 55, 142, 222, 66, 247, 207, 192];
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
          name: 'redeemConfigV2';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50];
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
          name: 'collaterals';
          type: {
            vec: 'pubkey';
          };
        }
      ];
    },
    {
      name: 'addMetadata';
      discriminator: [231, 195, 40, 240, 67, 231, 53, 136];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'mint';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
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
          name: 'metadata';
          writable: true;
        },
        {
          name: 'metadataProgram';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [
        {
          name: 'fields';
          type: {
            defined: {
              name: 'metadataFields';
            };
          };
        }
      ];
    },
    {
      name: 'addWhitelistAdmin';
      discriminator: [20, 72, 17, 49, 147, 29, 238, 218];
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
          name: 'whitelistAdminAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78];
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
          name: 'whitelistAdmins';
          type: {
            vec: 'pubkey';
          };
        }
      ];
    },
    {
      name: 'changeCollateralRedeemConfig';
      discriminator: [5, 197, 93, 80, 239, 60, 160, 17];
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
          name: 'redeemConfigV2';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50];
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
          name: 'oldCollateral';
          type: 'pubkey';
        },
        {
          name: 'newCollateral';
          type: 'pubkey';
        }
      ];
    },
    {
      name: 'changeType1Collateral';
      discriminator: [187, 28, 63, 208, 186, 236, 235, 198];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          docs: ['#2'];
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
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'oldCollateralToken';
          writable: true;
        },
        {
          name: 'newCollateralToken';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [
        {
          name: 'collateralizationRatioType1';
          type: 'u64';
        },
        {
          name: 'liquidationRatioType1';
          type: 'u64';
        },
        {
          name: 'isPausedType1';
          type: 'u8';
        }
      ];
    },
    {
      name: 'changeWhitelistAdmin';
      discriminator: [176, 113, 33, 246, 172, 77, 8, 225];
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
          name: 'whitelistAdminAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78];
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
          name: 'oldAdmin';
          type: 'pubkey';
        },
        {
          name: 'newAdmin';
          type: 'pubkey';
        }
      ];
    },
    {
      name: 'depositUsdcSmartVault';
      discriminator: [159, 229, 32, 185, 153, 72, 30, 120];
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
          name: 'collateral';
          writable: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'depositoryVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'depository';
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
                path: 'collateral';
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
          name: 'investment';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'investmentAta';
          writable: true;
        },
        {
          name: 'vaultInfo';
          writable: true;
        },
        {
          name: 'config';
          writable: true;
        },
        {
          name: 'vaultUsdcAta';
          writable: true;
        },
        {
          name: 'feeWalletUsdcAta';
          writable: true;
        },
        {
          name: 'jpowInfo';
          docs: ['CHECK', "seeds = ['USER_INFO', investment.key()]"];
          writable: true;
        },
        {
          name: 'usdcSmartVaultProgram';
          address: '8dSVJttXWeKwieWbM18Z5f36uwcjmZ7iDSSjVXqKqMvA';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'depositUsdcAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'editController';
      discriminator: [132, 153, 227, 60, 132, 180, 226, 209];
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
        }
      ];
      args: [
        {
          name: 'fields';
          type: {
            defined: {
              name: 'editControllerFields';
            };
          };
        }
      ];
    },
    {
      name: 'editInvestment';
      discriminator: [112, 37, 241, 14, 199, 60, 76, 58];
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
          name: 'investment';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'collateral';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'proportion';
          type: {
            option: 'u64';
          };
        },
        {
          name: 'whiteListWallet';
          type: {
            option: 'pubkey';
          };
        },
        {
          name: 'reserve';
          type: {
            option: 'pubkey';
          };
        }
      ];
    },
    {
      name: 'editType0Depository';
      discriminator: [162, 24, 4, 132, 93, 158, 133, 90];
      accounts: [
        {
          name: 'authority';
          docs: ['#1'];
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          docs: ['#2'];
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
          name: 'collateral';
          docs: ['#3'];
          writable: true;
        },
        {
          name: 'depository';
          docs: ['#4'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
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
              name: 'editType0DepositoryFields';
            };
          };
        }
      ];
    },
    {
      name: 'editType1Collateral';
      discriminator: [76, 225, 178, 90, 134, 169, 77, 11];
      accounts: [
        {
          name: 'authority';
          docs: ['#1'];
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          docs: ['#2'];
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
          name: 'depository';
          docs: ['#3'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'collateralToken1';
          writable: true;
        }
      ];
      args: [
        {
          name: 'fields';
          type: {
            defined: {
              name: 'editType1CollateralFields';
            };
          };
        }
      ];
    },
    {
      name: 'editType1Depository';
      discriminator: [166, 214, 109, 254, 152, 173, 250, 180];
      accounts: [
        {
          name: 'authority';
          docs: ['#1'];
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          docs: ['#2'];
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
          name: 'depository';
          docs: ['#3'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
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
              name: 'editType1DepositoryFields';
            };
          };
        }
      ];
    },
    {
      name: 'initRedeemConfigV2';
      discriminator: [218, 141, 161, 235, 49, 156, 161, 152];
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
          name: 'redeemConfigV2';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50];
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
          name: 'collaterals';
          type: {
            vec: 'pubkey';
          };
        }
      ];
    },
    {
      name: 'initWhitelistAdmin';
      discriminator: [99, 58, 231, 184, 136, 74, 38, 133];
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
          name: 'whitelistAdminAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78];
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
          name: 'whitelistAdmins';
          type: {
            vec: 'pubkey';
          };
        }
      ];
    },
    {
      name: 'initializeController';
      discriminator: [137, 255, 100, 190, 201, 247, 241, 81];
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
          name: 'redeemableMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
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
          name: 'redeemableMintDecimals';
          type: 'u8';
        },
        {
          name: 'debtSupplyCap';
          type: 'u64';
        },
        {
          name: 'reserve';
          type: 'pubkey';
        },
        {
          name: 'oracle';
          type: 'pubkey';
        }
      ];
    },
    {
      name: 'initializeType0Depository';
      discriminator: [254, 45, 202, 71, 94, 227, 232, 245];
      accounts: [
        {
          name: 'authority';
          docs: ['#1'];
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          docs: ['#3'];
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
          name: 'depository';
          docs: ['#4'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'collateral';
          docs: ['#5'];
          writable: true;
        },
        {
          name: 'oracle';
          docs: ['CHECK'];
        },
        {
          name: 'systemProgram';
          docs: ['#9'];
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          docs: ['#10'];
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [
        {
          name: 'debtCeiling';
          type: 'u64';
        },
        {
          name: 'collateralizationRatio';
          type: 'u64';
        },
        {
          name: 'liquidationRatio';
          type: 'u64';
        },
        {
          name: 'liquidationPenalty';
          type: 'u64';
        },
        {
          name: 'dust';
          type: 'u64';
        }
      ];
    },
    {
      name: 'initializeType1Collateral';
      discriminator: [232, 210, 40, 14, 84, 200, 40, 154];
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
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'collateralToken1';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [
        {
          name: 'index';
          type: 'u8';
        },
        {
          name: 'collateralizationRatioType1';
          type: 'u64';
        },
        {
          name: 'liquidationRatioType1';
          type: 'u64';
        },
        {
          name: 'isPausedType1';
          type: 'u8';
        }
      ];
    },
    {
      name: 'initializeType1Depository';
      discriminator: [16, 193, 10, 92, 20, 29, 22, 20];
      accounts: [
        {
          name: 'authority';
          docs: ['#1'];
          writable: true;
          signer: true;
        },
        {
          name: 'controller';
          docs: ['#3'];
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
          name: 'depository';
          docs: ['#4'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'oracle';
          docs: ['CHECK'];
          writable: true;
        },
        {
          name: 'systemProgram';
          docs: ['#9'];
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          docs: ['#10'];
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [
        {
          name: 'debtCeilingType1';
          type: 'u64';
        },
        {
          name: 'liquidationPenaltyType1';
          type: 'u64';
        },
        {
          name: 'dust';
          type: 'u64';
        },
        {
          name: 'duty';
          type: 'u64';
        }
      ];
    },
    {
      name: 'interactWithType0Depository';
      discriminator: [100, 95, 23, 115, 241, 176, 198, 171];
      accounts: [
        {
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'collateral';
          writable: true;
        },
        {
          name: 'userCollateral';
          writable: true;
        },
        {
          name: 'redeemableMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'userRedeemable';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'user';
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
                path: 'redeemableMint';
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
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'depositoryVault';
          writable: true;
        },
        {
          name: 'loanAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'reserve';
          writable: true;
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'reserve';
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
                path: 'redeemableMint';
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
          name: 'oracle';
          docs: ['Ensure the program calling this instruction verifies the account belongs', 'to the expected Oracle program.'];
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'collateralAmount';
          type: 'u64';
        },
        {
          name: 'debtAmount';
          type: 'u64';
        },
        {
          name: 'collateralFlag';
          type: 'bool';
        },
        {
          name: 'loanFlag';
          type: 'bool';
        }
      ];
    },
    {
      name: 'liquidateType0';
      discriminator: [132, 41, 76, 79, 227, 71, 42, 4];
      accounts: [
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
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'user';
        },
        {
          name: 'depositoryVault';
          writable: true;
        },
        {
          name: 'loan';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'stablecoinMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'collateral';
          writable: true;
        },
        {
          name: 'liquidator';
          writable: true;
          signer: true;
        },
        {
          name: 'liquidatorStablecoinAccount';
          writable: true;
        },
        {
          name: 'liquidatorCollateralAccount';
          writable: true;
        },
        {
          name: 'reserve';
          writable: true;
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'reserve';
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
                path: 'stablecoinMint';
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
          name: 'oracle';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'repayAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'liquidateType0WithLiquidatorPool';
      discriminator: [154, 197, 42, 237, 244, 99, 159, 170];
      accounts: [
        {
          name: 'liquidator';
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
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'user';
        },
        {
          name: 'loan';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'liquidatorCollateralAccount';
          writable: true;
        },
        {
          name: 'poolStablecoinAccount';
          writable: true;
        },
        {
          name: 'poolCollateralAccount';
          writable: true;
        },
        {
          name: 'depositoryVault';
          writable: true;
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
        },
        {
          name: 'stablecoinMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'collateral';
          writable: true;
        },
        {
          name: 'reserve';
          writable: true;
        },
        {
          name: 'oracle';
        },
        {
          name: 'stabilityPool';
          writable: true;
        },
        {
          name: 'liquidatorPoolController';
        },
        {
          name: 'liquidatorPoolProgram';
          address: 'CeuU7yCrwBt3pSj1UazU7heT6jQiBr9yWasY3NyJTcMo';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'repayAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'liquidateType1';
      discriminator: [240, 134, 35, 212, 30, 119, 221, 35];
      accounts: [
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
          name: 'liquidator';
          writable: true;
          signer: true;
        },
        {
          name: 'user';
          writable: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'depositoryVault';
          writable: true;
        },
        {
          name: 'loan';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'stablecoinMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'collateralToken1';
          writable: true;
        },
        {
          name: 'liquidatorStablecoinAccount';
          writable: true;
        },
        {
          name: 'liquidatorCollateralAccount';
          writable: true;
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'controller.reserve';
                account: 'controller';
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
                path: 'stablecoinMint';
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
          name: 'oracle';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'repayAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'pauseOrUnpauseRedeemConfig';
      discriminator: [209, 152, 0, 163, 160, 234, 115, 162];
      accounts: [
        {
          name: 'whitelist';
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
          name: 'whitelistAdmins';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78];
              }
            ];
          };
        },
        {
          name: 'redeemByCollateralConfigV2';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50];
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
          name: 'pauseFunction';
          type: {
            option: 'u8';
          };
        },
        {
          name: 'pauseCollateral';
          type: {
            option: 'u8';
          };
        },
        {
          name: 'collateral';
          type: {
            option: 'pubkey';
          };
        }
      ];
    },
    {
      name: 'readOracleAccount';
      discriminator: [84, 167, 143, 192, 12, 22, 206, 184];
      accounts: [
        {
          name: 'oracle';
        }
      ];
      args: [];
      returns: {
        defined: {
          name: 'pricePair';
        };
      };
    },
    {
      name: 'readPriceGroupAccount';
      discriminator: [208, 151, 171, 124, 190, 226, 80, 161];
      accounts: [
        {
          name: 'priceGroup';
        }
      ];
      args: [];
      returns: {
        defined: {
          name: 'priceGroup';
        };
      };
    },
    {
      name: 'requestWithdrawSmartvault';
      discriminator: [165, 217, 18, 36, 123, 225, 42, 52];
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
          name: 'collateral';
          writable: true;
        },
        {
          name: 'investment';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'vaultInfo';
          writable: true;
        },
        {
          name: 'withdrawRequest';
          docs: ['CHECK'];
          writable: true;
        },
        {
          name: 'jpowInfo';
          docs: ["seeds = ['USER_INFO', investment.key()]"];
          writable: true;
        },
        {
          name: 'usdcSmartVaultProgram';
          address: '8dSVJttXWeKwieWbM18Z5f36uwcjmZ7iDSSjVXqKqMvA';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'lendingAmount';
          type: 'f64';
        }
      ];
    },
    {
      name: 'type0RedeemByCollateral';
      discriminator: [59, 170, 157, 122, 111, 25, 62, 2];
      accounts: [
        {
          name: 'user';
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
          name: 'collateral';
          writable: true;
        },
        {
          name: 'redeemableMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'userRedeemable';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'user';
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
                path: 'redeemableMint';
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
          name: 'userCollateral';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'user';
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
                path: 'collateral';
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
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'redeemConfigV2';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50];
              }
            ];
          };
        },
        {
          name: 'loanAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'depositoryVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'depository';
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
                path: 'collateral';
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
          name: 'oracle';
          docs: ['CHECK'];
          writable: true;
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'controller.reserve';
                account: 'controller';
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
                path: 'redeemableMint';
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
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'jupiterProgram';
          address: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4';
        }
      ];
      args: [
        {
          name: 'collateralAmount';
          type: 'u64';
        },
        {
          name: 'data';
          type: 'bytes';
        }
      ];
    },
    {
      name: 'type1DepositoryBurn';
      discriminator: [145, 83, 247, 28, 156, 97, 242, 27];
      accounts: [
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
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'loanAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'redeemableMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'userRedeemable';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'user';
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
                path: 'redeemableMint';
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
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'controller.reserve';
                account: 'controller';
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
                path: 'redeemableMint';
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
          name: 'oracle';
          docs: ['CHECK'];
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'redeemAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'type1DepositoryDeposit';
      discriminator: [84, 191, 44, 206, 74, 115, 212, 92];
      accounts: [
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
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'collateralToken1';
          writable: true;
        },
        {
          name: 'userCollateral1';
          writable: true;
        },
        {
          name: 'depositoryVault';
          writable: true;
        },
        {
          name: 'loanAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'collateralAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'type1DepositoryMint';
      discriminator: [98, 205, 150, 200, 97, 68, 38, 120];
      accounts: [
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
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'loanAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'redeemableMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'userRedeemable';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'user';
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
                path: 'redeemableMint';
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
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'controller.reserve';
                account: 'controller';
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
                path: 'redeemableMint';
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
          name: 'oracle';
          docs: ['CHECK'];
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'debtAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'type1DepositoryWithdraw';
      discriminator: [19, 111, 95, 198, 100, 183, 97, 149];
      accounts: [
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
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'collateralToken1';
          writable: true;
        },
        {
          name: 'userCollateral1';
          writable: true;
        },
        {
          name: 'depositoryVault';
          writable: true;
        },
        {
          name: 'loanAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'redeemableMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'controller.reserve';
                account: 'controller';
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
                path: 'redeemableMint';
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
          name: 'oracle';
          docs: ['CHECK'];
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'collateralAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'type1LiquidateWithLiquidatorPool';
      discriminator: [153, 84, 143, 124, 14, 192, 221, 45];
      accounts: [
        {
          name: 'liquidator';
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
          name: 'user';
          writable: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'loan';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49];
              },
              {
                kind: 'account';
                path: 'depository';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'liquidatorCollateralAccount';
          writable: true;
        },
        {
          name: 'poolStablecoinAccount';
          writable: true;
        },
        {
          name: 'poolCollateralAccount';
          writable: true;
        },
        {
          name: 'depositoryVault';
          writable: true;
        },
        {
          name: 'stablecoinMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'collateralToken1';
          writable: true;
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'controller.reserve';
                account: 'controller';
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
                path: 'stablecoinMint';
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
          name: 'reserve';
          writable: true;
        },
        {
          name: 'oracle';
        },
        {
          name: 'stabilityPool';
          writable: true;
        },
        {
          name: 'liquidatorPoolController';
        },
        {
          name: 'liquidatorPoolProgram';
          address: 'CeuU7yCrwBt3pSj1UazU7heT6jQiBr9yWasY3NyJTcMo';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'repayAmount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'type1RedeemByCollateral';
      discriminator: [19, 152, 177, 94, 230, 90, 158, 92];
      accounts: [
        {
          name: 'user';
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
          name: 'collateral';
          docs: ['CHECK in below'];
          writable: true;
        },
        {
          name: 'redeemableMint';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
        },
        {
          name: 'userRedeemable';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'user';
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
                path: 'redeemableMint';
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
          name: 'userCollateral';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'user';
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
                path: 'collateral';
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
          name: 'depositoryType1';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49];
              }
            ];
          };
        },
        {
          name: 'redeemConfigV2';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50];
              }
            ];
          };
        },
        {
          name: 'loanAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49];
              },
              {
                kind: 'account';
                path: 'depositoryType1';
              },
              {
                kind: 'account';
                path: 'user';
              }
            ];
          };
        },
        {
          name: 'depositoryVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'depositoryType1';
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
                path: 'collateral';
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
          name: 'oracle';
          docs: ['CHECK'];
          writable: true;
        },
        {
          name: 'reserveTokenAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'controller.reserve';
                account: 'controller';
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
                path: 'redeemableMint';
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
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'jupiterProgram';
          address: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4';
        }
      ];
      args: [
        {
          name: 'collateralAmount';
          type: 'u64';
        },
        {
          name: 'data';
          type: 'bytes';
        }
      ];
    },
    {
      name: 'updateAuthority';
      discriminator: [32, 46, 64, 28, 149, 75, 243, 88];
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
      name: 'updateMetadata';
      discriminator: [170, 182, 43, 239, 97, 78, 225, 186];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'mint';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
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
          name: 'metadata';
          writable: true;
        },
        {
          name: 'metadataProgram';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [
        {
          name: 'fields';
          type: {
            defined: {
              name: 'metadataFields';
            };
          };
        }
      ];
    },
    {
      name: 'updateTokenAuthority';
      discriminator: [113, 45, 104, 44, 56, 68, 212, 82];
      accounts: [
        {
          name: 'oldAuthority';
          writable: true;
          signer: true;
        },
        {
          name: 'mint';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69];
              }
            ];
          };
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
          name: 'metadata';
          writable: true;
        },
        {
          name: 'metadataProgram';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [];
    },
    {
      name: 'withdrawInvestment';
      discriminator: [157, 158, 101, 11, 240, 193, 192, 92];
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
          name: 'collateral';
          writable: true;
        },
        {
          name: 'depository';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'depositoryVault';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'depository';
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
                path: 'collateral';
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
          name: 'investment';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'investmentAta';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'investment';
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
                path: 'collateral';
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
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    },
    {
      name: 'withdrawRevenue';
      discriminator: [58, 241, 152, 184, 104, 150, 169, 119];
      accounts: [
        {
          name: 'authority';
          writable: true;
          signer: true;
        },
        {
          name: 'revenueWalletAta';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'investment.revenue_wallet';
                account: 'investment';
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
                path: 'collateral';
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
          name: 'collateral';
          writable: true;
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
          name: 'investment';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84];
              },
              {
                kind: 'account';
                path: 'collateral';
              }
            ];
          };
        },
        {
          name: 'investmentAta';
          writable: true;
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token2022Program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'config';
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130];
    },
    {
      name: 'controller';
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110];
    },
    {
      name: 'investment';
      discriminator: [175, 134, 9, 175, 115, 153, 39, 28];
    },
    {
      name: 'loanType0';
      discriminator: [53, 107, 87, 167, 145, 117, 129, 201];
    },
    {
      name: 'loanType1';
      discriminator: [53, 13, 71, 44, 243, 56, 227, 110];
    },
    {
      name: 'redeemByCollateralConfigV2';
      discriminator: [84, 193, 134, 218, 211, 27, 137, 25];
    },
    {
      name: 'type0Depository';
      discriminator: [202, 54, 70, 164, 112, 15, 110, 15];
    },
    {
      name: 'type1Depository';
      discriminator: [132, 68, 105, 249, 215, 58, 64, 100];
    },
    {
      name: 'userInfo';
      discriminator: [83, 134, 200, 56, 144, 56, 10, 62];
    },
    {
      name: 'vaultInfo';
      discriminator: [133, 250, 161, 78, 246, 27, 55, 187];
    },
    {
      name: 'whitelistAdmin';
      discriminator: [163, 150, 229, 143, 243, 38, 17, 133];
    }
  ];
  events: [
    {
      name: 'burnType1Event';
      discriminator: [11, 185, 25, 36, 190, 113, 131, 112];
    },
    {
      name: 'changeNewCollateralType1';
      discriminator: [204, 46, 186, 111, 9, 18, 59, 191];
    },
    {
      name: 'depositType1Event';
      discriminator: [156, 35, 223, 38, 224, 11, 167, 142];
    },
    {
      name: 'initType1CollateralEvent';
      discriminator: [222, 18, 74, 167, 241, 110, 231, 123];
    },
    {
      name: 'initializeControllerEvent';
      discriminator: [236, 159, 123, 225, 71, 177, 241, 0];
    },
    {
      name: 'interactWithTypeODepositoryEvent';
      discriminator: [125, 235, 2, 36, 55, 93, 10, 168];
    },
    {
      name: 'liquidationEvent';
      discriminator: [3, 13, 21, 93, 173, 136, 72, 144];
    },
    {
      name: 'mintType1Event';
      discriminator: [126, 100, 125, 84, 68, 45, 186, 158];
    },
    {
      name: 'setType0DepositoryCollateralizationRatioEvent';
      discriminator: [4, 74, 218, 241, 218, 173, 162, 203];
    },
    {
      name: 'setType0DepositoryDebtCeilingEvent';
      discriminator: [162, 223, 218, 229, 13, 36, 112, 235];
    },
    {
      name: 'setType0DepositoryDustEvent';
      discriminator: [208, 216, 15, 253, 231, 140, 166, 137];
    },
    {
      name: 'setType0DepositoryLiquidationPenaltyEvent';
      discriminator: [141, 77, 152, 220, 108, 21, 131, 81];
    },
    {
      name: 'setType0DepositoryLiquidationRatioEvent';
      discriminator: [254, 226, 122, 32, 109, 103, 167, 214];
    },
    {
      name: 'setType1CollateralizationRatioEvent';
      discriminator: [199, 32, 48, 73, 248, 227, 12, 102];
    },
    {
      name: 'setType1DepositoryDebtCeilingEvent';
      discriminator: [100, 63, 166, 98, 124, 248, 249, 11];
    },
    {
      name: 'setType1DepositoryDustEvent';
      discriminator: [205, 116, 246, 116, 116, 149, 88, 210];
    },
    {
      name: 'setType1DepositoryLiquidationPenaltyEvent';
      discriminator: [130, 94, 135, 160, 72, 37, 20, 29];
    },
    {
      name: 'setType1LiquidationRatioEvent';
      discriminator: [60, 113, 146, 120, 221, 42, 2, 133];
    },
    {
      name: 'withdrawType1Event';
      discriminator: [26, 70, 17, 231, 83, 229, 33, 49];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'invalidRedeemableMintDecimals';
      msg: 'The redeemable mint decimals must be between 0 and 9 (inclusive).';
    },
    {
      code: 6001;
      name: 'invalidRedeemableGlobalSupplyCap';
      msg: 'Redeemable global supply above.';
    },
    {
      code: 6002;
      name: 'invalidDepositoriesWeightBps';
      msg: 'Depositories weights do not add up to 100%.';
    },
    {
      code: 6003;
      name: 'invalidDepositoriesVector';
      msg: 'Depositories vector passed as parameter is not of the expected length';
    },
    {
      code: 6004;
      name: 'invalidCollateralAmount';
      msg: 'Collateral amount cannot be 0';
    },
    {
      code: 6005;
      name: 'invalidRedeemableAmount';
      msg: 'Redeemable amount must be > 0 in order to redeem.';
    },
    {
      code: 6006;
      name: 'insufficientCollateralAmount';
      msg: 'The balance of the collateral ATA is not enough to fulfill the mint operation.';
    },
    {
      code: 6007;
      name: 'insufficientRedeemableAmount';
      msg: 'The balance of the redeemable ATA is not enough to fulfill the redeem operation.';
    },
    {
      code: 6008;
      name: 'depositoriesTargerRedeemableAmountReached';
      msg: 'Minting amount would go past the depositories target redeemable amount.';
    },
    {
      code: 6009;
      name: 'redeemableGlobalSupplyCapReached';
      msg: 'Minting amount would go past the Redeemable Global Supply Cap.';
    },
    {
      code: 6010;
      name: 'redeemableMercurialVaultAmountUnderManagementCap';
      msg: 'Minting amount would go past the mercurial vault depository Redeemable Amount Under Management Cap.';
    },
    {
      code: 6011;
      name: 'redeemableCredixLpAmountUnderManagementCap';
      msg: 'Minting amount would go past the credix lp depository Redeemable Amount Under Management Cap.';
    },
    {
      code: 6012;
      name: 'mathOverflow';
      msg: 'Math overflow.';
    },
    {
      code: 6013;
      name: 'slippageReached';
      msg: "The order couldn't be executed with the provided slippage.";
    },
    {
      code: 6014;
      name: 'bumpError';
      msg: 'A bump was expected but is missing.';
    },
    {
      code: 6015;
      name: 'mintingDisabled';
      msg: 'Minting is disabled for the current depository.';
    },
    {
      code: 6016;
      name: 'collateralDepositHasRemainingDust';
      msg: 'Collateral deposit left some value unaccounted for.';
    },
    {
      code: 6017;
      name: 'collateralDepositAmountsDoesntMatch';
      msg: "Collateral deposit didn't result in the correct amounts being moved.";
    },
    {
      code: 6018;
      name: 'collateralDepositDoesntMatchTokenValue';
      msg: "Received token of which the value doesn't match the deposited collateral.";
    },
    {
      code: 6019;
      name: 'invalidMercurialVaultLpMint';
      msg: "The mercurial vault lp mint does not match the Depository's one.";
    },
    {
      code: 6020;
      name: 'maxNumberOfMercurialVaultDepositoriesRegisteredReached';
      msg: 'Cannot register more mercurial vault depositories, the limit has been reached.';
    },
    {
      code: 6021;
      name: 'maxNumberOfCredixLpDepositoriesRegisteredReached';
      msg: 'Cannot register more credix lp depositories, the limit has been reached.';
    },
    {
      code: 6022;
      name: 'mercurialVaultDoNotMatchCollateral';
      msg: 'The provided collateral do not match the provided mercurial vault token.';
    },
    {
      code: 6023;
      name: 'credixLpDoNotMatchCollateral';
      msg: 'The provided collateral do not match the provided credix lp token.';
    },
    {
      code: 6024;
      name: 'collateralMintEqualToRedeemableMint';
      msg: 'Collateral mint should be different than redeemable mint.';
    },
    {
      code: 6025;
      name: 'collateralMintNotAllowed';
      msg: 'Provided collateral mint is not allowed.';
    },
    {
      code: 6026;
      name: 'minimumMintedRedeemableAmountError';
      msg: 'Mint resulted to 0 redeemable token being minted.';
    },
    {
      code: 6027;
      name: 'maximumMintedRedeemableAmountError';
      msg: 'Mint resulted into too much redeemable token being minted.';
    },
    {
      code: 6028;
      name: 'minimumRedeemedCollateralAmountError';
      msg: 'Redeem resulted to 0 collateral token being redeemed.';
    },
    {
      code: 6029;
      name: 'maximumRedeemedCollateralAmountError';
      msg: 'Redeem resulted into too much collateral token being redeemed.';
    },
    {
      code: 6030;
      name: 'invalidDepositoryLpTokenVault';
      msg: "The depository lp token vault does not match the Depository's one.";
    },
    {
      code: 6031;
      name: 'invalidTime';
      msg: 'Cannot update the past states.';
    },
    {
      code: 6032;
      name: 'authorityPulled';
      msg: 'The authority of this program has been pulled.';
    },
    {
      code: 6033;
      name: 'invalidAuthority';
      msg: 'Only the Program initializer authority can access this instructions.';
    },
    {
      code: 6034;
      name: 'invalidController';
      msg: "The Depository's controller doesn't match the provided Controller.";
    },
    {
      code: 6035;
      name: 'invalidDepository';
      msg: 'The Depository provided is not matching the one stored in the Controller.';
    },
    {
      code: 6036;
      name: 'invalidCollateralMint';
      msg: "The provided collateral mint does not match the depository's collateral mint.";
    },
    {
      code: 6037;
      name: 'invalidRedeemableMint';
      msg: "The Redeemable Mint provided does not match the Controller's one.";
    },
    {
      code: 6038;
      name: 'invalidOwner';
      msg: 'The provided token account is not owner by the expected party.';
    },
    {
      code: 6039;
      name: 'invalidDepositoryCollateral';
      msg: "The provided depository collateral does not match the depository's one.";
    },
    {
      code: 6040;
      name: 'invalidDepositoryShares';
      msg: "The provided depository shares does not match the depository's one.";
    },
    {
      code: 6041;
      name: 'invalidProfitsBeneficiaryCollateral';
      msg: "The Profits beneficiary collateral provided does not match the depository's one.";
    },
    {
      code: 6042;
      name: 'invalidMercurialVault';
      msg: "The provided mercurial vault does not match the Depository's one.";
    },
    {
      code: 6043;
      name: 'invalidMercurialVaultCollateralTokenSafe';
      msg: 'The provided mercurial vault collateral token safe does not match the mercurial vault one.';
    },
    {
      code: 6044;
      name: 'redeemableIdentityDepositoryAmountUnderManagementCap';
      msg: 'Minting amount would go past the identity depository Redeemable Amount Under Management Cap.';
    },
    {
      code: 6045;
      name: 'programAlreadyFrozenOrResumed';
      msg: 'Program is already frozen/resumed.';
    },
    {
      code: 6046;
      name: 'programFrozen';
      msg: 'The program is currently in Frozen state.';
    },
    {
      code: 6047;
      name: 'invalidCredixProgramState';
      msg: "The Credix ProgramState isn't the Depository one.";
    },
    {
      code: 6048;
      name: 'invalidCredixGlobalMarketState';
      msg: "The Credix GlobalMarketState isn't the Depository one.";
    },
    {
      code: 6049;
      name: 'invalidCredixSigningAuthority';
      msg: "The Credix SigningAuthority isn't the Depository one.";
    },
    {
      code: 6050;
      name: 'invalidCredixLiquidityCollateral';
      msg: "The Credix LiquidityCollateral isn't the Depository one.";
    },
    {
      code: 6051;
      name: 'invalidCredixSharesMint';
      msg: "The Credix SharesMint isn't the Depository one.";
    },
    {
      code: 6052;
      name: 'invalidCredixPass';
      msg: "The Credix Pass isn't the one owned by the correct depository.";
    },
    {
      code: 6053;
      name: 'invalidCredixPassNoFees';
      msg: "The Credix Pass doesn't have the fees exemption.";
    },
    {
      code: 6054;
      name: 'invalidCredixTreasury';
      msg: "The Credix Treasury isn't the ProgramState one.";
    },
    {
      code: 6055;
      name: 'invalidCredixTreasuryPoolCollateral';
      msg: "The Credix TreasuryPool isn't the GlobalMarketState one.";
    },
    {
      code: 6056;
      name: 'invalidCredixWithdrawEpochRequestPhase';
      msg: "The Credix WithdrawEpoch isn't in its request phase.";
    },
    {
      code: 6057;
      name: 'invalidCredixWithdrawEpochRedeemPhase';
      msg: "The Credix WithdrawEpoch isn't in its redeem phase.";
    },
    {
      code: 6058;
      name: 'default';
      msg: 'Default - Check the source code for more info.';
    },
    {
      code: 6059;
      name: 'maximumOutflowAmountError';
      msg: 'Redeem resulted into too much outflow in this epoch, please wait or try again with a smaller amount.';
    },
    {
      code: 6060;
      name: 'invalidOutflowLimitPerEpochBps';
      msg: 'The outflow_limit_per_epoch_bps is invalid: over 100%.';
    },
    {
      code: 6061;
      name: 'exceededCollateralMintCapError';
      msg: 'No more coins can be minted because the limit of this collateral has been reached.';
    },
    {
      code: 6062;
      name: 'loanNoDebt';
      msg: 'Loan has no debt to liquidate.';
    },
    {
      code: 6063;
      name: 'invalidRepayAmount';
      msg: 'Invalid repay amount.';
    },
    {
      code: 6064;
      name: 'insufficientCollateral';
      msg: 'Insufficient collateral in the Loan.';
    },
    {
      code: 6065;
      name: 'globalLiquidationLimitExceeded';
      msg: 'Global liquidation limit exceeded.';
    },
    {
      code: 6066;
      name: 'invalidAccount';
      msg: 'Invalid account provided.';
    },
    {
      code: 6067;
      name: 'notEligibleForLiquidation';
      msg: 'Loan is not eligible for liquidation based on LTV threshold.';
    },
    {
      code: 6068;
      name: 'insufficientRepayment';
      msg: 'Insufficient collateral value to liquidate debt.';
    },
    {
      code: 6069;
      name: 'exceededCollateralRatioError';
      msg: 'Collateral value is lower than required to satisfy Collateralization Ratio.';
    },
    {
      code: 6070;
      name: 'liquidationToHigherThanCollateralizationRatio';
      msg: 'Liquidation to higher than Collateralization Ratio is not allowed.';
    },
    {
      code: 6071;
      name: 'invalidForLiquidation';
      msg: 'Invalid for liquidation, max LTV is not violated.';
    },
    {
      code: 6072;
      name: 'invalidRepayAmountForCollateral';
      msg: 'Invalid repay amount for the collateral';
    },
    {
      code: 6073;
      name: 'repayAmountExceedDebt';
      msg: 'The repay amount exceeds the debt.';
    },
    {
      code: 6074;
      name: 'withdrawAmountExceed';
      msg: 'The withdraw amount exceeds the debt.';
    },
    {
      code: 6075;
      name: 'invalidAccountDiscriminator';
      msg: 'Invalid account discriminator';
    },
    {
      code: 6076;
      name: 'unableToDeserializeAccount';
      msg: 'Unable to deserialize account';
    },
    {
      code: 6077;
      name: 'invalidOracle';
      msg: 'The provided oracle account is invalid.';
    },
    {
      code: 6078;
      name: 'onlyOneLoanAccount';
      msg: 'Only 1 loan account to be liquidated';
    },
    {
      code: 6079;
      name: 'invalidCollateralizationRatio';
      msg: 'Cannot liquidate to lower than Collateralization Ratio.';
    },
    {
      code: 6080;
      name: 'invalidReserveAccount';
      msg: 'The provided reserve account is invalid';
    },
    {
      code: 6081;
      name: 'invalidAccountSize';
      msg: 'The new size provided is not match the needed space for migration.';
    },
    {
      code: 6082;
      name: 'priceNotUpdate';
      msg: "The price of this collateral hasn't been updated for 10 minute.";
    },
    {
      code: 6083;
      name: 'invalidMetadata';
      msg: 'The provided metadata account is invalid.';
    },
    {
      code: 6084;
      name: 'tokenNotFound';
      msg: 'Token not found in price group oracle.';
    },
    {
      code: 6085;
      name: 'rateExceedDouble';
      msg: 'Borrow rate has been increasing too high';
    },
    {
      code: 6086;
      name: 'depositoryPaused';
      msg: 'The depository is paused';
    },
    {
      code: 6087;
      name: 'noMoreCollateral';
      msg: 'No more collateral';
    },
    {
      code: 6088;
      name: 'invalidNumOfCollateral';
      msg: 'The number of collateral is invalid because it is smaller than now';
    },
    {
      code: 6089;
      name: 'overIndex';
      msg: 'Over index';
    },
    {
      code: 6090;
      name: 'zeroAmount';
      msg: 'Zero amount';
    },
    {
      code: 6091;
      name: 'conflictIndex';
      msg: 'Index is initialized, please use change collateral method';
    },
    {
      code: 6092;
      name: 'collateralAlreadyInitialized';
      msg: 'Collateral is initialized';
    },
    {
      code: 6093;
      name: 'loanIsFull';
      msg: 'User loan is already full with 8 collaterals.';
    },
    {
      code: 6094;
      name: 'notFoundCollateralTokenInLoan';
      msg: 'The collateral token has not been deposited.';
    },
    {
      code: 6095;
      name: 'notFoundCollateral';
      msg: 'The collateral token is invalid in the depository.';
    },
    {
      code: 6096;
      name: 'notFoundCollateralLoan';
      msg: 'The collateral is not deposited.';
    },
    {
      code: 6097;
      name: 'collateralTotalNotZero';
      msg: 'Cannot change collateral because of remaining deposit amount.';
    },
    {
      code: 6098;
      name: 'stabilityPoolSupplyCapExceeded';
      msg: 'The supplied stablecoin in stability pool exceeds its supply cap';
    },
    {
      code: 6099;
      name: 'invalidLiquidator';
      msg: 'The liquidator is not whitelisted';
    },
    {
      code: 6100;
      name: 'depositToSmartVaultFailed';
      msg: 'Fail to deposit to the smart vault';
    },
    {
      code: 6101;
      name: 'requestWithdrawToSmartVaultFailed';
      msg: 'Fail to request withdraw to the smart vault';
    },
    {
      code: 6102;
      name: 'invalidSmartVaultProgram';
      msg: 'Invalid smart vault program';
    },
    {
      code: 6103;
      name: 'proportionInvestmentNotInitialized';
      msg: 'Proportion of investment account not initialized';
    },
    {
      code: 6104;
      name: 'invalidSigner';
      msg: 'Invalid Signer Pda';
    },
    {
      code: 6105;
      name: 'exceededInvestmentError';
      msg: 'Investment amount is different desired amount the investment limit';
    },
    {
      code: 6106;
      name: 'proportionInvestmentInvalid';
      msg: 'Investment proportion is invalid';
    },
    {
      code: 6107;
      name: 'invalidWithdrawLendingAmount';
      msg: 'Lending amount is invalid';
    },
    {
      code: 6108;
      name: 'invalidDepositAmountUsdc';
      msg: 'The amount of USDC to deposit to smartvault is invalid';
    },
    {
      code: 6109;
      name: 'invalidRedeemAmount';
      msg: 'Invalid redeem amount - must be greater than zero';
    },
    {
      code: 6110;
      name: 'redeemAmountExceedsMax';
      msg: 'Redeem amount exceeds maximum allowed';
    },
    {
      code: 6111;
      name: 'redeemAmountBelowMin';
      msg: 'Redeem amount below minimum allowed';
    },
    {
      code: 6112;
      name: 'insufficientUsdaiBalance';
      msg: 'Insufficient USDAI balance for redemption';
    },
    {
      code: 6113;
      name: 'insufficientCollateralBalance';
      msg: 'Insufficient collateral for redemption';
    },
    {
      code: 6114;
      name: 'redeemAmountExceedsRateLimit';
      msg: 'Redeem amount exceeds maximum allowed by rate';
    },
    {
      code: 6115;
      name: 'swapAmountBelowMinimum';
      msg: 'Swap amount below minimum required';
    },
    {
      code: 6116;
      name: 'swapAmountExceedsMaximum';
      msg: 'Swap amount exceeds maximum allowed';
    },
    {
      code: 6117;
      name: 'invalidSwapData';
      msg: 'Invalid swap data';
    },
    {
      code: 6118;
      name: 'redeemConfigInactive';
      msg: 'Redeem config is not active';
    },
    {
      code: 6119;
      name: 'invalidRedeemConfigCollateral';
      msg: 'Invalid collateral mint in redeem config';
    },
    {
      code: 6120;
      name: 'invalidConfig';
      msg: 'Invalid config';
    },
    {
      code: 6121;
      name: 'invalidCollateralTransfer';
      msg: 'Error in collateral transfer - amount exceeds expected';
    },
    {
      code: 6122;
      name: 'depositAboveLimit';
      msg: 'Deposit amount above limit';
    },
    {
      code: 6123;
      name: 'insufficientFundsForInvestment';
      msg: 'Insufficient funds for investment';
    },
    {
      code: 6124;
      name: 'priceDifferenceTooHigh';
      msg: 'Price difference too high';
    },
    {
      code: 6125;
      name: 'notFoundCollateralInRedeemByCollateral';
      msg: 'Not found collateral in redeem by collateral';
    },
    {
      code: 6126;
      name: 'collateralIsPausedForRedeemByCollateral';
      msg: 'Collateral is paused for redeem by collateral';
    },
    {
      code: 6127;
      name: 'invalidWhitelistAdmin';
      msg: 'Invalid whitelist admin';
    },
    {
      code: 6128;
      name: 'whiteListAdminIsFull';
      msg: 'White list admin is full';
    },
    {
      code: 6129;
      name: 'collateralAlreadyExists';
      msg: 'Collateral already exists';
    },
    {
      code: 6130;
      name: 'adminAlreadyInit';
      msg: 'Admin already initialized';
    },
    {
      code: 6131;
      name: 'collateralIsPaused';
      msg: 'Collateral is paused';
    }
  ];
  types: [
    {
      name: 'burnType1Event';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'user';
            type: 'pubkey';
          },
          {
            name: 'burnAmount';
            type: 'u64';
          },
          {
            name: 'newDebt';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'changeNewCollateralType1';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'collateralNew';
            type: 'pubkey';
          },
          {
            name: 'collateralOld';
            type: 'pubkey';
          },
          {
            name: 'collateralizationRatioType1';
            type: 'u64';
          },
          {
            name: 'liquidationRatioType1';
            type: 'u64';
          },
          {
            name: 'isPausedType1';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'collateralType1';
      serialization: 'bytemuck';
      repr: {
        kind: 'c';
      };
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateralMint';
            type: 'pubkey';
          },
          {
            name: 'collateralTotal';
            type: 'u64';
          },
          {
            name: 'collateralizationRatio';
            type: 'u64';
          },
          {
            name: 'liquidationRatio';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'decimals';
            type: 'u8';
          },
          {
            name: 'isPaused';
            type: 'u8';
          },
          {
            name: 'padding';
            type: {
              array: ['u8', 13];
            };
          }
        ];
      };
    },
    {
      name: 'config';
      serialization: 'bytemuckunsafe';
      repr: {
        kind: 'c';
      };
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'pubkey';
          },
          {
            name: 'vaultBotServer';
            type: 'pubkey';
          },
          {
            name: 'feeWallet';
            type: 'pubkey';
          },
          {
            name: 'allowedLendingPools';
            type: {
              array: ['pubkey', 10];
            };
          },
          {
            name: 'performanceFeePercent';
            type: 'u64';
          },
          {
            name: 'monthlyManagementFee';
            type: 'u64';
          },
          {
            name: 'nextMonthlyFeeCollectionTime';
            type: 'u64';
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
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'redeemableMintBump';
            type: 'u8';
          },
          {
            name: 'authority';
            type: 'pubkey';
          },
          {
            name: 'pendingAuthority';
            type: 'pubkey';
          },
          {
            name: 'redeemableMint';
            type: 'pubkey';
          },
          {
            name: 'debtSupply';
            type: 'u64';
          },
          {
            name: 'debtSupplycap';
            type: 'u64';
          },
          {
            name: 'base';
            type: 'u64';
          },
          {
            name: 'reserve';
            type: 'pubkey';
          },
          {
            name: 'redeemableOracle';
            type: 'pubkey';
          }
        ];
      };
    },
    {
      name: 'depositType1Event';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'user';
            type: 'pubkey';
          },
          {
            name: 'collateral';
            type: 'pubkey';
          },
          {
            name: 'collateralAmount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'editControllerFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'debtSupplycap';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'base';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'oracle';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'reserve';
            type: {
              option: 'pubkey';
            };
          }
        ];
      };
    },
    {
      name: 'editType0DepositoryFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'debtCeiling';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'collateralizationRatio';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'liquidationRatio';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'liquidationPenalty';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'dust';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'duty';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'rate';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'oracle';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'pause';
            type: {
              option: 'bool';
            };
          },
          {
            name: 'limit';
            type: {
              option: {
                option: 'u64';
              };
            };
          }
        ];
      };
    },
    {
      name: 'editType1CollateralFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateralizationRatioType1';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'liquidationRatioType1';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'isPauseCollateralType1';
            type: {
              option: 'u8';
            };
          }
        ];
      };
    },
    {
      name: 'editType1DepositoryFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'oracle';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'debtCeiling';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'liquidationPenalty';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'dust';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'duty';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'rate';
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
    },
    {
      name: 'initType1CollateralEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'collateral';
            type: 'pubkey';
          },
          {
            name: 'collateralizationRatioType1';
            type: 'u64';
          },
          {
            name: 'liquidationRatioType1';
            type: 'u64';
          },
          {
            name: 'isPausedType1';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'initializeControllerEvent';
      docs: ['Event called in [instructions::initialize_controller::handler].'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'version';
            docs: ['The controller version.'];
            type: 'u8';
          },
          {
            name: 'controller';
            docs: ['The controller being created.'];
            type: 'pubkey';
          },
          {
            name: 'authority';
            docs: ['The authority.'];
            type: 'pubkey';
          }
        ];
      };
    },
    {
      name: 'interactWithTypeODepositoryEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'user';
            type: 'pubkey';
          },
          {
            name: 'collateral';
            type: 'pubkey';
          },
          {
            name: 'collateralAmount';
            type: 'u64';
          },
          {
            name: 'debtAmount';
            type: 'u64';
          },
          {
            name: 'collateralFlag';
            type: 'bool';
          },
          {
            name: 'loanFlag';
            type: 'bool';
          }
        ];
      };
    },
    {
      name: 'investment';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amountType0';
            type: 'u64';
          },
          {
            name: 'amountType1';
            type: 'u64';
          },
          {
            name: 'proportion';
            type: 'u64';
          },
          {
            name: 'revenue';
            type: 'u64';
          },
          {
            name: 'whitelistWallet';
            type: 'pubkey';
          },
          {
            name: 'revenueWallet';
            type: 'pubkey';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'liquidationEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'liquidator';
            type: 'pubkey';
          },
          {
            name: 'repayAmount';
            type: 'u64';
          },
          {
            name: 'collateralClaimed';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'loanType0';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateralAmount';
            type: 'u64';
          },
          {
            name: 'mintedAmount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'loanType1';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateralToken';
            type: {
              array: ['pubkey', 8];
            };
          },
          {
            name: 'collateralAmount';
            type: {
              array: ['u64', 8];
            };
          },
          {
            name: 'mintedAmount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'metadataFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'symbol';
            type: 'string';
          },
          {
            name: 'uri';
            type: 'string';
          },
          {
            name: 'sellerFeeBasisPoints';
            type: 'u16';
          }
        ];
      };
    },
    {
      name: 'mintType1Event';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'user';
            type: 'pubkey';
          },
          {
            name: 'mintAmount';
            type: 'u64';
          },
          {
            name: 'newDebt';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'priceGroup';
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
            name: 'priceGroupData';
            type: {
              vec: {
                defined: {
                  name: 'priceGroupData';
                };
              };
            };
          },
          {
            name: 'updatedTimestamp';
            type: 'i64';
          }
        ];
      };
    },
    {
      name: 'priceGroupData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'tokenMint';
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'f64';
          }
        ];
      };
    },
    {
      name: 'pricePair';
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
            name: 'metadata';
            docs: ['Owner of the configuration'];
            type: 'pubkey';
          },
          {
            name: 'price';
            type: 'f64';
          },
          {
            name: 'updatedTimestamp';
            type: 'i64';
          }
        ];
      };
    },
    {
      name: 'redeemByCollateralConfigV2';
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
            name: 'isPausedCollateral';
            type: {
              array: ['u8', 32];
            };
          },
          {
            name: 'isPausedFunction';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'setType0DepositoryCollateralizationRatioEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'collateralizationRatio';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType0DepositoryDebtCeilingEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'debtCeiling';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType0DepositoryDustEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'dust';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType0DepositoryLiquidationPenaltyEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'liquidationPenalty';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType0DepositoryLiquidationRatioEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'liquidationRatio';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType1CollateralizationRatioEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'collateral';
            type: 'pubkey';
          },
          {
            name: 'collateralizationRatio';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType1DepositoryDebtCeilingEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'debtCeiling';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType1DepositoryDustEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'dust';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType1DepositoryLiquidationPenaltyEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'depository';
            type: 'pubkey';
          },
          {
            name: 'liquidationPenalty';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'setType1LiquidationRatioEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'controller';
            type: 'pubkey';
          },
          {
            name: 'colateral';
            type: 'pubkey';
          },
          {
            name: 'liquidationRatio';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'type0Depository';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateral';
            type: 'pubkey';
          },
          {
            name: 'oracle';
            type: 'pubkey';
          },
          {
            name: 'debtCeiling';
            type: 'u64';
          },
          {
            name: 'collateralizationRatio';
            type: 'u64';
          },
          {
            name: 'liquidationRatio';
            type: 'u64';
          },
          {
            name: 'liquidationPenalty';
            type: 'u64';
          },
          {
            name: 'debtTotal';
            type: 'u64';
          },
          {
            name: 'collateralTotal';
            type: 'u64';
          },
          {
            name: 'dust';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'duty';
            type: 'u64';
          },
          {
            name: 'rho';
            type: 'u64';
          },
          {
            name: 'rate';
            type: 'u64';
          },
          {
            name: 'isPaused';
            type: 'bool';
          }
        ];
      };
    },
    {
      name: 'type1Depository';
      serialization: 'bytemuck';
      repr: {
        kind: 'c';
      };
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateralType1';
            type: {
              array: [
                {
                  defined: {
                    name: 'collateralType1';
                  };
                },
                32
              ];
            };
          },
          {
            name: 'collateralTokens';
            type: {
              array: ['pubkey', 32];
            };
          },
          {
            name: 'oracle';
            type: 'pubkey';
          },
          {
            name: 'debtCeilingType1';
            type: 'u64';
          },
          {
            name: 'debtTotal';
            type: 'u64';
          },
          {
            name: 'liquidationPenalty';
            type: 'u64';
          },
          {
            name: 'dust';
            type: 'u64';
          },
          {
            name: 'duty';
            type: 'u64';
          },
          {
            name: 'rho';
            type: 'u64';
          },
          {
            name: 'rate';
            type: 'u64';
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
              array: ['u8', 6];
            };
          }
        ];
      };
    },
    {
      name: 'userInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'depositedLendingUsdc';
            type: 'f64';
          },
          {
            name: 'depositedUsdc';
            type: 'u64';
          },
          {
            name: 'reserveUsdc';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'vaultInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'lendingPool';
            type: 'pubkey';
          },
          {
            name: 'totalLendingUsdc';
            type: 'f64';
          },
          {
            name: 'reserveUsdc';
            type: 'u64';
          },
          {
            name: 'isLocked';
            type: 'bool';
          }
        ];
      };
    },
    {
      name: 'whitelistAdmin';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'whitelistAdmins';
            type: {
              array: ['pubkey', 5];
            };
          }
        ];
      };
    },
    {
      name: 'withdrawType1Event';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'user';
            type: 'pubkey';
          },
          {
            name: 'collateral';
            type: 'pubkey';
          },
          {
            name: 'collateralAmount';
            type: 'u64';
          }
        ];
      };
    }
  ];
};

export const idlLending: IdlLending = {
  address: lendingProgramId,
  metadata: {
    name: 'lending',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'addCollateralRedeemConfigV2',
      discriminator: [178, 55, 142, 222, 66, 247, 207, 192],
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
          name: 'redeemConfigV2',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50],
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
          name: 'collaterals',
          type: {
            vec: 'pubkey',
          },
        },
      ],
    },
    {
      name: 'addMetadata',
      discriminator: [231, 195, 40, 240, 67, 231, 53, 136],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'mint',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
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
          name: 'metadata',
          writable: true,
        },
        {
          name: 'metadataProgram',
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
      ],
      args: [
        {
          name: 'fields',
          type: {
            defined: {
              name: 'metadataFields',
            },
          },
        },
      ],
    },
    {
      name: 'addWhitelistAdmin',
      discriminator: [20, 72, 17, 49, 147, 29, 238, 218],
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
          name: 'whitelistAdminAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78],
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
          name: 'whitelistAdmins',
          type: {
            vec: 'pubkey',
          },
        },
      ],
    },
    {
      name: 'changeCollateralRedeemConfig',
      discriminator: [5, 197, 93, 80, 239, 60, 160, 17],
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
          name: 'redeemConfigV2',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50],
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
          name: 'oldCollateral',
          type: 'pubkey',
        },
        {
          name: 'newCollateral',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'changeType1Collateral',
      discriminator: [187, 28, 63, 208, 186, 236, 235, 198],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          docs: ['#2'],
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
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'oldCollateralToken',
          writable: true,
        },
        {
          name: 'newCollateralToken',
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
      ],
      args: [
        {
          name: 'collateralizationRatioType1',
          type: 'u64',
        },
        {
          name: 'liquidationRatioType1',
          type: 'u64',
        },
        {
          name: 'isPausedType1',
          type: 'u8',
        },
      ],
    },
    {
      name: 'changeWhitelistAdmin',
      discriminator: [176, 113, 33, 246, 172, 77, 8, 225],
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
          name: 'whitelistAdminAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78],
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
          name: 'oldAdmin',
          type: 'pubkey',
        },
        {
          name: 'newAdmin',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'depositUsdcSmartVault',
      discriminator: [159, 229, 32, 185, 153, 72, 30, 120],
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
          name: 'collateral',
          writable: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'depositoryVault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'depository',
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
                path: 'collateral',
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
          name: 'investment',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'investmentAta',
          writable: true,
        },
        {
          name: 'vaultInfo',
          writable: true,
        },
        {
          name: 'config',
          writable: true,
        },
        {
          name: 'vaultUsdcAta',
          writable: true,
        },
        {
          name: 'feeWalletUsdcAta',
          writable: true,
        },
        {
          name: 'jpowInfo',
          docs: ['CHECK', "seeds = ['USER_INFO', investment.key()]"],
          writable: true,
        },
        {
          name: 'usdcSmartVaultProgram',
          address: '8dSVJttXWeKwieWbM18Z5f36uwcjmZ7iDSSjVXqKqMvA',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'depositUsdcAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'editController',
      discriminator: [132, 153, 227, 60, 132, 180, 226, 209],
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
      ],
      args: [
        {
          name: 'fields',
          type: {
            defined: {
              name: 'editControllerFields',
            },
          },
        },
      ],
    },
    {
      name: 'editInvestment',
      discriminator: [112, 37, 241, 14, 199, 60, 76, 58],
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
          name: 'investment',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'collateral',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'proportion',
          type: {
            option: 'u64',
          },
        },
        {
          name: 'whiteListWallet',
          type: {
            option: 'pubkey',
          },
        },
        {
          name: 'reserve',
          type: {
            option: 'pubkey',
          },
        },
      ],
    },
    {
      name: 'editType0Depository',
      discriminator: [162, 24, 4, 132, 93, 158, 133, 90],
      accounts: [
        {
          name: 'authority',
          docs: ['#1'],
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          docs: ['#2'],
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
          name: 'collateral',
          docs: ['#3'],
          writable: true,
        },
        {
          name: 'depository',
          docs: ['#4'],
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
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
              name: 'editType0DepositoryFields',
            },
          },
        },
      ],
    },
    {
      name: 'editType1Collateral',
      discriminator: [76, 225, 178, 90, 134, 169, 77, 11],
      accounts: [
        {
          name: 'authority',
          docs: ['#1'],
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          docs: ['#2'],
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
          name: 'depository',
          docs: ['#3'],
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'collateralToken1',
          writable: true,
        },
      ],
      args: [
        {
          name: 'fields',
          type: {
            defined: {
              name: 'editType1CollateralFields',
            },
          },
        },
      ],
    },
    {
      name: 'editType1Depository',
      discriminator: [166, 214, 109, 254, 152, 173, 250, 180],
      accounts: [
        {
          name: 'authority',
          docs: ['#1'],
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          docs: ['#2'],
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
          name: 'depository',
          docs: ['#3'],
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
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
              name: 'editType1DepositoryFields',
            },
          },
        },
      ],
    },
    {
      name: 'initRedeemConfigV2',
      discriminator: [218, 141, 161, 235, 49, 156, 161, 152],
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
          name: 'redeemConfigV2',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50],
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
          name: 'collaterals',
          type: {
            vec: 'pubkey',
          },
        },
      ],
    },
    {
      name: 'initWhitelistAdmin',
      discriminator: [99, 58, 231, 184, 136, 74, 38, 133],
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
          name: 'whitelistAdminAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78],
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
          name: 'whitelistAdmins',
          type: {
            vec: 'pubkey',
          },
        },
      ],
    },
    {
      name: 'initializeController',
      discriminator: [137, 255, 100, 190, 201, 247, 241, 81],
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
          name: 'redeemableMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
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
          name: 'redeemableMintDecimals',
          type: 'u8',
        },
        {
          name: 'debtSupplyCap',
          type: 'u64',
        },
        {
          name: 'reserve',
          type: 'pubkey',
        },
        {
          name: 'oracle',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'initializeType0Depository',
      discriminator: [254, 45, 202, 71, 94, 227, 232, 245],
      accounts: [
        {
          name: 'authority',
          docs: ['#1'],
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          docs: ['#3'],
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
          name: 'depository',
          docs: ['#4'],
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'collateral',
          docs: ['#5'],
          writable: true,
        },
        {
          name: 'oracle',
          docs: ['CHECK'],
        },
        {
          name: 'systemProgram',
          docs: ['#9'],
          address: '11111111111111111111111111111111',
        },
        {
          name: 'tokenProgram',
          docs: ['#10'],
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
      ],
      args: [
        {
          name: 'debtCeiling',
          type: 'u64',
        },
        {
          name: 'collateralizationRatio',
          type: 'u64',
        },
        {
          name: 'liquidationRatio',
          type: 'u64',
        },
        {
          name: 'liquidationPenalty',
          type: 'u64',
        },
        {
          name: 'dust',
          type: 'u64',
        },
      ],
    },
    {
      name: 'initializeType1Collateral',
      discriminator: [232, 210, 40, 14, 84, 200, 40, 154],
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
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'collateralToken1',
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
      ],
      args: [
        {
          name: 'index',
          type: 'u8',
        },
        {
          name: 'collateralizationRatioType1',
          type: 'u64',
        },
        {
          name: 'liquidationRatioType1',
          type: 'u64',
        },
        {
          name: 'isPausedType1',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initializeType1Depository',
      discriminator: [16, 193, 10, 92, 20, 29, 22, 20],
      accounts: [
        {
          name: 'authority',
          docs: ['#1'],
          writable: true,
          signer: true,
        },
        {
          name: 'controller',
          docs: ['#3'],
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
          name: 'depository',
          docs: ['#4'],
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'oracle',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'systemProgram',
          docs: ['#9'],
          address: '11111111111111111111111111111111',
        },
        {
          name: 'tokenProgram',
          docs: ['#10'],
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
      ],
      args: [
        {
          name: 'debtCeilingType1',
          type: 'u64',
        },
        {
          name: 'liquidationPenaltyType1',
          type: 'u64',
        },
        {
          name: 'dust',
          type: 'u64',
        },
        {
          name: 'duty',
          type: 'u64',
        },
      ],
    },
    {
      name: 'interactWithType0Depository',
      discriminator: [100, 95, 23, 115, 241, 176, 198, 171],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'collateral',
          writable: true,
        },
        {
          name: 'userCollateral',
          writable: true,
        },
        {
          name: 'redeemableMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'userRedeemable',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
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
                path: 'redeemableMint',
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
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'depositoryVault',
          writable: true,
        },
        {
          name: 'loanAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'reserve',
          writable: true,
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'reserve',
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
                path: 'redeemableMint',
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
          name: 'oracle',
          docs: ['Ensure the program calling this instruction verifies the account belongs', 'to the expected Oracle program.'],
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'collateralAmount',
          type: 'u64',
        },
        {
          name: 'debtAmount',
          type: 'u64',
        },
        {
          name: 'collateralFlag',
          type: 'bool',
        },
        {
          name: 'loanFlag',
          type: 'bool',
        },
      ],
    },
    {
      name: 'liquidateType0',
      discriminator: [132, 41, 76, 79, 227, 71, 42, 4],
      accounts: [
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
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'user',
        },
        {
          name: 'depositoryVault',
          writable: true,
        },
        {
          name: 'loan',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'stablecoinMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'collateral',
          writable: true,
        },
        {
          name: 'liquidator',
          writable: true,
          signer: true,
        },
        {
          name: 'liquidatorStablecoinAccount',
          writable: true,
        },
        {
          name: 'liquidatorCollateralAccount',
          writable: true,
        },
        {
          name: 'reserve',
          writable: true,
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'reserve',
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
                path: 'stablecoinMint',
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
          name: 'oracle',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'repayAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'liquidateType0WithLiquidatorPool',
      discriminator: [154, 197, 42, 237, 244, 99, 159, 170],
      accounts: [
        {
          name: 'liquidator',
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
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'user',
        },
        {
          name: 'loan',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'liquidatorCollateralAccount',
          writable: true,
        },
        {
          name: 'poolStablecoinAccount',
          writable: true,
        },
        {
          name: 'poolCollateralAccount',
          writable: true,
        },
        {
          name: 'depositoryVault',
          writable: true,
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
        },
        {
          name: 'stablecoinMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'collateral',
          writable: true,
        },
        {
          name: 'reserve',
          writable: true,
        },
        {
          name: 'oracle',
        },
        {
          name: 'stabilityPool',
          writable: true,
        },
        {
          name: 'liquidatorPoolController',
        },
        {
          name: 'liquidatorPoolProgram',
          address: 'CeuU7yCrwBt3pSj1UazU7heT6jQiBr9yWasY3NyJTcMo',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'repayAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'liquidateType1',
      discriminator: [240, 134, 35, 212, 30, 119, 221, 35],
      accounts: [
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
          name: 'liquidator',
          writable: true,
          signer: true,
        },
        {
          name: 'user',
          writable: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'depositoryVault',
          writable: true,
        },
        {
          name: 'loan',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'stablecoinMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'collateralToken1',
          writable: true,
        },
        {
          name: 'liquidatorStablecoinAccount',
          writable: true,
        },
        {
          name: 'liquidatorCollateralAccount',
          writable: true,
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'controller.reserve',
                account: 'controller',
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
                path: 'stablecoinMint',
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
          name: 'oracle',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'repayAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'pauseOrUnpauseRedeemConfig',
      discriminator: [209, 152, 0, 163, 160, 234, 115, 162],
      accounts: [
        {
          name: 'whitelist',
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
          name: 'whitelistAdmins',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [87, 72, 73, 84, 69, 76, 73, 83, 84, 95, 65, 68, 77, 73, 78],
              },
            ],
          },
        },
        {
          name: 'redeemByCollateralConfigV2',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50],
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
          name: 'pauseFunction',
          type: {
            option: 'u8',
          },
        },
        {
          name: 'pauseCollateral',
          type: {
            option: 'u8',
          },
        },
        {
          name: 'collateral',
          type: {
            option: 'pubkey',
          },
        },
      ],
    },
    {
      name: 'readOracleAccount',
      discriminator: [84, 167, 143, 192, 12, 22, 206, 184],
      accounts: [
        {
          name: 'oracle',
        },
      ],
      args: [],
      returns: {
        defined: {
          name: 'pricePair',
        },
      },
    },
    {
      name: 'readPriceGroupAccount',
      discriminator: [208, 151, 171, 124, 190, 226, 80, 161],
      accounts: [
        {
          name: 'priceGroup',
        },
      ],
      args: [],
      returns: {
        defined: {
          name: 'priceGroup',
        },
      },
    },
    {
      name: 'requestWithdrawSmartvault',
      discriminator: [165, 217, 18, 36, 123, 225, 42, 52],
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
          name: 'collateral',
          writable: true,
        },
        {
          name: 'investment',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'vaultInfo',
          writable: true,
        },
        {
          name: 'withdrawRequest',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'jpowInfo',
          docs: ["seeds = ['USER_INFO', investment.key()]"],
          writable: true,
        },
        {
          name: 'usdcSmartVaultProgram',
          address: '8dSVJttXWeKwieWbM18Z5f36uwcjmZ7iDSSjVXqKqMvA',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'lendingAmount',
          type: 'f64',
        },
      ],
    },
    {
      name: 'type0RedeemByCollateral',
      discriminator: [59, 170, 157, 122, 111, 25, 62, 2],
      accounts: [
        {
          name: 'user',
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
          name: 'collateral',
          writable: true,
        },
        {
          name: 'redeemableMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'userRedeemable',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
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
                path: 'redeemableMint',
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
          name: 'userCollateral',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
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
                path: 'collateral',
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
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'redeemConfigV2',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50],
              },
            ],
          },
        },
        {
          name: 'loanAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'depositoryVault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'depository',
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
                path: 'collateral',
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
          name: 'oracle',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'controller.reserve',
                account: 'controller',
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
                path: 'redeemableMint',
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
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'jupiterProgram',
          address: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4',
        },
      ],
      args: [
        {
          name: 'collateralAmount',
          type: 'u64',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
    },
    {
      name: 'type1DepositoryBurn',
      discriminator: [145, 83, 247, 28, 156, 97, 242, 27],
      accounts: [
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
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'loanAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'redeemableMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'userRedeemable',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
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
                path: 'redeemableMint',
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
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'controller.reserve',
                account: 'controller',
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
                path: 'redeemableMint',
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
          name: 'oracle',
          docs: ['CHECK'],
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'redeemAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'type1DepositoryDeposit',
      discriminator: [84, 191, 44, 206, 74, 115, 212, 92],
      accounts: [
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
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'collateralToken1',
          writable: true,
        },
        {
          name: 'userCollateral1',
          writable: true,
        },
        {
          name: 'depositoryVault',
          writable: true,
        },
        {
          name: 'loanAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'collateralAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'type1DepositoryMint',
      discriminator: [98, 205, 150, 200, 97, 68, 38, 120],
      accounts: [
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
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'loanAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'redeemableMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'userRedeemable',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
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
                path: 'redeemableMint',
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
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'controller.reserve',
                account: 'controller',
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
                path: 'redeemableMint',
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
          name: 'oracle',
          docs: ['CHECK'],
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'debtAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'type1DepositoryWithdraw',
      discriminator: [19, 111, 95, 198, 100, 183, 97, 149],
      accounts: [
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
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'collateralToken1',
          writable: true,
        },
        {
          name: 'userCollateral1',
          writable: true,
        },
        {
          name: 'depositoryVault',
          writable: true,
        },
        {
          name: 'loanAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'redeemableMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'controller.reserve',
                account: 'controller',
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
                path: 'redeemableMint',
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
          name: 'oracle',
          docs: ['CHECK'],
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'collateralAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'type1LiquidateWithLiquidatorPool',
      discriminator: [153, 84, 143, 124, 14, 192, 221, 45],
      accounts: [
        {
          name: 'liquidator',
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
          name: 'user',
          writable: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'loan',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49],
              },
              {
                kind: 'account',
                path: 'depository',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'liquidatorCollateralAccount',
          writable: true,
        },
        {
          name: 'poolStablecoinAccount',
          writable: true,
        },
        {
          name: 'poolCollateralAccount',
          writable: true,
        },
        {
          name: 'depositoryVault',
          writable: true,
        },
        {
          name: 'stablecoinMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'collateralToken1',
          writable: true,
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'controller.reserve',
                account: 'controller',
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
                path: 'stablecoinMint',
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
          name: 'reserve',
          writable: true,
        },
        {
          name: 'oracle',
        },
        {
          name: 'stabilityPool',
          writable: true,
        },
        {
          name: 'liquidatorPoolController',
        },
        {
          name: 'liquidatorPoolProgram',
          address: 'CeuU7yCrwBt3pSj1UazU7heT6jQiBr9yWasY3NyJTcMo',
        },
        {
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'repayAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'type1RedeemByCollateral',
      discriminator: [19, 152, 177, 94, 230, 90, 158, 92],
      accounts: [
        {
          name: 'user',
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
          name: 'collateral',
          docs: ['CHECK in below'],
          writable: true,
        },
        {
          name: 'redeemableMint',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
        },
        {
          name: 'userRedeemable',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
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
                path: 'redeemableMint',
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
          name: 'userCollateral',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
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
                path: 'collateral',
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
          name: 'depositoryType1',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89, 95, 84, 89, 80, 69, 95, 49],
              },
            ],
          },
        },
        {
          name: 'redeemConfigV2',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 95, 67, 79, 76, 95, 67, 79, 78, 70, 73, 71, 95, 86, 50],
              },
            ],
          },
        },
        {
          name: 'loanAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [76, 79, 65, 78, 95, 84, 89, 80, 69, 95, 49],
              },
              {
                kind: 'account',
                path: 'depositoryType1',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'depositoryVault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'depositoryType1',
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
                path: 'collateral',
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
          name: 'oracle',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'reserveTokenAccount',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'controller.reserve',
                account: 'controller',
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
                path: 'redeemableMint',
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
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'jupiterProgram',
          address: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4',
        },
      ],
      args: [
        {
          name: 'collateralAmount',
          type: 'u64',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
    },
    {
      name: 'updateAuthority',
      discriminator: [32, 46, 64, 28, 149, 75, 243, 88],
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
      name: 'updateMetadata',
      discriminator: [170, 182, 43, 239, 97, 78, 225, 186],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'mint',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
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
          name: 'metadata',
          writable: true,
        },
        {
          name: 'metadataProgram',
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
      ],
      args: [
        {
          name: 'fields',
          type: {
            defined: {
              name: 'metadataFields',
            },
          },
        },
      ],
    },
    {
      name: 'updateTokenAuthority',
      discriminator: [113, 45, 104, 44, 56, 68, 212, 82],
      accounts: [
        {
          name: 'oldAuthority',
          writable: true,
          signer: true,
        },
        {
          name: 'mint',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [82, 69, 68, 69, 69, 77, 65, 66, 76, 69],
              },
            ],
          },
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
          name: 'metadata',
          writable: true,
        },
        {
          name: 'metadataProgram',
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
      ],
      args: [],
    },
    {
      name: 'withdrawInvestment',
      discriminator: [157, 158, 101, 11, 240, 193, 192, 92],
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
          name: 'collateral',
          writable: true,
        },
        {
          name: 'depository',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [68, 69, 80, 79, 83, 73, 84, 79, 82, 89],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'depositoryVault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'depository',
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
                path: 'collateral',
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
          name: 'investment',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'investmentAta',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'investment',
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
                path: 'collateral',
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
          name: 'tokenProgram',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token2022Program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'withdrawRevenue',
      discriminator: [58, 241, 152, 184, 104, 150, 169, 119],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'revenueWalletAta',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'investment.revenue_wallet',
                account: 'investment',
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
                path: 'collateral',
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
          name: 'collateral',
          writable: true,
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
          name: 'investment',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [73, 78, 86, 69, 83, 84, 77, 69, 78, 84],
              },
              {
                kind: 'account',
                path: 'collateral',
              },
            ],
          },
        },
        {
          name: 'investmentAta',
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
        {
          name: 'associatedTokenProgram',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'systemProgram',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'config',
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130],
    },
    {
      name: 'controller',
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110],
    },
    {
      name: 'investment',
      discriminator: [175, 134, 9, 175, 115, 153, 39, 28],
    },
    {
      name: 'loanType0',
      discriminator: [53, 107, 87, 167, 145, 117, 129, 201],
    },
    {
      name: 'loanType1',
      discriminator: [53, 13, 71, 44, 243, 56, 227, 110],
    },
    {
      name: 'redeemByCollateralConfigV2',
      discriminator: [84, 193, 134, 218, 211, 27, 137, 25],
    },
    {
      name: 'type0Depository',
      discriminator: [202, 54, 70, 164, 112, 15, 110, 15],
    },
    {
      name: 'type1Depository',
      discriminator: [132, 68, 105, 249, 215, 58, 64, 100],
    },
    {
      name: 'userInfo',
      discriminator: [83, 134, 200, 56, 144, 56, 10, 62],
    },
    {
      name: 'vaultInfo',
      discriminator: [133, 250, 161, 78, 246, 27, 55, 187],
    },
    {
      name: 'whitelistAdmin',
      discriminator: [163, 150, 229, 143, 243, 38, 17, 133],
    },
  ],
  events: [
    {
      name: 'burnType1Event',
      discriminator: [11, 185, 25, 36, 190, 113, 131, 112],
    },
    {
      name: 'changeNewCollateralType1',
      discriminator: [204, 46, 186, 111, 9, 18, 59, 191],
    },
    {
      name: 'depositType1Event',
      discriminator: [156, 35, 223, 38, 224, 11, 167, 142],
    },
    {
      name: 'initType1CollateralEvent',
      discriminator: [222, 18, 74, 167, 241, 110, 231, 123],
    },
    {
      name: 'initializeControllerEvent',
      discriminator: [236, 159, 123, 225, 71, 177, 241, 0],
    },
    {
      name: 'interactWithTypeODepositoryEvent',
      discriminator: [125, 235, 2, 36, 55, 93, 10, 168],
    },
    {
      name: 'liquidationEvent',
      discriminator: [3, 13, 21, 93, 173, 136, 72, 144],
    },
    {
      name: 'mintType1Event',
      discriminator: [126, 100, 125, 84, 68, 45, 186, 158],
    },
    {
      name: 'setType0DepositoryCollateralizationRatioEvent',
      discriminator: [4, 74, 218, 241, 218, 173, 162, 203],
    },
    {
      name: 'setType0DepositoryDebtCeilingEvent',
      discriminator: [162, 223, 218, 229, 13, 36, 112, 235],
    },
    {
      name: 'setType0DepositoryDustEvent',
      discriminator: [208, 216, 15, 253, 231, 140, 166, 137],
    },
    {
      name: 'setType0DepositoryLiquidationPenaltyEvent',
      discriminator: [141, 77, 152, 220, 108, 21, 131, 81],
    },
    {
      name: 'setType0DepositoryLiquidationRatioEvent',
      discriminator: [254, 226, 122, 32, 109, 103, 167, 214],
    },
    {
      name: 'setType1CollateralizationRatioEvent',
      discriminator: [199, 32, 48, 73, 248, 227, 12, 102],
    },
    {
      name: 'setType1DepositoryDebtCeilingEvent',
      discriminator: [100, 63, 166, 98, 124, 248, 249, 11],
    },
    {
      name: 'setType1DepositoryDustEvent',
      discriminator: [205, 116, 246, 116, 116, 149, 88, 210],
    },
    {
      name: 'setType1DepositoryLiquidationPenaltyEvent',
      discriminator: [130, 94, 135, 160, 72, 37, 20, 29],
    },
    {
      name: 'setType1LiquidationRatioEvent',
      discriminator: [60, 113, 146, 120, 221, 42, 2, 133],
    },
    {
      name: 'withdrawType1Event',
      discriminator: [26, 70, 17, 231, 83, 229, 33, 49],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'invalidRedeemableMintDecimals',
      msg: 'The redeemable mint decimals must be between 0 and 9 (inclusive).',
    },
    {
      code: 6001,
      name: 'invalidRedeemableGlobalSupplyCap',
      msg: 'Redeemable global supply above.',
    },
    {
      code: 6002,
      name: 'invalidDepositoriesWeightBps',
      msg: 'Depositories weights do not add up to 100%.',
    },
    {
      code: 6003,
      name: 'invalidDepositoriesVector',
      msg: 'Depositories vector passed as parameter is not of the expected length',
    },
    {
      code: 6004,
      name: 'invalidCollateralAmount',
      msg: 'Collateral amount cannot be 0',
    },
    {
      code: 6005,
      name: 'invalidRedeemableAmount',
      msg: 'Redeemable amount must be > 0 in order to redeem.',
    },
    {
      code: 6006,
      name: 'insufficientCollateralAmount',
      msg: 'The balance of the collateral ATA is not enough to fulfill the mint operation.',
    },
    {
      code: 6007,
      name: 'insufficientRedeemableAmount',
      msg: 'The balance of the redeemable ATA is not enough to fulfill the redeem operation.',
    },
    {
      code: 6008,
      name: 'depositoriesTargerRedeemableAmountReached',
      msg: 'Minting amount would go past the depositories target redeemable amount.',
    },
    {
      code: 6009,
      name: 'redeemableGlobalSupplyCapReached',
      msg: 'Minting amount would go past the Redeemable Global Supply Cap.',
    },
    {
      code: 6010,
      name: 'redeemableMercurialVaultAmountUnderManagementCap',
      msg: 'Minting amount would go past the mercurial vault depository Redeemable Amount Under Management Cap.',
    },
    {
      code: 6011,
      name: 'redeemableCredixLpAmountUnderManagementCap',
      msg: 'Minting amount would go past the credix lp depository Redeemable Amount Under Management Cap.',
    },
    {
      code: 6012,
      name: 'mathOverflow',
      msg: 'Math overflow.',
    },
    {
      code: 6013,
      name: 'slippageReached',
      msg: "The order couldn't be executed with the provided slippage.",
    },
    {
      code: 6014,
      name: 'bumpError',
      msg: 'A bump was expected but is missing.',
    },
    {
      code: 6015,
      name: 'mintingDisabled',
      msg: 'Minting is disabled for the current depository.',
    },
    {
      code: 6016,
      name: 'collateralDepositHasRemainingDust',
      msg: 'Collateral deposit left some value unaccounted for.',
    },
    {
      code: 6017,
      name: 'collateralDepositAmountsDoesntMatch',
      msg: "Collateral deposit didn't result in the correct amounts being moved.",
    },
    {
      code: 6018,
      name: 'collateralDepositDoesntMatchTokenValue',
      msg: "Received token of which the value doesn't match the deposited collateral.",
    },
    {
      code: 6019,
      name: 'invalidMercurialVaultLpMint',
      msg: "The mercurial vault lp mint does not match the Depository's one.",
    },
    {
      code: 6020,
      name: 'maxNumberOfMercurialVaultDepositoriesRegisteredReached',
      msg: 'Cannot register more mercurial vault depositories, the limit has been reached.',
    },
    {
      code: 6021,
      name: 'maxNumberOfCredixLpDepositoriesRegisteredReached',
      msg: 'Cannot register more credix lp depositories, the limit has been reached.',
    },
    {
      code: 6022,
      name: 'mercurialVaultDoNotMatchCollateral',
      msg: 'The provided collateral do not match the provided mercurial vault token.',
    },
    {
      code: 6023,
      name: 'credixLpDoNotMatchCollateral',
      msg: 'The provided collateral do not match the provided credix lp token.',
    },
    {
      code: 6024,
      name: 'collateralMintEqualToRedeemableMint',
      msg: 'Collateral mint should be different than redeemable mint.',
    },
    {
      code: 6025,
      name: 'collateralMintNotAllowed',
      msg: 'Provided collateral mint is not allowed.',
    },
    {
      code: 6026,
      name: 'minimumMintedRedeemableAmountError',
      msg: 'Mint resulted to 0 redeemable token being minted.',
    },
    {
      code: 6027,
      name: 'maximumMintedRedeemableAmountError',
      msg: 'Mint resulted into too much redeemable token being minted.',
    },
    {
      code: 6028,
      name: 'minimumRedeemedCollateralAmountError',
      msg: 'Redeem resulted to 0 collateral token being redeemed.',
    },
    {
      code: 6029,
      name: 'maximumRedeemedCollateralAmountError',
      msg: 'Redeem resulted into too much collateral token being redeemed.',
    },
    {
      code: 6030,
      name: 'invalidDepositoryLpTokenVault',
      msg: "The depository lp token vault does not match the Depository's one.",
    },
    {
      code: 6031,
      name: 'invalidTime',
      msg: 'Cannot update the past states.',
    },
    {
      code: 6032,
      name: 'authorityPulled',
      msg: 'The authority of this program has been pulled.',
    },
    {
      code: 6033,
      name: 'invalidAuthority',
      msg: 'Only the Program initializer authority can access this instructions.',
    },
    {
      code: 6034,
      name: 'invalidController',
      msg: "The Depository's controller doesn't match the provided Controller.",
    },
    {
      code: 6035,
      name: 'invalidDepository',
      msg: 'The Depository provided is not matching the one stored in the Controller.',
    },
    {
      code: 6036,
      name: 'invalidCollateralMint',
      msg: "The provided collateral mint does not match the depository's collateral mint.",
    },
    {
      code: 6037,
      name: 'invalidRedeemableMint',
      msg: "The Redeemable Mint provided does not match the Controller's one.",
    },
    {
      code: 6038,
      name: 'invalidOwner',
      msg: 'The provided token account is not owner by the expected party.',
    },
    {
      code: 6039,
      name: 'invalidDepositoryCollateral',
      msg: "The provided depository collateral does not match the depository's one.",
    },
    {
      code: 6040,
      name: 'invalidDepositoryShares',
      msg: "The provided depository shares does not match the depository's one.",
    },
    {
      code: 6041,
      name: 'invalidProfitsBeneficiaryCollateral',
      msg: "The Profits beneficiary collateral provided does not match the depository's one.",
    },
    {
      code: 6042,
      name: 'invalidMercurialVault',
      msg: "The provided mercurial vault does not match the Depository's one.",
    },
    {
      code: 6043,
      name: 'invalidMercurialVaultCollateralTokenSafe',
      msg: 'The provided mercurial vault collateral token safe does not match the mercurial vault one.',
    },
    {
      code: 6044,
      name: 'redeemableIdentityDepositoryAmountUnderManagementCap',
      msg: 'Minting amount would go past the identity depository Redeemable Amount Under Management Cap.',
    },
    {
      code: 6045,
      name: 'programAlreadyFrozenOrResumed',
      msg: 'Program is already frozen/resumed.',
    },
    {
      code: 6046,
      name: 'programFrozen',
      msg: 'The program is currently in Frozen state.',
    },
    {
      code: 6047,
      name: 'invalidCredixProgramState',
      msg: "The Credix ProgramState isn't the Depository one.",
    },
    {
      code: 6048,
      name: 'invalidCredixGlobalMarketState',
      msg: "The Credix GlobalMarketState isn't the Depository one.",
    },
    {
      code: 6049,
      name: 'invalidCredixSigningAuthority',
      msg: "The Credix SigningAuthority isn't the Depository one.",
    },
    {
      code: 6050,
      name: 'invalidCredixLiquidityCollateral',
      msg: "The Credix LiquidityCollateral isn't the Depository one.",
    },
    {
      code: 6051,
      name: 'invalidCredixSharesMint',
      msg: "The Credix SharesMint isn't the Depository one.",
    },
    {
      code: 6052,
      name: 'invalidCredixPass',
      msg: "The Credix Pass isn't the one owned by the correct depository.",
    },
    {
      code: 6053,
      name: 'invalidCredixPassNoFees',
      msg: "The Credix Pass doesn't have the fees exemption.",
    },
    {
      code: 6054,
      name: 'invalidCredixTreasury',
      msg: "The Credix Treasury isn't the ProgramState one.",
    },
    {
      code: 6055,
      name: 'invalidCredixTreasuryPoolCollateral',
      msg: "The Credix TreasuryPool isn't the GlobalMarketState one.",
    },
    {
      code: 6056,
      name: 'invalidCredixWithdrawEpochRequestPhase',
      msg: "The Credix WithdrawEpoch isn't in its request phase.",
    },
    {
      code: 6057,
      name: 'invalidCredixWithdrawEpochRedeemPhase',
      msg: "The Credix WithdrawEpoch isn't in its redeem phase.",
    },
    {
      code: 6058,
      name: 'default',
      msg: 'Default - Check the source code for more info.',
    },
    {
      code: 6059,
      name: 'maximumOutflowAmountError',
      msg: 'Redeem resulted into too much outflow in this epoch, please wait or try again with a smaller amount.',
    },
    {
      code: 6060,
      name: 'invalidOutflowLimitPerEpochBps',
      msg: 'The outflow_limit_per_epoch_bps is invalid: over 100%.',
    },
    {
      code: 6061,
      name: 'exceededCollateralMintCapError',
      msg: 'No more coins can be minted because the limit of this collateral has been reached.',
    },
    {
      code: 6062,
      name: 'loanNoDebt',
      msg: 'Loan has no debt to liquidate.',
    },
    {
      code: 6063,
      name: 'invalidRepayAmount',
      msg: 'Invalid repay amount.',
    },
    {
      code: 6064,
      name: 'insufficientCollateral',
      msg: 'Insufficient collateral in the Loan.',
    },
    {
      code: 6065,
      name: 'globalLiquidationLimitExceeded',
      msg: 'Global liquidation limit exceeded.',
    },
    {
      code: 6066,
      name: 'invalidAccount',
      msg: 'Invalid account provided.',
    },
    {
      code: 6067,
      name: 'notEligibleForLiquidation',
      msg: 'Loan is not eligible for liquidation based on LTV threshold.',
    },
    {
      code: 6068,
      name: 'insufficientRepayment',
      msg: 'Insufficient collateral value to liquidate debt.',
    },
    {
      code: 6069,
      name: 'exceededCollateralRatioError',
      msg: 'Collateral value is lower than required to satisfy Collateralization Ratio.',
    },
    {
      code: 6070,
      name: 'liquidationToHigherThanCollateralizationRatio',
      msg: 'Liquidation to higher than Collateralization Ratio is not allowed.',
    },
    {
      code: 6071,
      name: 'invalidForLiquidation',
      msg: 'Invalid for liquidation, max LTV is not violated.',
    },
    {
      code: 6072,
      name: 'invalidRepayAmountForCollateral',
      msg: 'Invalid repay amount for the collateral',
    },
    {
      code: 6073,
      name: 'repayAmountExceedDebt',
      msg: 'The repay amount exceeds the debt.',
    },
    {
      code: 6074,
      name: 'withdrawAmountExceed',
      msg: 'The withdraw amount exceeds the debt.',
    },
    {
      code: 6075,
      name: 'invalidAccountDiscriminator',
      msg: 'Invalid account discriminator',
    },
    {
      code: 6076,
      name: 'unableToDeserializeAccount',
      msg: 'Unable to deserialize account',
    },
    {
      code: 6077,
      name: 'invalidOracle',
      msg: 'The provided oracle account is invalid.',
    },
    {
      code: 6078,
      name: 'onlyOneLoanAccount',
      msg: 'Only 1 loan account to be liquidated',
    },
    {
      code: 6079,
      name: 'invalidCollateralizationRatio',
      msg: 'Cannot liquidate to lower than Collateralization Ratio.',
    },
    {
      code: 6080,
      name: 'invalidReserveAccount',
      msg: 'The provided reserve account is invalid',
    },
    {
      code: 6081,
      name: 'invalidAccountSize',
      msg: 'The new size provided is not match the needed space for migration.',
    },
    {
      code: 6082,
      name: 'priceNotUpdate',
      msg: "The price of this collateral hasn't been updated for 10 minute.",
    },
    {
      code: 6083,
      name: 'invalidMetadata',
      msg: 'The provided metadata account is invalid.',
    },
    {
      code: 6084,
      name: 'tokenNotFound',
      msg: 'Token not found in price group oracle.',
    },
    {
      code: 6085,
      name: 'rateExceedDouble',
      msg: 'Borrow rate has been increasing too high',
    },
    {
      code: 6086,
      name: 'depositoryPaused',
      msg: 'The depository is paused',
    },
    {
      code: 6087,
      name: 'noMoreCollateral',
      msg: 'No more collateral',
    },
    {
      code: 6088,
      name: 'invalidNumOfCollateral',
      msg: 'The number of collateral is invalid because it is smaller than now',
    },
    {
      code: 6089,
      name: 'overIndex',
      msg: 'Over index',
    },
    {
      code: 6090,
      name: 'zeroAmount',
      msg: 'Zero amount',
    },
    {
      code: 6091,
      name: 'conflictIndex',
      msg: 'Index is initialized, please use change collateral method',
    },
    {
      code: 6092,
      name: 'collateralAlreadyInitialized',
      msg: 'Collateral is initialized',
    },
    {
      code: 6093,
      name: 'loanIsFull',
      msg: 'User loan is already full with 8 collaterals.',
    },
    {
      code: 6094,
      name: 'notFoundCollateralTokenInLoan',
      msg: 'The collateral token has not been deposited.',
    },
    {
      code: 6095,
      name: 'notFoundCollateral',
      msg: 'The collateral token is invalid in the depository.',
    },
    {
      code: 6096,
      name: 'notFoundCollateralLoan',
      msg: 'The collateral is not deposited.',
    },
    {
      code: 6097,
      name: 'collateralTotalNotZero',
      msg: 'Cannot change collateral because of remaining deposit amount.',
    },
    {
      code: 6098,
      name: 'stabilityPoolSupplyCapExceeded',
      msg: 'The supplied stablecoin in stability pool exceeds its supply cap',
    },
    {
      code: 6099,
      name: 'invalidLiquidator',
      msg: 'The liquidator is not whitelisted',
    },
    {
      code: 6100,
      name: 'depositToSmartVaultFailed',
      msg: 'Fail to deposit to the smart vault',
    },
    {
      code: 6101,
      name: 'requestWithdrawToSmartVaultFailed',
      msg: 'Fail to request withdraw to the smart vault',
    },
    {
      code: 6102,
      name: 'invalidSmartVaultProgram',
      msg: 'Invalid smart vault program',
    },
    {
      code: 6103,
      name: 'proportionInvestmentNotInitialized',
      msg: 'Proportion of investment account not initialized',
    },
    {
      code: 6104,
      name: 'invalidSigner',
      msg: 'Invalid Signer Pda',
    },
    {
      code: 6105,
      name: 'exceededInvestmentError',
      msg: 'Investment amount is different desired amount the investment limit',
    },
    {
      code: 6106,
      name: 'proportionInvestmentInvalid',
      msg: 'Investment proportion is invalid',
    },
    {
      code: 6107,
      name: 'invalidWithdrawLendingAmount',
      msg: 'Lending amount is invalid',
    },
    {
      code: 6108,
      name: 'invalidDepositAmountUsdc',
      msg: 'The amount of USDC to deposit to smartvault is invalid',
    },
    {
      code: 6109,
      name: 'invalidRedeemAmount',
      msg: 'Invalid redeem amount - must be greater than zero',
    },
    {
      code: 6110,
      name: 'redeemAmountExceedsMax',
      msg: 'Redeem amount exceeds maximum allowed',
    },
    {
      code: 6111,
      name: 'redeemAmountBelowMin',
      msg: 'Redeem amount below minimum allowed',
    },
    {
      code: 6112,
      name: 'insufficientUsdaiBalance',
      msg: 'Insufficient USDAI balance for redemption',
    },
    {
      code: 6113,
      name: 'insufficientCollateralBalance',
      msg: 'Insufficient collateral for redemption',
    },
    {
      code: 6114,
      name: 'redeemAmountExceedsRateLimit',
      msg: 'Redeem amount exceeds maximum allowed by rate',
    },
    {
      code: 6115,
      name: 'swapAmountBelowMinimum',
      msg: 'Swap amount below minimum required',
    },
    {
      code: 6116,
      name: 'swapAmountExceedsMaximum',
      msg: 'Swap amount exceeds maximum allowed',
    },
    {
      code: 6117,
      name: 'invalidSwapData',
      msg: 'Invalid swap data',
    },
    {
      code: 6118,
      name: 'redeemConfigInactive',
      msg: 'Redeem config is not active',
    },
    {
      code: 6119,
      name: 'invalidRedeemConfigCollateral',
      msg: 'Invalid collateral mint in redeem config',
    },
    {
      code: 6120,
      name: 'invalidConfig',
      msg: 'Invalid config',
    },
    {
      code: 6121,
      name: 'invalidCollateralTransfer',
      msg: 'Error in collateral transfer - amount exceeds expected',
    },
    {
      code: 6122,
      name: 'depositAboveLimit',
      msg: 'Deposit amount above limit',
    },
    {
      code: 6123,
      name: 'insufficientFundsForInvestment',
      msg: 'Insufficient funds for investment',
    },
    {
      code: 6124,
      name: 'priceDifferenceTooHigh',
      msg: 'Price difference too high',
    },
    {
      code: 6125,
      name: 'notFoundCollateralInRedeemByCollateral',
      msg: 'Not found collateral in redeem by collateral',
    },
    {
      code: 6126,
      name: 'collateralIsPausedForRedeemByCollateral',
      msg: 'Collateral is paused for redeem by collateral',
    },
    {
      code: 6127,
      name: 'invalidWhitelistAdmin',
      msg: 'Invalid whitelist admin',
    },
    {
      code: 6128,
      name: 'whiteListAdminIsFull',
      msg: 'White list admin is full',
    },
    {
      code: 6129,
      name: 'collateralAlreadyExists',
      msg: 'Collateral already exists',
    },
    {
      code: 6130,
      name: 'adminAlreadyInit',
      msg: 'Admin already initialized',
    },
    {
      code: 6131,
      name: 'collateralIsPaused',
      msg: 'Collateral is paused',
    },
  ],
  types: [
    {
      name: 'burnType1Event',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'burnAmount',
            type: 'u64',
          },
          {
            name: 'newDebt',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'changeNewCollateralType1',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'collateralNew',
            type: 'pubkey',
          },
          {
            name: 'collateralOld',
            type: 'pubkey',
          },
          {
            name: 'collateralizationRatioType1',
            type: 'u64',
          },
          {
            name: 'liquidationRatioType1',
            type: 'u64',
          },
          {
            name: 'isPausedType1',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'collateralType1',
      serialization: 'bytemuck',
      repr: {
        kind: 'c',
      },
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralMint',
            type: 'pubkey',
          },
          {
            name: 'collateralTotal',
            type: 'u64',
          },
          {
            name: 'collateralizationRatio',
            type: 'u64',
          },
          {
            name: 'liquidationRatio',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'decimals',
            type: 'u8',
          },
          {
            name: 'isPaused',
            type: 'u8',
          },
          {
            name: 'padding',
            type: {
              array: ['u8', 13],
            },
          },
        ],
      },
    },
    {
      name: 'config',
      serialization: 'bytemuckunsafe',
      repr: {
        kind: 'c',
      },
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'pubkey',
          },
          {
            name: 'vaultBotServer',
            type: 'pubkey',
          },
          {
            name: 'feeWallet',
            type: 'pubkey',
          },
          {
            name: 'allowedLendingPools',
            type: {
              array: ['pubkey', 10],
            },
          },
          {
            name: 'performanceFeePercent',
            type: 'u64',
          },
          {
            name: 'monthlyManagementFee',
            type: 'u64',
          },
          {
            name: 'nextMonthlyFeeCollectionTime',
            type: 'u64',
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
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'redeemableMintBump',
            type: 'u8',
          },
          {
            name: 'authority',
            type: 'pubkey',
          },
          {
            name: 'pendingAuthority',
            type: 'pubkey',
          },
          {
            name: 'redeemableMint',
            type: 'pubkey',
          },
          {
            name: 'debtSupply',
            type: 'u64',
          },
          {
            name: 'debtSupplycap',
            type: 'u64',
          },
          {
            name: 'base',
            type: 'u64',
          },
          {
            name: 'reserve',
            type: 'pubkey',
          },
          {
            name: 'redeemableOracle',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'depositType1Event',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'collateral',
            type: 'pubkey',
          },
          {
            name: 'collateralAmount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'editControllerFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'debtSupplycap',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'base',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'oracle',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'reserve',
            type: {
              option: 'pubkey',
            },
          },
        ],
      },
    },
    {
      name: 'editType0DepositoryFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'debtCeiling',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'collateralizationRatio',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'liquidationRatio',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'liquidationPenalty',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'dust',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'duty',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'rate',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'oracle',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'pause',
            type: {
              option: 'bool',
            },
          },
          {
            name: 'limit',
            type: {
              option: {
                option: 'u64',
              },
            },
          },
        ],
      },
    },
    {
      name: 'editType1CollateralFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralizationRatioType1',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'liquidationRatioType1',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'isPauseCollateralType1',
            type: {
              option: 'u8',
            },
          },
        ],
      },
    },
    {
      name: 'editType1DepositoryFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'oracle',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'debtCeiling',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'liquidationPenalty',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'dust',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'duty',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'rate',
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
    {
      name: 'initType1CollateralEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'collateral',
            type: 'pubkey',
          },
          {
            name: 'collateralizationRatioType1',
            type: 'u64',
          },
          {
            name: 'liquidationRatioType1',
            type: 'u64',
          },
          {
            name: 'isPausedType1',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'initializeControllerEvent',
      docs: ['Event called in [instructions::initialize_controller::handler].'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'version',
            docs: ['The controller version.'],
            type: 'u8',
          },
          {
            name: 'controller',
            docs: ['The controller being created.'],
            type: 'pubkey',
          },
          {
            name: 'authority',
            docs: ['The authority.'],
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'interactWithTypeODepositoryEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'collateral',
            type: 'pubkey',
          },
          {
            name: 'collateralAmount',
            type: 'u64',
          },
          {
            name: 'debtAmount',
            type: 'u64',
          },
          {
            name: 'collateralFlag',
            type: 'bool',
          },
          {
            name: 'loanFlag',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'investment',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amountType0',
            type: 'u64',
          },
          {
            name: 'amountType1',
            type: 'u64',
          },
          {
            name: 'proportion',
            type: 'u64',
          },
          {
            name: 'revenue',
            type: 'u64',
          },
          {
            name: 'whitelistWallet',
            type: 'pubkey',
          },
          {
            name: 'revenueWallet',
            type: 'pubkey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'liquidationEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'liquidator',
            type: 'pubkey',
          },
          {
            name: 'repayAmount',
            type: 'u64',
          },
          {
            name: 'collateralClaimed',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'loanType0',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralAmount',
            type: 'u64',
          },
          {
            name: 'mintedAmount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'loanType1',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralToken',
            type: {
              array: ['pubkey', 8],
            },
          },
          {
            name: 'collateralAmount',
            type: {
              array: ['u64', 8],
            },
          },
          {
            name: 'mintedAmount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'metadataFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'sellerFeeBasisPoints',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'mintType1Event',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'mintAmount',
            type: 'u64',
          },
          {
            name: 'newDebt',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'priceGroup',
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
            name: 'priceGroupData',
            type: {
              vec: {
                defined: {
                  name: 'priceGroupData',
                },
              },
            },
          },
          {
            name: 'updatedTimestamp',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'priceGroupData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tokenMint',
            type: 'pubkey',
          },
          {
            name: 'price',
            type: 'f64',
          },
        ],
      },
    },
    {
      name: 'pricePair',
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
            name: 'metadata',
            docs: ['Owner of the configuration'],
            type: 'pubkey',
          },
          {
            name: 'price',
            type: 'f64',
          },
          {
            name: 'updatedTimestamp',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'redeemByCollateralConfigV2',
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
            name: 'isPausedCollateral',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'isPausedFunction',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'setType0DepositoryCollateralizationRatioEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'collateralizationRatio',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType0DepositoryDebtCeilingEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'debtCeiling',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType0DepositoryDustEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'dust',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType0DepositoryLiquidationPenaltyEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'liquidationPenalty',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType0DepositoryLiquidationRatioEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'liquidationRatio',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType1CollateralizationRatioEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'collateral',
            type: 'pubkey',
          },
          {
            name: 'collateralizationRatio',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType1DepositoryDebtCeilingEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'debtCeiling',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType1DepositoryDustEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'dust',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType1DepositoryLiquidationPenaltyEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'depository',
            type: 'pubkey',
          },
          {
            name: 'liquidationPenalty',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'setType1LiquidationRatioEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'controller',
            type: 'pubkey',
          },
          {
            name: 'colateral',
            type: 'pubkey',
          },
          {
            name: 'liquidationRatio',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'type0Depository',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateral',
            type: 'pubkey',
          },
          {
            name: 'oracle',
            type: 'pubkey',
          },
          {
            name: 'debtCeiling',
            type: 'u64',
          },
          {
            name: 'collateralizationRatio',
            type: 'u64',
          },
          {
            name: 'liquidationRatio',
            type: 'u64',
          },
          {
            name: 'liquidationPenalty',
            type: 'u64',
          },
          {
            name: 'debtTotal',
            type: 'u64',
          },
          {
            name: 'collateralTotal',
            type: 'u64',
          },
          {
            name: 'dust',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'duty',
            type: 'u64',
          },
          {
            name: 'rho',
            type: 'u64',
          },
          {
            name: 'rate',
            type: 'u64',
          },
          {
            name: 'isPaused',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'type1Depository',
      serialization: 'bytemuck',
      repr: {
        kind: 'c',
      },
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralType1',
            type: {
              array: [
                {
                  defined: {
                    name: 'collateralType1',
                  },
                },
                32,
              ],
            },
          },
          {
            name: 'collateralTokens',
            type: {
              array: ['pubkey', 32],
            },
          },
          {
            name: 'oracle',
            type: 'pubkey',
          },
          {
            name: 'debtCeilingType1',
            type: 'u64',
          },
          {
            name: 'debtTotal',
            type: 'u64',
          },
          {
            name: 'liquidationPenalty',
            type: 'u64',
          },
          {
            name: 'dust',
            type: 'u64',
          },
          {
            name: 'duty',
            type: 'u64',
          },
          {
            name: 'rho',
            type: 'u64',
          },
          {
            name: 'rate',
            type: 'u64',
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
              array: ['u8', 6],
            },
          },
        ],
      },
    },
    {
      name: 'userInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'depositedLendingUsdc',
            type: 'f64',
          },
          {
            name: 'depositedUsdc',
            type: 'u64',
          },
          {
            name: 'reserveUsdc',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'vaultInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'lendingPool',
            type: 'pubkey',
          },
          {
            name: 'totalLendingUsdc',
            type: 'f64',
          },
          {
            name: 'reserveUsdc',
            type: 'u64',
          },
          {
            name: 'isLocked',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'whitelistAdmin',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'whitelistAdmins',
            type: {
              array: ['pubkey', 5],
            },
          },
        ],
      },
    },
    {
      name: 'withdrawType1Event',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'collateral',
            type: 'pubkey',
          },
          {
            name: 'collateralAmount',
            type: 'u64',
          },
        ],
      },
    },
  ],
};
