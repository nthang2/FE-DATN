export type IdlLending = {
  address: 'FHHjnmtVgT5QJqU8Jt4kw2aVse6W982Esih2xZUfLtBq';
  metadata: {
    name: 'lending';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'edit_controller';
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
              name: 'EditControllerFields';
            };
          };
        }
      ];
    },
    {
      name: 'edit_type0_depository';
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
              name: 'EditType0DepositoryFields';
            };
          };
        }
      ];
    },
    {
      name: 'initialize_controller';
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
          name: 'redeemable_mint';
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
          name: 'token_program';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'system_program';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'redeemable_mint_decimals';
          type: 'u8';
        },
        {
          name: 'debt_supply_cap';
          type: 'u64';
        }
      ];
    },
    {
      name: 'initialize_type0_depository';
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
          name: 'system_program';
          docs: ['#9'];
          address: '11111111111111111111111111111111';
        },
        {
          name: 'token_program';
          docs: ['#10'];
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        }
      ];
      args: [
        {
          name: 'debt_ceiling';
          type: 'u64';
        },
        {
          name: 'collateralization_ratio';
          type: 'u64';
        },
        {
          name: 'liquidation_ratio';
          type: 'u64';
        },
        {
          name: 'liquidation_penalty';
          type: 'u64';
        },
        {
          name: 'dust';
          type: 'u64';
        }
      ];
    },
    {
      name: 'interact_with_type0_depository';
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
          name: 'user_collateral';
          writable: true;
        },
        {
          name: 'redeemable_mint';
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
          name: 'user_redeemable';
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
          name: 'depository_vault';
          docs: ['#2'];
          writable: true;
        },
        {
          name: 'loan_account';
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
          name: 'token_program';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token_2022_program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'system_program';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'collateral_amount';
          type: 'u64';
        },
        {
          name: 'debt_amount';
          type: 'u64';
        },
        {
          name: 'collateral_flag';
          type: 'bool';
        },
        {
          name: 'loan_flag';
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
          name: 'depository_vault';
          docs: ['#2'];
          writable: true;
        },
        {
          name: 'loan';
          writable: true;
        },
        {
          name: 'stablecoin_mint';
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
          name: 'liquidator_stablecoin_account';
          writable: true;
        },
        {
          name: 'liquidator_collateral_account';
          writable: true;
        },
        {
          name: 'oracle';
        },
        {
          name: 'token_program';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token_2022_program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        },
        {
          name: 'system_program';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'repay_amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'update_rate';
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
          name: 'redeemable_mint';
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
          name: 'liquidator_redeemable';
          writable: true;
        },
        {
          name: 'token_program';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'token_2022_program';
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'Controller';
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110];
    },
    {
      name: 'Loan';
      discriminator: [20, 195, 70, 117, 165, 227, 182, 1];
    },
    {
      name: 'Type0Depository';
      discriminator: [202, 54, 70, 164, 112, 15, 110, 15];
    }
  ];
  events: [
    {
      name: 'InitializeControllerEvent';
      discriminator: [236, 159, 123, 225, 71, 177, 241, 0];
    },
    {
      name: 'LiquidationEvent';
      discriminator: [3, 13, 21, 93, 173, 136, 72, 144];
    },
    {
      name: 'MintStablecoinEvent';
      discriminator: [42, 81, 75, 72, 194, 250, 182, 1];
    },
    {
      name: 'SetType0DepositoryCollateralizationRatioEvent';
      discriminator: [4, 74, 218, 241, 218, 173, 162, 203];
    },
    {
      name: 'SetType0DepositoryDebtCeilingEvent';
      discriminator: [162, 223, 218, 229, 13, 36, 112, 235];
    },
    {
      name: 'SetType0DepositoryDustEvent';
      discriminator: [208, 216, 15, 253, 231, 140, 166, 137];
    },
    {
      name: 'SetType0DepositoryLiquidationPenaltyEvent';
      discriminator: [141, 77, 152, 220, 108, 21, 131, 81];
    },
    {
      name: 'SetType0DepositoryLiquidationRatioEvent';
      discriminator: [254, 226, 122, 32, 109, 103, 167, 214];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'InvalidRedeemableMintDecimals';
      msg: 'The redeemable mint decimals must be between 0 and 9 (inclusive).';
    },
    {
      code: 6001;
      name: 'InvalidRedeemableGlobalSupplyCap';
      msg: 'Redeemable global supply above.';
    },
    {
      code: 6002;
      name: 'InvalidDepositoriesWeightBps';
      msg: 'Depositories weights do not add up to 100%.';
    },
    {
      code: 6003;
      name: 'InvalidDepositoriesVector';
      msg: 'Depositories vector passed as parameter is not of the expected length';
    },
    {
      code: 6004;
      name: 'InvalidCollateralAmount';
      msg: 'Collateral amount cannot be 0';
    },
    {
      code: 6005;
      name: 'InvalidRedeemableAmount';
      msg: 'Redeemable amount must be > 0 in order to redeem.';
    },
    {
      code: 6006;
      name: 'InsufficientCollateralAmount';
      msg: 'The balance of the collateral ATA is not enough to fulfill the mint operation.';
    },
    {
      code: 6007;
      name: 'InsufficientRedeemableAmount';
      msg: 'The balance of the redeemable ATA is not enough to fulfill the redeem operation.';
    },
    {
      code: 6008;
      name: 'DepositoriesTargerRedeemableAmountReached';
      msg: 'Minting amount would go past the depositories target redeemable amount.';
    },
    {
      code: 6009;
      name: 'RedeemableGlobalSupplyCapReached';
      msg: 'Minting amount would go past the Redeemable Global Supply Cap.';
    },
    {
      code: 6010;
      name: 'RedeemableMercurialVaultAmountUnderManagementCap';
      msg: 'Minting amount would go past the mercurial vault depository Redeemable Amount Under Management Cap.';
    },
    {
      code: 6011;
      name: 'RedeemableCredixLpAmountUnderManagementCap';
      msg: 'Minting amount would go past the credix lp depository Redeemable Amount Under Management Cap.';
    },
    {
      code: 6012;
      name: 'MathOverflow';
      msg: 'Math overflow.';
    },
    {
      code: 6013;
      name: 'SlippageReached';
      msg: "The order couldn't be executed with the provided slippage.";
    },
    {
      code: 6014;
      name: 'BumpError';
      msg: 'A bump was expected but is missing.';
    },
    {
      code: 6015;
      name: 'MintingDisabled';
      msg: 'Minting is disabled for the current depository.';
    },
    {
      code: 6016;
      name: 'CollateralDepositHasRemainingDust';
      msg: 'Collateral deposit left some value unaccounted for.';
    },
    {
      code: 6017;
      name: 'CollateralDepositAmountsDoesntMatch';
      msg: "Collateral deposit didn't result in the correct amounts being moved.";
    },
    {
      code: 6018;
      name: 'CollateralDepositDoesntMatchTokenValue';
      msg: "Received token of which the value doesn't match the deposited collateral.";
    },
    {
      code: 6019;
      name: 'InvalidMercurialVaultLpMint';
      msg: "The mercurial vault lp mint does not match the Depository's one.";
    },
    {
      code: 6020;
      name: 'MaxNumberOfMercurialVaultDepositoriesRegisteredReached';
      msg: 'Cannot register more mercurial vault depositories, the limit has been reached.';
    },
    {
      code: 6021;
      name: 'MaxNumberOfCredixLpDepositoriesRegisteredReached';
      msg: 'Cannot register more credix lp depositories, the limit has been reached.';
    },
    {
      code: 6022;
      name: 'MercurialVaultDoNotMatchCollateral';
      msg: 'The provided collateral do not match the provided mercurial vault token.';
    },
    {
      code: 6023;
      name: 'CredixLpDoNotMatchCollateral';
      msg: 'The provided collateral do not match the provided credix lp token.';
    },
    {
      code: 6024;
      name: 'CollateralMintEqualToRedeemableMint';
      msg: 'Collateral mint should be different than redeemable mint.';
    },
    {
      code: 6025;
      name: 'CollateralMintNotAllowed';
      msg: 'Provided collateral mint is not allowed.';
    },
    {
      code: 6026;
      name: 'MinimumMintedRedeemableAmountError';
      msg: 'Mint resulted to 0 redeemable token being minted.';
    },
    {
      code: 6027;
      name: 'MaximumMintedRedeemableAmountError';
      msg: 'Mint resulted into too much redeemable token being minted.';
    },
    {
      code: 6028;
      name: 'MinimumRedeemedCollateralAmountError';
      msg: 'Redeem resulted to 0 collateral token being redeemed.';
    },
    {
      code: 6029;
      name: 'MaximumRedeemedCollateralAmountError';
      msg: 'Redeem resulted into too much collateral token being redeemed.';
    },
    {
      code: 6030;
      name: 'InvalidDepositoryLpTokenVault';
      msg: "The depository lp token vault does not match the Depository's one.";
    },
    {
      code: 6031;
      name: 'InvalidTime';
      msg: 'Cannot update the past states.';
    },
    {
      code: 6032;
      name: 'InvalidAuthority';
      msg: 'Only the Program initializer authority can access this instructions.';
    },
    {
      code: 6033;
      name: 'InvalidController';
      msg: "The Depository's controller doesn't match the provided Controller.";
    },
    {
      code: 6034;
      name: 'InvalidDepository';
      msg: 'The Depository provided is not matching the one stored in the Controller.';
    },
    {
      code: 6035;
      name: 'InvalidCollateralMint';
      msg: "The provided collateral mint does not match the depository's collateral mint.";
    },
    {
      code: 6036;
      name: 'InvalidRedeemableMint';
      msg: "The Redeemable Mint provided does not match the Controller's one.";
    },
    {
      code: 6037;
      name: 'InvalidOwner';
      msg: 'The provided token account is not owner by the expected party.';
    },
    {
      code: 6038;
      name: 'InvalidDepositoryCollateral';
      msg: "The provided depository collateral does not match the depository's one.";
    },
    {
      code: 6039;
      name: 'InvalidDepositoryShares';
      msg: "The provided depository shares does not match the depository's one.";
    },
    {
      code: 6040;
      name: 'InvalidProfitsBeneficiaryCollateral';
      msg: "The Profits beneficiary collateral provided does not match the depository's one.";
    },
    {
      code: 6041;
      name: 'InvalidMercurialVault';
      msg: "The provided mercurial vault does not match the Depository's one.";
    },
    {
      code: 6042;
      name: 'InvalidMercurialVaultCollateralTokenSafe';
      msg: 'The provided mercurial vault collateral token safe does not match the mercurial vault one.';
    },
    {
      code: 6043;
      name: 'RedeemableIdentityDepositoryAmountUnderManagementCap';
      msg: 'Minting amount would go past the identity depository Redeemable Amount Under Management Cap.';
    },
    {
      code: 6044;
      name: 'ProgramAlreadyFrozenOrResumed';
      msg: 'Program is already frozen/resumed.';
    },
    {
      code: 6045;
      name: 'ProgramFrozen';
      msg: 'The program is currently in Frozen state.';
    },
    {
      code: 6046;
      name: 'InvalidCredixProgramState';
      msg: "The Credix ProgramState isn't the Depository one.";
    },
    {
      code: 6047;
      name: 'InvalidCredixGlobalMarketState';
      msg: "The Credix GlobalMarketState isn't the Depository one.";
    },
    {
      code: 6048;
      name: 'InvalidCredixSigningAuthority';
      msg: "The Credix SigningAuthority isn't the Depository one.";
    },
    {
      code: 6049;
      name: 'InvalidCredixLiquidityCollateral';
      msg: "The Credix LiquidityCollateral isn't the Depository one.";
    },
    {
      code: 6050;
      name: 'InvalidCredixSharesMint';
      msg: "The Credix SharesMint isn't the Depository one.";
    },
    {
      code: 6051;
      name: 'InvalidCredixPass';
      msg: "The Credix Pass isn't the one owned by the correct depository.";
    },
    {
      code: 6052;
      name: 'InvalidCredixPassNoFees';
      msg: "The Credix Pass doesn't have the fees exemption.";
    },
    {
      code: 6053;
      name: 'InvalidCredixTreasury';
      msg: "The Credix Treasury isn't the ProgramState one.";
    },
    {
      code: 6054;
      name: 'InvalidCredixTreasuryPoolCollateral';
      msg: "The Credix TreasuryPool isn't the GlobalMarketState one.";
    },
    {
      code: 6055;
      name: 'InvalidCredixWithdrawEpochRequestPhase';
      msg: "The Credix WithdrawEpoch isn't in its request phase.";
    },
    {
      code: 6056;
      name: 'InvalidCredixWithdrawEpochRedeemPhase';
      msg: "The Credix WithdrawEpoch isn't in its redeem phase.";
    },
    {
      code: 6057;
      name: 'Default';
      msg: 'Default - Check the source code for more info.';
    },
    {
      code: 6058;
      name: 'MaximumOutflowAmountError';
      msg: 'Redeem resulted into too much outflow in this epoch, please wait or try again with a smaller amount.';
    },
    {
      code: 6059;
      name: 'InvalidOutflowLimitPerEpochBps';
      msg: 'The outflow_limit_per_epoch_bps is invalid: over 100%.';
    },
    {
      code: 6060;
      name: 'ERR';
      msg: 'ERR';
    },
    {
      code: 6061;
      name: 'ExceededCollateralMintCapError';
      msg: 'No more coins can be minted because the limit of this collateral has been reached.';
    },
    {
      code: 6062;
      name: 'LoanNoDebt';
      msg: 'Loan has no debt to liquidate.';
    },
    {
      code: 6063;
      name: 'InvalidRepayAmount';
      msg: 'Invalid repay amount.';
    },
    {
      code: 6064;
      name: 'InsufficientCollateral';
      msg: 'Insufficient collateral in the Loan.';
    },
    {
      code: 6065;
      name: 'GlobalLiquidationLimitExceeded';
      msg: 'Global liquidation limit exceeded.';
    },
    {
      code: 6066;
      name: 'InvalidAccount';
      msg: 'Invalid account provided.';
    },
    {
      code: 6067;
      name: 'NotEligibleForLiquidation';
      msg: 'Loan is not eligible for liquidation based on LTV threshold.';
    },
    {
      code: 6068;
      name: 'InsufficientRepayment';
      msg: 'Insufficient collateral value to liquidate debt.';
    },
    {
      code: 6069;
      name: 'ExceededCollateralRatioError';
      msg: 'The value of the debt exceeds the radio collateral ratio multiplied by the value of the collateral';
    },
    {
      code: 6070;
      name: 'InvalidForLiquidation';
      msg: 'Invalid for liquidation, max LTV is not violated.';
    },
    {
      code: 6071;
      name: 'RepayAmountExceedDebt';
      msg: 'The repay amount exceeds the debt.';
    },
    {
      code: 6072;
      name: 'InvalidAccountDiscriminator';
      msg: 'Invalid account discriminator';
    },
    {
      code: 6073;
      name: 'UnableToDeserializeAccount';
      msg: 'Unable to deserialize account';
    }
  ];
  types: [
    {
      name: 'Controller';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'redeemable_mint_bump';
            type: 'u8';
          },
          {
            name: 'authority';
            type: 'pubkey';
          },
          {
            name: 'redeemable_mint';
            type: 'pubkey';
          },
          {
            name: 'debt_supply';
            type: 'u64';
          },
          {
            name: 'debt_supplycap';
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
      name: 'EditControllerFields';
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
            name: 'debt_supplycap';
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
      name: 'EditType0DepositoryFields';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'debt_ceiling';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'collateralization_ratio';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'liquidation_ratio';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'liquidation_penalty';
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
      name: 'InitializeControllerEvent';
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
      name: 'LiquidationEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'liquidator';
            type: 'pubkey';
          },
          {
            name: 'repay_amount';
            type: 'u64';
          },
          {
            name: 'collateral_claimed';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'Loan';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateral_amount';
            type: 'u64';
          },
          {
            name: 'minted_amount';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'MintStablecoinEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'user';
            type: 'pubkey';
          },
          {
            name: 'collateral_amount';
            type: 'u64';
          },
          {
            name: 'debt_amount';
            type: 'u64';
          },
          {
            name: 'timestamp';
            type: 'i64';
          }
        ];
      };
    },
    {
      name: 'SetType0DepositoryCollateralizationRatioEvent';
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
            name: 'collateralization_ratio';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'SetType0DepositoryDebtCeilingEvent';
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
            name: 'debt_ceiling';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'SetType0DepositoryDustEvent';
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
      name: 'SetType0DepositoryLiquidationPenaltyEvent';
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
            name: 'liquidation_penalty';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'SetType0DepositoryLiquidationRatioEvent';
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
            name: 'liquidation_ratio';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'Type0Depository';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collateral';
            type: 'pubkey';
          },
          {
            name: 'debt_ceiling';
            type: 'u64';
          },
          {
            name: 'collateralization_ratio';
            type: 'u64';
          },
          {
            name: 'liquidation_ratio';
            type: 'u64';
          },
          {
            name: 'liquidation_penalty';
            type: 'u64';
          },
          {
            name: 'debt_total';
            type: 'u64';
          },
          {
            name: 'collateral_total';
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
  address: 'FHHjnmtVgT5QJqU8Jt4kw2aVse6W982Esih2xZUfLtBq',
  metadata: {
    name: 'lending',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'edit_controller',
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
              name: 'EditControllerFields',
            },
          },
        },
      ],
    },
    {
      name: 'edit_type0_depository',
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
              name: 'EditType0DepositoryFields',
            },
          },
        },
      ],
    },
    {
      name: 'initialize_controller',
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
          name: 'redeemable_mint',
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
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'redeemable_mint_decimals',
          type: 'u8',
        },
        {
          name: 'debt_supply_cap',
          type: 'u64',
        },
      ],
    },
    {
      name: 'initialize_type0_depository',
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
          name: 'system_program',
          docs: ['#9'],
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          docs: ['#10'],
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
      ],
      args: [
        {
          name: 'debt_ceiling',
          type: 'u64',
        },
        {
          name: 'collateralization_ratio',
          type: 'u64',
        },
        {
          name: 'liquidation_ratio',
          type: 'u64',
        },
        {
          name: 'liquidation_penalty',
          type: 'u64',
        },
        {
          name: 'dust',
          type: 'u64',
        },
      ],
    },
    {
      name: 'interact_with_type0_depository',
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
          name: 'user_collateral',
          writable: true,
        },
        {
          name: 'redeemable_mint',
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
          name: 'user_redeemable',
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
          name: 'depository_vault',
          docs: ['#2'],
          writable: true,
        },
        {
          name: 'loan_account',
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
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token_2022_program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'collateral_amount',
          type: 'u64',
        },
        {
          name: 'debt_amount',
          type: 'u64',
        },
        {
          name: 'collateral_flag',
          type: 'bool',
        },
        {
          name: 'loan_flag',
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
          name: 'depository_vault',
          docs: ['#2'],
          writable: true,
        },
        {
          name: 'loan',
          writable: true,
        },
        {
          name: 'stablecoin_mint',
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
          name: 'liquidator_stablecoin_account',
          writable: true,
        },
        {
          name: 'liquidator_collateral_account',
          writable: true,
        },
        {
          name: 'oracle',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token_2022_program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'repay_amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'update_rate',
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
          name: 'redeemable_mint',
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
          name: 'liquidator_redeemable',
          writable: true,
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token_2022_program',
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'Controller',
      discriminator: [184, 79, 171, 0, 183, 43, 113, 110],
    },
    {
      name: 'Loan',
      discriminator: [20, 195, 70, 117, 165, 227, 182, 1],
    },
    {
      name: 'Type0Depository',
      discriminator: [202, 54, 70, 164, 112, 15, 110, 15],
    },
  ],
  events: [
    {
      name: 'InitializeControllerEvent',
      discriminator: [236, 159, 123, 225, 71, 177, 241, 0],
    },
    {
      name: 'LiquidationEvent',
      discriminator: [3, 13, 21, 93, 173, 136, 72, 144],
    },
    {
      name: 'MintStablecoinEvent',
      discriminator: [42, 81, 75, 72, 194, 250, 182, 1],
    },
    {
      name: 'SetType0DepositoryCollateralizationRatioEvent',
      discriminator: [4, 74, 218, 241, 218, 173, 162, 203],
    },
    {
      name: 'SetType0DepositoryDebtCeilingEvent',
      discriminator: [162, 223, 218, 229, 13, 36, 112, 235],
    },
    {
      name: 'SetType0DepositoryDustEvent',
      discriminator: [208, 216, 15, 253, 231, 140, 166, 137],
    },
    {
      name: 'SetType0DepositoryLiquidationPenaltyEvent',
      discriminator: [141, 77, 152, 220, 108, 21, 131, 81],
    },
    {
      name: 'SetType0DepositoryLiquidationRatioEvent',
      discriminator: [254, 226, 122, 32, 109, 103, 167, 214],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidRedeemableMintDecimals',
      msg: 'The redeemable mint decimals must be between 0 and 9 (inclusive).',
    },
    {
      code: 6001,
      name: 'InvalidRedeemableGlobalSupplyCap',
      msg: 'Redeemable global supply above.',
    },
    {
      code: 6002,
      name: 'InvalidDepositoriesWeightBps',
      msg: 'Depositories weights do not add up to 100%.',
    },
    {
      code: 6003,
      name: 'InvalidDepositoriesVector',
      msg: 'Depositories vector passed as parameter is not of the expected length',
    },
    {
      code: 6004,
      name: 'InvalidCollateralAmount',
      msg: 'Collateral amount cannot be 0',
    },
    {
      code: 6005,
      name: 'InvalidRedeemableAmount',
      msg: 'Redeemable amount must be > 0 in order to redeem.',
    },
    {
      code: 6006,
      name: 'InsufficientCollateralAmount',
      msg: 'The balance of the collateral ATA is not enough to fulfill the mint operation.',
    },
    {
      code: 6007,
      name: 'InsufficientRedeemableAmount',
      msg: 'The balance of the redeemable ATA is not enough to fulfill the redeem operation.',
    },
    {
      code: 6008,
      name: 'DepositoriesTargerRedeemableAmountReached',
      msg: 'Minting amount would go past the depositories target redeemable amount.',
    },
    {
      code: 6009,
      name: 'RedeemableGlobalSupplyCapReached',
      msg: 'Minting amount would go past the Redeemable Global Supply Cap.',
    },
    {
      code: 6010,
      name: 'RedeemableMercurialVaultAmountUnderManagementCap',
      msg: 'Minting amount would go past the mercurial vault depository Redeemable Amount Under Management Cap.',
    },
    {
      code: 6011,
      name: 'RedeemableCredixLpAmountUnderManagementCap',
      msg: 'Minting amount would go past the credix lp depository Redeemable Amount Under Management Cap.',
    },
    {
      code: 6012,
      name: 'MathOverflow',
      msg: 'Math overflow.',
    },
    {
      code: 6013,
      name: 'SlippageReached',
      msg: "The order couldn't be executed with the provided slippage.",
    },
    {
      code: 6014,
      name: 'BumpError',
      msg: 'A bump was expected but is missing.',
    },
    {
      code: 6015,
      name: 'MintingDisabled',
      msg: 'Minting is disabled for the current depository.',
    },
    {
      code: 6016,
      name: 'CollateralDepositHasRemainingDust',
      msg: 'Collateral deposit left some value unaccounted for.',
    },
    {
      code: 6017,
      name: 'CollateralDepositAmountsDoesntMatch',
      msg: "Collateral deposit didn't result in the correct amounts being moved.",
    },
    {
      code: 6018,
      name: 'CollateralDepositDoesntMatchTokenValue',
      msg: "Received token of which the value doesn't match the deposited collateral.",
    },
    {
      code: 6019,
      name: 'InvalidMercurialVaultLpMint',
      msg: "The mercurial vault lp mint does not match the Depository's one.",
    },
    {
      code: 6020,
      name: 'MaxNumberOfMercurialVaultDepositoriesRegisteredReached',
      msg: 'Cannot register more mercurial vault depositories, the limit has been reached.',
    },
    {
      code: 6021,
      name: 'MaxNumberOfCredixLpDepositoriesRegisteredReached',
      msg: 'Cannot register more credix lp depositories, the limit has been reached.',
    },
    {
      code: 6022,
      name: 'MercurialVaultDoNotMatchCollateral',
      msg: 'The provided collateral do not match the provided mercurial vault token.',
    },
    {
      code: 6023,
      name: 'CredixLpDoNotMatchCollateral',
      msg: 'The provided collateral do not match the provided credix lp token.',
    },
    {
      code: 6024,
      name: 'CollateralMintEqualToRedeemableMint',
      msg: 'Collateral mint should be different than redeemable mint.',
    },
    {
      code: 6025,
      name: 'CollateralMintNotAllowed',
      msg: 'Provided collateral mint is not allowed.',
    },
    {
      code: 6026,
      name: 'MinimumMintedRedeemableAmountError',
      msg: 'Mint resulted to 0 redeemable token being minted.',
    },
    {
      code: 6027,
      name: 'MaximumMintedRedeemableAmountError',
      msg: 'Mint resulted into too much redeemable token being minted.',
    },
    {
      code: 6028,
      name: 'MinimumRedeemedCollateralAmountError',
      msg: 'Redeem resulted to 0 collateral token being redeemed.',
    },
    {
      code: 6029,
      name: 'MaximumRedeemedCollateralAmountError',
      msg: 'Redeem resulted into too much collateral token being redeemed.',
    },
    {
      code: 6030,
      name: 'InvalidDepositoryLpTokenVault',
      msg: "The depository lp token vault does not match the Depository's one.",
    },
    {
      code: 6031,
      name: 'InvalidTime',
      msg: 'Cannot update the past states.',
    },
    {
      code: 6032,
      name: 'InvalidAuthority',
      msg: 'Only the Program initializer authority can access this instructions.',
    },
    {
      code: 6033,
      name: 'InvalidController',
      msg: "The Depository's controller doesn't match the provided Controller.",
    },
    {
      code: 6034,
      name: 'InvalidDepository',
      msg: 'The Depository provided is not matching the one stored in the Controller.',
    },
    {
      code: 6035,
      name: 'InvalidCollateralMint',
      msg: "The provided collateral mint does not match the depository's collateral mint.",
    },
    {
      code: 6036,
      name: 'InvalidRedeemableMint',
      msg: "The Redeemable Mint provided does not match the Controller's one.",
    },
    {
      code: 6037,
      name: 'InvalidOwner',
      msg: 'The provided token account is not owner by the expected party.',
    },
    {
      code: 6038,
      name: 'InvalidDepositoryCollateral',
      msg: "The provided depository collateral does not match the depository's one.",
    },
    {
      code: 6039,
      name: 'InvalidDepositoryShares',
      msg: "The provided depository shares does not match the depository's one.",
    },
    {
      code: 6040,
      name: 'InvalidProfitsBeneficiaryCollateral',
      msg: "The Profits beneficiary collateral provided does not match the depository's one.",
    },
    {
      code: 6041,
      name: 'InvalidMercurialVault',
      msg: "The provided mercurial vault does not match the Depository's one.",
    },
    {
      code: 6042,
      name: 'InvalidMercurialVaultCollateralTokenSafe',
      msg: 'The provided mercurial vault collateral token safe does not match the mercurial vault one.',
    },
    {
      code: 6043,
      name: 'RedeemableIdentityDepositoryAmountUnderManagementCap',
      msg: 'Minting amount would go past the identity depository Redeemable Amount Under Management Cap.',
    },
    {
      code: 6044,
      name: 'ProgramAlreadyFrozenOrResumed',
      msg: 'Program is already frozen/resumed.',
    },
    {
      code: 6045,
      name: 'ProgramFrozen',
      msg: 'The program is currently in Frozen state.',
    },
    {
      code: 6046,
      name: 'InvalidCredixProgramState',
      msg: "The Credix ProgramState isn't the Depository one.",
    },
    {
      code: 6047,
      name: 'InvalidCredixGlobalMarketState',
      msg: "The Credix GlobalMarketState isn't the Depository one.",
    },
    {
      code: 6048,
      name: 'InvalidCredixSigningAuthority',
      msg: "The Credix SigningAuthority isn't the Depository one.",
    },
    {
      code: 6049,
      name: 'InvalidCredixLiquidityCollateral',
      msg: "The Credix LiquidityCollateral isn't the Depository one.",
    },
    {
      code: 6050,
      name: 'InvalidCredixSharesMint',
      msg: "The Credix SharesMint isn't the Depository one.",
    },
    {
      code: 6051,
      name: 'InvalidCredixPass',
      msg: "The Credix Pass isn't the one owned by the correct depository.",
    },
    {
      code: 6052,
      name: 'InvalidCredixPassNoFees',
      msg: "The Credix Pass doesn't have the fees exemption.",
    },
    {
      code: 6053,
      name: 'InvalidCredixTreasury',
      msg: "The Credix Treasury isn't the ProgramState one.",
    },
    {
      code: 6054,
      name: 'InvalidCredixTreasuryPoolCollateral',
      msg: "The Credix TreasuryPool isn't the GlobalMarketState one.",
    },
    {
      code: 6055,
      name: 'InvalidCredixWithdrawEpochRequestPhase',
      msg: "The Credix WithdrawEpoch isn't in its request phase.",
    },
    {
      code: 6056,
      name: 'InvalidCredixWithdrawEpochRedeemPhase',
      msg: "The Credix WithdrawEpoch isn't in its redeem phase.",
    },
    {
      code: 6057,
      name: 'Default',
      msg: 'Default - Check the source code for more info.',
    },
    {
      code: 6058,
      name: 'MaximumOutflowAmountError',
      msg: 'Redeem resulted into too much outflow in this epoch, please wait or try again with a smaller amount.',
    },
    {
      code: 6059,
      name: 'InvalidOutflowLimitPerEpochBps',
      msg: 'The outflow_limit_per_epoch_bps is invalid: over 100%.',
    },
    {
      code: 6060,
      name: 'ERR',
      msg: 'ERR',
    },
    {
      code: 6061,
      name: 'ExceededCollateralMintCapError',
      msg: 'No more coins can be minted because the limit of this collateral has been reached.',
    },
    {
      code: 6062,
      name: 'LoanNoDebt',
      msg: 'Loan has no debt to liquidate.',
    },
    {
      code: 6063,
      name: 'InvalidRepayAmount',
      msg: 'Invalid repay amount.',
    },
    {
      code: 6064,
      name: 'InsufficientCollateral',
      msg: 'Insufficient collateral in the Loan.',
    },
    {
      code: 6065,
      name: 'GlobalLiquidationLimitExceeded',
      msg: 'Global liquidation limit exceeded.',
    },
    {
      code: 6066,
      name: 'InvalidAccount',
      msg: 'Invalid account provided.',
    },
    {
      code: 6067,
      name: 'NotEligibleForLiquidation',
      msg: 'Loan is not eligible for liquidation based on LTV threshold.',
    },
    {
      code: 6068,
      name: 'InsufficientRepayment',
      msg: 'Insufficient collateral value to liquidate debt.',
    },
    {
      code: 6069,
      name: 'ExceededCollateralRatioError',
      msg: 'The value of the debt exceeds the radio collateral ratio multiplied by the value of the collateral',
    },
    {
      code: 6070,
      name: 'InvalidForLiquidation',
      msg: 'Invalid for liquidation, max LTV is not violated.',
    },
    {
      code: 6071,
      name: 'RepayAmountExceedDebt',
      msg: 'The repay amount exceeds the debt.',
    },
    {
      code: 6072,
      name: 'InvalidAccountDiscriminator',
      msg: 'Invalid account discriminator',
    },
    {
      code: 6073,
      name: 'UnableToDeserializeAccount',
      msg: 'Unable to deserialize account',
    },
  ],
  types: [
    {
      name: 'Controller',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'redeemable_mint_bump',
            type: 'u8',
          },
          {
            name: 'authority',
            type: 'pubkey',
          },
          {
            name: 'redeemable_mint',
            type: 'pubkey',
          },
          {
            name: 'debt_supply',
            type: 'u64',
          },
          {
            name: 'debt_supplycap',
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
      name: 'EditControllerFields',
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
            name: 'debt_supplycap',
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
      name: 'EditType0DepositoryFields',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'debt_ceiling',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'collateralization_ratio',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'liquidation_ratio',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'liquidation_penalty',
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
      name: 'InitializeControllerEvent',
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
      name: 'LiquidationEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'liquidator',
            type: 'pubkey',
          },
          {
            name: 'repay_amount',
            type: 'u64',
          },
          {
            name: 'collateral_claimed',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Loan',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateral_amount',
            type: 'u64',
          },
          {
            name: 'minted_amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'MintStablecoinEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'collateral_amount',
            type: 'u64',
          },
          {
            name: 'debt_amount',
            type: 'u64',
          },
          {
            name: 'timestamp',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'SetType0DepositoryCollateralizationRatioEvent',
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
            name: 'collateralization_ratio',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SetType0DepositoryDebtCeilingEvent',
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
            name: 'debt_ceiling',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SetType0DepositoryDustEvent',
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
      name: 'SetType0DepositoryLiquidationPenaltyEvent',
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
            name: 'liquidation_penalty',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SetType0DepositoryLiquidationRatioEvent',
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
            name: 'liquidation_ratio',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Type0Depository',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateral',
            type: 'pubkey',
          },
          {
            name: 'debt_ceiling',
            type: 'u64',
          },
          {
            name: 'collateralization_ratio',
            type: 'u64',
          },
          {
            name: 'liquidation_ratio',
            type: 'u64',
          },
          {
            name: 'liquidation_penalty',
            type: 'u64',
          },
          {
            name: 'debt_total',
            type: 'u64',
          },
          {
            name: 'collateral_total',
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
