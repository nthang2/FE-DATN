export type IdlLending = {
  address: '8muCr8KxAyga2zHQoZYVPYm4h6jVzhLwWZp1AhLmQv4G';
  metadata: {
    name: 'lending';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'editController';
      discriminator: [132, 153, 227, 60, 132, 180, 226, 209];
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
      name: 'interactWithType0Depository';
      discriminator: [100, 95, 23, 115, 241, 176, 198, 171];
      accounts: [
        {
          name: 'user';
          docs: ['#1'];
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
        },
        {
          name: 'controller';
          docs: ['controller'];
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
          docs: ['#2'];
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
          docs: ['#2'];
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
      name: 'liquidate';
      discriminator: [223, 179, 226, 125, 48, 46, 39, 74];
      accounts: [
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
          docs: ['#2'];
          writable: true;
        },
        {
          name: 'loan';
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
      name: 'updateRate';
      discriminator: [24, 225, 53, 189, 72, 212, 225, 178];
      accounts: [
        {
          name: 'authority';
          signer: true;
        },
        {
          name: 'depository';
          writable: true;
        },
        {
          name: 'controller';
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
          name: 'liquidatorRedeemable';
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
    }
  ];
  accounts: [
    {
      name: 'controller';
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110];
    },
    {
      name: 'loan';
      discriminator: [20, 195, 70, 117, 165, 227, 182, 1];
    },
    {
      name: 'type0Depository';
      discriminator: [202, 54, 70, 164, 112, 15, 110, 15];
    }
  ];
  events: [
    {
      name: 'initializeControllerEvent';
      discriminator: [236, 159, 123, 225, 71, 177, 241, 0];
    },
    {
      name: 'liquidationEvent';
      discriminator: [3, 13, 21, 93, 173, 136, 72, 144];
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
      name: 'invalidAuthority';
      msg: 'Only the Program initializer authority can access this instructions.';
    },
    {
      code: 6033;
      name: 'invalidController';
      msg: "The Depository's controller doesn't match the provided Controller.";
    },
    {
      code: 6034;
      name: 'invalidDepository';
      msg: 'The Depository provided is not matching the one stored in the Controller.';
    },
    {
      code: 6035;
      name: 'invalidCollateralMint';
      msg: "The provided collateral mint does not match the depository's collateral mint.";
    },
    {
      code: 6036;
      name: 'invalidRedeemableMint';
      msg: "The Redeemable Mint provided does not match the Controller's one.";
    },
    {
      code: 6037;
      name: 'invalidOwner';
      msg: 'The provided token account is not owner by the expected party.';
    },
    {
      code: 6038;
      name: 'invalidDepositoryCollateral';
      msg: "The provided depository collateral does not match the depository's one.";
    },
    {
      code: 6039;
      name: 'invalidDepositoryShares';
      msg: "The provided depository shares does not match the depository's one.";
    },
    {
      code: 6040;
      name: 'invalidProfitsBeneficiaryCollateral';
      msg: "The Profits beneficiary collateral provided does not match the depository's one.";
    },
    {
      code: 6041;
      name: 'invalidMercurialVault';
      msg: "The provided mercurial vault does not match the Depository's one.";
    },
    {
      code: 6042;
      name: 'invalidMercurialVaultCollateralTokenSafe';
      msg: 'The provided mercurial vault collateral token safe does not match the mercurial vault one.';
    },
    {
      code: 6043;
      name: 'redeemableIdentityDepositoryAmountUnderManagementCap';
      msg: 'Minting amount would go past the identity depository Redeemable Amount Under Management Cap.';
    },
    {
      code: 6044;
      name: 'programAlreadyFrozenOrResumed';
      msg: 'Program is already frozen/resumed.';
    },
    {
      code: 6045;
      name: 'programFrozen';
      msg: 'The program is currently in Frozen state.';
    },
    {
      code: 6046;
      name: 'invalidCredixProgramState';
      msg: "The Credix ProgramState isn't the Depository one.";
    },
    {
      code: 6047;
      name: 'invalidCredixGlobalMarketState';
      msg: "The Credix GlobalMarketState isn't the Depository one.";
    },
    {
      code: 6048;
      name: 'invalidCredixSigningAuthority';
      msg: "The Credix SigningAuthority isn't the Depository one.";
    },
    {
      code: 6049;
      name: 'invalidCredixLiquidityCollateral';
      msg: "The Credix LiquidityCollateral isn't the Depository one.";
    },
    {
      code: 6050;
      name: 'invalidCredixSharesMint';
      msg: "The Credix SharesMint isn't the Depository one.";
    },
    {
      code: 6051;
      name: 'invalidCredixPass';
      msg: "The Credix Pass isn't the one owned by the correct depository.";
    },
    {
      code: 6052;
      name: 'invalidCredixPassNoFees';
      msg: "The Credix Pass doesn't have the fees exemption.";
    },
    {
      code: 6053;
      name: 'invalidCredixTreasury';
      msg: "The Credix Treasury isn't the ProgramState one.";
    },
    {
      code: 6054;
      name: 'invalidCredixTreasuryPoolCollateral';
      msg: "The Credix TreasuryPool isn't the GlobalMarketState one.";
    },
    {
      code: 6055;
      name: 'invalidCredixWithdrawEpochRequestPhase';
      msg: "The Credix WithdrawEpoch isn't in its request phase.";
    },
    {
      code: 6056;
      name: 'invalidCredixWithdrawEpochRedeemPhase';
      msg: "The Credix WithdrawEpoch isn't in its redeem phase.";
    },
    {
      code: 6057;
      name: 'default';
      msg: 'Default - Check the source code for more info.';
    },
    {
      code: 6058;
      name: 'maximumOutflowAmountError';
      msg: 'Redeem resulted into too much outflow in this epoch, please wait or try again with a smaller amount.';
    },
    {
      code: 6059;
      name: 'invalidOutflowLimitPerEpochBps';
      msg: 'The outflow_limit_per_epoch_bps is invalid: over 100%.';
    },
    {
      code: 6060;
      name: 'err';
      msg: 'err';
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
      msg: 'The value of the debt exceeds the radio collateral ratio multiplied by the value of the collateral';
    },
    {
      code: 6070;
      name: 'invalidForLiquidation';
      msg: 'Invalid for liquidation, max LTV is not violated.';
    },
    {
      code: 6071;
      name: 'repayAmountExceedDebt';
      msg: 'The repay amount exceeds the debt.';
    },
    {
      code: 6072;
      name: 'invalidAccountDiscriminator';
      msg: 'Invalid account discriminator';
    },
    {
      code: 6073;
      name: 'unableToDeserializeAccount';
      msg: 'Unable to deserialize account';
    }
  ];
  types: [
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
      name: 'loan';
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
      name: 'type0Depository';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateral';
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
          }
        ];
      };
    }
  ];
};

export const idlLending: IdlLending = {
  address: '8muCr8KxAyga2zHQoZYVPYm4h6jVzhLwWZp1AhLmQv4G',
  metadata: {
    name: 'lending',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'editController',
      discriminator: [132, 153, 227, 60, 132, 180, 226, 209],
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
      name: 'interactWithType0Depository',
      discriminator: [100, 95, 23, 115, 241, 176, 198, 171],
      accounts: [
        {
          name: 'user',
          docs: ['#1'],
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
        },
        {
          name: 'controller',
          docs: ['controller'],
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
          docs: ['#2'],
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
          docs: ['#2'],
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
      name: 'liquidate',
      discriminator: [223, 179, 226, 125, 48, 46, 39, 74],
      accounts: [
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
          docs: ['#2'],
          writable: true,
        },
        {
          name: 'loan',
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
      name: 'updateRate',
      discriminator: [24, 225, 53, 189, 72, 212, 225, 178],
      accounts: [
        {
          name: 'authority',
          signer: true,
        },
        {
          name: 'depository',
          writable: true,
        },
        {
          name: 'controller',
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
          name: 'liquidatorRedeemable',
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
  ],
  accounts: [
    {
      name: 'controller',
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110],
    },
    {
      name: 'loan',
      discriminator: [20, 195, 70, 117, 165, 227, 182, 1],
    },
    {
      name: 'type0Depository',
      discriminator: [202, 54, 70, 164, 112, 15, 110, 15],
    },
  ],
  events: [
    {
      name: 'initializeControllerEvent',
      discriminator: [236, 159, 123, 225, 71, 177, 241, 0],
    },
    {
      name: 'liquidationEvent',
      discriminator: [3, 13, 21, 93, 173, 136, 72, 144],
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
      name: 'invalidAuthority',
      msg: 'Only the Program initializer authority can access this instructions.',
    },
    {
      code: 6033,
      name: 'invalidController',
      msg: "The Depository's controller doesn't match the provided Controller.",
    },
    {
      code: 6034,
      name: 'invalidDepository',
      msg: 'The Depository provided is not matching the one stored in the Controller.',
    },
    {
      code: 6035,
      name: 'invalidCollateralMint',
      msg: "The provided collateral mint does not match the depository's collateral mint.",
    },
    {
      code: 6036,
      name: 'invalidRedeemableMint',
      msg: "The Redeemable Mint provided does not match the Controller's one.",
    },
    {
      code: 6037,
      name: 'invalidOwner',
      msg: 'The provided token account is not owner by the expected party.',
    },
    {
      code: 6038,
      name: 'invalidDepositoryCollateral',
      msg: "The provided depository collateral does not match the depository's one.",
    },
    {
      code: 6039,
      name: 'invalidDepositoryShares',
      msg: "The provided depository shares does not match the depository's one.",
    },
    {
      code: 6040,
      name: 'invalidProfitsBeneficiaryCollateral',
      msg: "The Profits beneficiary collateral provided does not match the depository's one.",
    },
    {
      code: 6041,
      name: 'invalidMercurialVault',
      msg: "The provided mercurial vault does not match the Depository's one.",
    },
    {
      code: 6042,
      name: 'invalidMercurialVaultCollateralTokenSafe',
      msg: 'The provided mercurial vault collateral token safe does not match the mercurial vault one.',
    },
    {
      code: 6043,
      name: 'redeemableIdentityDepositoryAmountUnderManagementCap',
      msg: 'Minting amount would go past the identity depository Redeemable Amount Under Management Cap.',
    },
    {
      code: 6044,
      name: 'programAlreadyFrozenOrResumed',
      msg: 'Program is already frozen/resumed.',
    },
    {
      code: 6045,
      name: 'programFrozen',
      msg: 'The program is currently in Frozen state.',
    },
    {
      code: 6046,
      name: 'invalidCredixProgramState',
      msg: "The Credix ProgramState isn't the Depository one.",
    },
    {
      code: 6047,
      name: 'invalidCredixGlobalMarketState',
      msg: "The Credix GlobalMarketState isn't the Depository one.",
    },
    {
      code: 6048,
      name: 'invalidCredixSigningAuthority',
      msg: "The Credix SigningAuthority isn't the Depository one.",
    },
    {
      code: 6049,
      name: 'invalidCredixLiquidityCollateral',
      msg: "The Credix LiquidityCollateral isn't the Depository one.",
    },
    {
      code: 6050,
      name: 'invalidCredixSharesMint',
      msg: "The Credix SharesMint isn't the Depository one.",
    },
    {
      code: 6051,
      name: 'invalidCredixPass',
      msg: "The Credix Pass isn't the one owned by the correct depository.",
    },
    {
      code: 6052,
      name: 'invalidCredixPassNoFees',
      msg: "The Credix Pass doesn't have the fees exemption.",
    },
    {
      code: 6053,
      name: 'invalidCredixTreasury',
      msg: "The Credix Treasury isn't the ProgramState one.",
    },
    {
      code: 6054,
      name: 'invalidCredixTreasuryPoolCollateral',
      msg: "The Credix TreasuryPool isn't the GlobalMarketState one.",
    },
    {
      code: 6055,
      name: 'invalidCredixWithdrawEpochRequestPhase',
      msg: "The Credix WithdrawEpoch isn't in its request phase.",
    },
    {
      code: 6056,
      name: 'invalidCredixWithdrawEpochRedeemPhase',
      msg: "The Credix WithdrawEpoch isn't in its redeem phase.",
    },
    {
      code: 6057,
      name: 'default',
      msg: 'Default - Check the source code for more info.',
    },
    {
      code: 6058,
      name: 'maximumOutflowAmountError',
      msg: 'Redeem resulted into too much outflow in this epoch, please wait or try again with a smaller amount.',
    },
    {
      code: 6059,
      name: 'invalidOutflowLimitPerEpochBps',
      msg: 'The outflow_limit_per_epoch_bps is invalid: over 100%.',
    },
    {
      code: 6060,
      name: 'err',
      msg: 'err',
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
      msg: 'The value of the debt exceeds the radio collateral ratio multiplied by the value of the collateral',
    },
    {
      code: 6070,
      name: 'invalidForLiquidation',
      msg: 'Invalid for liquidation, max LTV is not violated.',
    },
    {
      code: 6071,
      name: 'repayAmountExceedDebt',
      msg: 'The repay amount exceeds the debt.',
    },
    {
      code: 6072,
      name: 'invalidAccountDiscriminator',
      msg: 'Invalid account discriminator',
    },
    {
      code: 6073,
      name: 'unableToDeserializeAccount',
      msg: 'Unable to deserialize account',
    },
  ],
  types: [
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
      name: 'loan',
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
      name: 'type0Depository',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateral',
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
        ],
      },
    },
  ],
};
