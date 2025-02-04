export type IdlSmartVault = {
    version: '0.1.0';
    name: 'smart_vault';
    constants: [
        {
            name: 'VAULT_INFO_SEED';
            type: 'bytes';
            value: '[86, 65, 85, 76, 84, 95, 73, 78, 70, 79]';
        }
    ];
    instructions: [
        {
            name: 'initialize';
            accounts: [
                {
                    name: 'vaultConfig';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'wsolMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultWsolAta';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'vaultBotServer';
                    type: 'publicKey';
                },
                {
                    name: 'feeWallet';
                    type: 'publicKey';
                },
                {
                    name: 'allowedPoolIds';
                    type: {
                        vec: 'publicKey';
                    };
                },
                {
                    name: 'managementFeePercent';
                    type: 'u64';
                },
                {
                    name: 'performanceFeePercent';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'configure';
            accounts: [
                {
                    name: 'vaultConfig';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'vaultBotServer';
                    type: {
                        option: 'publicKey';
                    };
                },
                {
                    name: 'feeWallet';
                    type: {
                        option: 'publicKey';
                    };
                },
                {
                    name: 'allowedPoolIds';
                    type: {
                        option: {
                            vec: 'publicKey';
                        };
                    };
                },
                {
                    name: 'managementFeePercent';
                    type: {
                        option: 'u64';
                    };
                },
                {
                    name: 'performanceFeePercent';
                    type: {
                        option: 'u64';
                    };
                }
            ];
        },
        {
            name: 'botSwap';
            accounts: [
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'clmmProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'ammConfig';
                    isMut: false;
                    isSigner: false;
                    docs: ['The factory state to read protocol fees'];
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                    docs: ['The program account of the pool in which the swap will be performed'];
                },
                {
                    name: 'inputTokenAccount';
                    isMut: true;
                    isSigner: false;
                    docs: ['The user token account for input token'];
                },
                {
                    name: 'outputTokenAccount';
                    isMut: true;
                    isSigner: false;
                    docs: ['The user token account for output token'];
                },
                {
                    name: 'inputVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['The vault token account for input token'];
                },
                {
                    name: 'outputVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['The vault token account for output token'];
                },
                {
                    name: 'observationState';
                    isMut: true;
                    isSigner: false;
                    docs: ['The program account for the most recent oracle observation'];
                },
                {
                    name: 'memoProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'inputVaultMint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 0'];
                },
                {
                    name: 'outputVaultMint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 1'];
                },
                {
                    name: 'botServer';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram2022';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'amountIn';
                    type: {
                        option: 'u64';
                    };
                },
                {
                    name: 'otherAmountThreshold';
                    type: 'u64';
                },
                {
                    name: 'sqrtPriceLimitX64';
                    type: 'u128';
                }
            ];
        },
        {
            name: 'botOpenPosition';
            accounts: [
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'clmmProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'positionNftMint';
                    isMut: true;
                    isSigner: true;
                    docs: ['Pays to mint the position'];
                },
                {
                    name: 'positionNftAccount';
                    isMut: true;
                    isSigner: false;
                    docs: ['This account created in the contract by cpi to avoid large stack variables'];
                },
                {
                    name: 'metadataAccount';
                    isMut: true;
                    isSigner: false;
                    docs: ['To store metaplex metadata'];
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                    docs: ['Add liquidity for this pool'];
                },
                {
                    name: 'protocolPosition';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'tickArrayLower';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'tickArrayUpper';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'personalPosition';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'tokenAccount0';
                    isMut: true;
                    isSigner: false;
                    docs: ['The token_0 account deposit token to the pool'];
                },
                {
                    name: 'tokenAccount1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The token_1 account deposit token to the pool'];
                },
                {
                    name: 'tokenVault0';
                    isMut: true;
                    isSigner: false;
                    docs: ['The address that holds pool tokens for token_0'];
                },
                {
                    name: 'tokenVault1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The address that holds pool tokens for token_1'];
                },
                {
                    name: 'metadataProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vault0Mint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vault1Mint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'rent';
                    isMut: false;
                    isSigner: false;
                    docs: ['Sysvar for token mint and ATA creation'];
                },
                {
                    name: 'botServer';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram2022';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'tickLowerIndex';
                    type: 'i32';
                },
                {
                    name: 'tickUpperIndex';
                    type: 'i32';
                },
                {
                    name: 'tickArrayLowerStartIndex';
                    type: 'i32';
                },
                {
                    name: 'tickArrayUpperStartIndex';
                    type: 'i32';
                },
                {
                    name: 'withMetadata';
                    type: 'bool';
                }
            ];
        },
        {
            name: 'botIncreaseLiquidity';
            accounts: [
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'clmmProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'nftAccount';
                    isMut: false;
                    isSigner: false;
                    docs: ['The token account for nft'];
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolPosition';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'personalPosition';
                    isMut: true;
                    isSigner: false;
                    docs: ['Increase liquidity for this position'];
                },
                {
                    name: 'tickArrayLower';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the lower tick'];
                },
                {
                    name: 'tickArrayUpper';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the upper tick'];
                },
                {
                    name: 'tokenAccount0';
                    isMut: true;
                    isSigner: false;
                    docs: ["The payer's token account for token_0"];
                },
                {
                    name: 'tokenAccount1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The token account spending token_1 to mint the position'];
                },
                {
                    name: 'tokenVault0';
                    isMut: true;
                    isSigner: false;
                    docs: ['The address that holds pool tokens for token_0'];
                },
                {
                    name: 'tokenVault1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The address that holds pool tokens for token_1'];
                },
                {
                    name: 'vault0Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 0'];
                },
                {
                    name: 'vault1Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 1'];
                },
                {
                    name: 'botServer';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram2022';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: 'botDecreaseLiquidity';
            accounts: [
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'clmmProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'nftAccount';
                    isMut: false;
                    isSigner: false;
                    docs: ['The token account for the tokenized position'];
                },
                {
                    name: 'personalPosition';
                    isMut: true;
                    isSigner: false;
                    docs: ['Decrease liquidity for this position'];
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolPosition';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'tokenVault0';
                    isMut: true;
                    isSigner: false;
                    docs: ['Token_0 vault'];
                },
                {
                    name: 'tokenVault1';
                    isMut: true;
                    isSigner: false;
                    docs: ['Token_1 vault'];
                },
                {
                    name: 'tickArrayLower';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the lower tick'];
                },
                {
                    name: 'tickArrayUpper';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the upper tick'];
                },
                {
                    name: 'recipientTokenAccount0';
                    isMut: true;
                    isSigner: false;
                    docs: ['The destination token account for receive amount_0'];
                },
                {
                    name: 'recipientTokenAccount1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The destination token account for receive amount_1'];
                },
                {
                    name: 'memoProgram';
                    isMut: false;
                    isSigner: false;
                    docs: ['memo program'];
                },
                {
                    name: 'vault0Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 0'];
                },
                {
                    name: 'vault1Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 1'];
                },
                {
                    name: 'botServer';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram2022';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'amount0Min';
                    type: 'u64';
                },
                {
                    name: 'amount1Min';
                    type: 'u64';
                },
                {
                    name: 'isClaim';
                    type: 'bool';
                }
            ];
        },
        {
            name: 'deposit';
            accounts: [
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'feeWalletAccount';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'wsolMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultWsolAta';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'depositAmount';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'withdraw';
            accounts: [
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'feeWalletAccount';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'wsolMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultWsolAta';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userWsolAta';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: 'userSwap';
            accounts: [
                {
                    name: 'vaultInfo';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'userInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'clmmProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'ammConfig';
                    isMut: false;
                    isSigner: false;
                    docs: ['The factory state to read protocol fees'];
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                    docs: ['The program account of the pool in which the swap will be performed'];
                },
                {
                    name: 'inputTokenAccount';
                    isMut: true;
                    isSigner: false;
                    docs: ['The user token account for input token'];
                },
                {
                    name: 'outputTokenAccount';
                    isMut: true;
                    isSigner: false;
                    docs: ['The user token account for output token'];
                },
                {
                    name: 'inputVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['The vault token account for input token'];
                },
                {
                    name: 'outputVault';
                    isMut: true;
                    isSigner: false;
                    docs: ['The vault token account for output token'];
                },
                {
                    name: 'observationState';
                    isMut: true;
                    isSigner: false;
                    docs: ['The program account for the most recent oracle observation'];
                },
                {
                    name: 'memoProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'inputVaultMint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 0'];
                },
                {
                    name: 'outputVaultMint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 1'];
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram2022';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'amountIn';
                    type: {
                        option: 'u64';
                    };
                },
                {
                    name: 'otherAmountThreshold';
                    type: 'u64';
                },
                {
                    name: 'sqrtPriceLimitX64';
                    type: 'u128';
                }
            ];
        },
        {
            name: 'userIncreaseLiquidity';
            accounts: [
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'clmmProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'nftAccount';
                    isMut: false;
                    isSigner: false;
                    docs: ['The token account for nft'];
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolPosition';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'personalPosition';
                    isMut: true;
                    isSigner: false;
                    docs: ['Increase liquidity for this position'];
                },
                {
                    name: 'tickArrayLower';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the lower tick'];
                },
                {
                    name: 'tickArrayUpper';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the upper tick'];
                },
                {
                    name: 'tokenAccount0';
                    isMut: true;
                    isSigner: false;
                    docs: ["The payer's token account for token_0"];
                },
                {
                    name: 'tokenAccount1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The token account spending token_1 to mint the position'];
                },
                {
                    name: 'tokenVault0';
                    isMut: true;
                    isSigner: false;
                    docs: ['The address that holds pool tokens for token_0'];
                },
                {
                    name: 'tokenVault1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The address that holds pool tokens for token_1'];
                },
                {
                    name: 'vault0Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 0'];
                },
                {
                    name: 'vault1Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 1'];
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram2022';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: 'userDecreaseLiquidity';
            accounts: [
                {
                    name: 'vaultInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'userReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'clmmProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'nftAccount';
                    isMut: false;
                    isSigner: false;
                    docs: ['The token account for the tokenized position'];
                },
                {
                    name: 'personalPosition';
                    isMut: true;
                    isSigner: false;
                    docs: ['Decrease liquidity for this position'];
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolPosition';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'tokenVault0';
                    isMut: true;
                    isSigner: false;
                    docs: ['Token_0 vault'];
                },
                {
                    name: 'tokenVault1';
                    isMut: true;
                    isSigner: false;
                    docs: ['Token_1 vault'];
                },
                {
                    name: 'tickArrayLower';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the lower tick'];
                },
                {
                    name: 'tickArrayUpper';
                    isMut: true;
                    isSigner: false;
                    docs: ['Stores init state for the upper tick'];
                },
                {
                    name: 'recipientTokenAccount0';
                    isMut: true;
                    isSigner: false;
                    docs: ['The destination token account for receive amount_0'];
                },
                {
                    name: 'recipientTokenAccount1';
                    isMut: true;
                    isSigner: false;
                    docs: ['The destination token account for receive amount_1'];
                },
                {
                    name: 'memoProgram';
                    isMut: false;
                    isSigner: false;
                    docs: ['memo program'];
                },
                {
                    name: 'vault0Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 0'];
                },
                {
                    name: 'vault1Mint';
                    isMut: false;
                    isSigner: false;
                    docs: ['The mint of token vault 1'];
                },
                {
                    name: 'user';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram2022';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'liquidity';
                    type: 'u128';
                },
                {
                    name: 'amount0Min';
                    type: 'u64';
                },
                {
                    name: 'amount1Min';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'initTokenAccount';
            accounts: [
                {
                    name: 'vaultConfig';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'vaultInfo';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'poolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'vaultReserveTokenInfo';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'tokenMint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenAccount';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'signer';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        }
    ];
    accounts: [
        {
            name: 'reserveTokenInfo';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'reserveTokenAmount';
                        type: 'u64';
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
                        name: 'shareLiquidity';
                        type: 'u128';
                    },
                    {
                        name: 'depositedAmount';
                        type: 'u64';
                    },
                    {
                        name: 'reserveWsolAmount';
                        type: 'u64';
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
                        name: 'authority';
                        type: 'publicKey';
                    },
                    {
                        name: 'vaultBotServer';
                        type: 'publicKey';
                    },
                    {
                        name: 'feeWallet';
                        type: 'publicKey';
                    },
                    {
                        name: 'allowedPoolIds';
                        type: {
                            vec: 'publicKey';
                        };
                    },
                    {
                        name: 'managementFeePercent';
                        type: 'u64';
                    },
                    {
                        name: 'performanceFeePercent';
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
                        name: 'poolId';
                        type: 'publicKey';
                    },
                    {
                        name: 'positionNftMint';
                        type: 'publicKey';
                    },
                    {
                        name: 'totalLiquidity';
                        type: 'u128';
                    },
                    {
                        name: 'liquidityRate';
                        type: 'f64';
                    },
                    {
                        name: 'isLocked';
                        type: 'bool';
                    },
                    {
                        name: 'reserveWsolAmount';
                        type: 'u64';
                    },
                    {
                        name: 'totalSolFee';
                        type: 'u64';
                    }
                ];
            };
        }
    ];
    errors: [
        {
            code: 6000;
            name: 'Unauthorized';
            msg: 'You are not authorized to perform this action.';
        },
        {
            code: 6001;
            name: 'InvalidWithdrawLiquidityAmount';
            msg: 'Not enough liquidity amount to withdraw';
        },
        {
            code: 6002;
            name: 'NotEnoughReserveTokenAmount';
            msg: 'Not enough reserve amount to swap';
        },
        {
            code: 6003;
            name: 'PoolLocked';
            msg: 'The pool is currently locked';
        },
        {
            code: 6004;
            name: 'PositionStillActive';
            msg: 'The position is currently active';
        },
        {
            code: 6005;
            name: 'InvalidTickRange';
            msg: 'The current price is out of chosen tick range';
        },
        {
            code: 6006;
            name: 'RebalanceFail';
            msg: 'Too much remaining reserve token in the process of rebalancing';
        }
    ];
};

export const idlSmartVault: IdlSmartVault = {
    version: '0.1.0',
    name: 'smart_vault',
    constants: [
        {
            name: 'VAULT_INFO_SEED',
            type: 'bytes',
            value: '[86, 65, 85, 76, 84, 95, 73, 78, 70, 79]',
        },
    ],
    instructions: [
        {
            name: 'initialize',
            accounts: [
                {
                    name: 'vaultConfig',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'wsolMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultWsolAta',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'vaultBotServer',
                    type: 'publicKey',
                },
                {
                    name: 'feeWallet',
                    type: 'publicKey',
                },
                {
                    name: 'allowedPoolIds',
                    type: {
                        vec: 'publicKey',
                    },
                },
                {
                    name: 'managementFeePercent',
                    type: 'u64',
                },
                {
                    name: 'performanceFeePercent',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'configure',
            accounts: [
                {
                    name: 'vaultConfig',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'vaultBotServer',
                    type: {
                        option: 'publicKey',
                    },
                },
                {
                    name: 'feeWallet',
                    type: {
                        option: 'publicKey',
                    },
                },
                {
                    name: 'allowedPoolIds',
                    type: {
                        option: {
                            vec: 'publicKey',
                        },
                    },
                },
                {
                    name: 'managementFeePercent',
                    type: {
                        option: 'u64',
                    },
                },
                {
                    name: 'performanceFeePercent',
                    type: {
                        option: 'u64',
                    },
                },
            ],
        },
        {
            name: 'botSwap',
            accounts: [
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'clmmProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'ammConfig',
                    isMut: false,
                    isSigner: false,
                    docs: ['The factory state to read protocol fees'],
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                    docs: ['The program account of the pool in which the swap will be performed'],
                },
                {
                    name: 'inputTokenAccount',
                    isMut: true,
                    isSigner: false,
                    docs: ['The user token account for input token'],
                },
                {
                    name: 'outputTokenAccount',
                    isMut: true,
                    isSigner: false,
                    docs: ['The user token account for output token'],
                },
                {
                    name: 'inputVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['The vault token account for input token'],
                },
                {
                    name: 'outputVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['The vault token account for output token'],
                },
                {
                    name: 'observationState',
                    isMut: true,
                    isSigner: false,
                    docs: ['The program account for the most recent oracle observation'],
                },
                {
                    name: 'memoProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'inputVaultMint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 0'],
                },
                {
                    name: 'outputVaultMint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 1'],
                },
                {
                    name: 'botServer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram2022',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'amountIn',
                    type: {
                        option: 'u64',
                    },
                },
                {
                    name: 'otherAmountThreshold',
                    type: 'u64',
                },
                {
                    name: 'sqrtPriceLimitX64',
                    type: 'u128',
                },
            ],
        },
        {
            name: 'botOpenPosition',
            accounts: [
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'clmmProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'positionNftMint',
                    isMut: true,
                    isSigner: true,
                    docs: ['Pays to mint the position'],
                },
                {
                    name: 'positionNftAccount',
                    isMut: true,
                    isSigner: false,
                    docs: ['This account created in the contract by cpi to avoid large stack variables'],
                },
                {
                    name: 'metadataAccount',
                    isMut: true,
                    isSigner: false,
                    docs: ['To store metaplex metadata'],
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                    docs: ['Add liquidity for this pool'],
                },
                {
                    name: 'protocolPosition',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tickArrayLower',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tickArrayUpper',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'personalPosition',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenAccount0',
                    isMut: true,
                    isSigner: false,
                    docs: ['The token_0 account deposit token to the pool'],
                },
                {
                    name: 'tokenAccount1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The token_1 account deposit token to the pool'],
                },
                {
                    name: 'tokenVault0',
                    isMut: true,
                    isSigner: false,
                    docs: ['The address that holds pool tokens for token_0'],
                },
                {
                    name: 'tokenVault1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The address that holds pool tokens for token_1'],
                },
                {
                    name: 'metadataProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vault0Mint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vault1Mint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                    docs: ['Sysvar for token mint and ATA creation'],
                },
                {
                    name: 'botServer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram2022',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'tickLowerIndex',
                    type: 'i32',
                },
                {
                    name: 'tickUpperIndex',
                    type: 'i32',
                },
                {
                    name: 'tickArrayLowerStartIndex',
                    type: 'i32',
                },
                {
                    name: 'tickArrayUpperStartIndex',
                    type: 'i32',
                },
                {
                    name: 'withMetadata',
                    type: 'bool',
                },
            ],
        },
        {
            name: 'botIncreaseLiquidity',
            accounts: [
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'clmmProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'nftAccount',
                    isMut: false,
                    isSigner: false,
                    docs: ['The token account for nft'],
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolPosition',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'personalPosition',
                    isMut: true,
                    isSigner: false,
                    docs: ['Increase liquidity for this position'],
                },
                {
                    name: 'tickArrayLower',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the lower tick'],
                },
                {
                    name: 'tickArrayUpper',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the upper tick'],
                },
                {
                    name: 'tokenAccount0',
                    isMut: true,
                    isSigner: false,
                    docs: ["The payer's token account for token_0"],
                },
                {
                    name: 'tokenAccount1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The token account spending token_1 to mint the position'],
                },
                {
                    name: 'tokenVault0',
                    isMut: true,
                    isSigner: false,
                    docs: ['The address that holds pool tokens for token_0'],
                },
                {
                    name: 'tokenVault1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The address that holds pool tokens for token_1'],
                },
                {
                    name: 'vault0Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 0'],
                },
                {
                    name: 'vault1Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 1'],
                },
                {
                    name: 'botServer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram2022',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'botDecreaseLiquidity',
            accounts: [
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'clmmProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'nftAccount',
                    isMut: false,
                    isSigner: false,
                    docs: ['The token account for the tokenized position'],
                },
                {
                    name: 'personalPosition',
                    isMut: true,
                    isSigner: false,
                    docs: ['Decrease liquidity for this position'],
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolPosition',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenVault0',
                    isMut: true,
                    isSigner: false,
                    docs: ['Token_0 vault'],
                },
                {
                    name: 'tokenVault1',
                    isMut: true,
                    isSigner: false,
                    docs: ['Token_1 vault'],
                },
                {
                    name: 'tickArrayLower',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the lower tick'],
                },
                {
                    name: 'tickArrayUpper',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the upper tick'],
                },
                {
                    name: 'recipientTokenAccount0',
                    isMut: true,
                    isSigner: false,
                    docs: ['The destination token account for receive amount_0'],
                },
                {
                    name: 'recipientTokenAccount1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The destination token account for receive amount_1'],
                },
                {
                    name: 'memoProgram',
                    isMut: false,
                    isSigner: false,
                    docs: ['memo program'],
                },
                {
                    name: 'vault0Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 0'],
                },
                {
                    name: 'vault1Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 1'],
                },
                {
                    name: 'botServer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram2022',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'amount0Min',
                    type: 'u64',
                },
                {
                    name: 'amount1Min',
                    type: 'u64',
                },
                {
                    name: 'isClaim',
                    type: 'bool',
                },
            ],
        },
        {
            name: 'deposit',
            accounts: [
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'feeWalletAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'wsolMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultWsolAta',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'depositAmount',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'withdraw',
            accounts: [
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'feeWalletAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'wsolMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultWsolAta',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userWsolAta',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'userSwap',
            accounts: [
                {
                    name: 'vaultInfo',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'userInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'clmmProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'ammConfig',
                    isMut: false,
                    isSigner: false,
                    docs: ['The factory state to read protocol fees'],
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                    docs: ['The program account of the pool in which the swap will be performed'],
                },
                {
                    name: 'inputTokenAccount',
                    isMut: true,
                    isSigner: false,
                    docs: ['The user token account for input token'],
                },
                {
                    name: 'outputTokenAccount',
                    isMut: true,
                    isSigner: false,
                    docs: ['The user token account for output token'],
                },
                {
                    name: 'inputVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['The vault token account for input token'],
                },
                {
                    name: 'outputVault',
                    isMut: true,
                    isSigner: false,
                    docs: ['The vault token account for output token'],
                },
                {
                    name: 'observationState',
                    isMut: true,
                    isSigner: false,
                    docs: ['The program account for the most recent oracle observation'],
                },
                {
                    name: 'memoProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'inputVaultMint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 0'],
                },
                {
                    name: 'outputVaultMint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 1'],
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram2022',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'amountIn',
                    type: {
                        option: 'u64',
                    },
                },
                {
                    name: 'otherAmountThreshold',
                    type: 'u64',
                },
                {
                    name: 'sqrtPriceLimitX64',
                    type: 'u128',
                },
            ],
        },
        {
            name: 'userIncreaseLiquidity',
            accounts: [
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'clmmProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'nftAccount',
                    isMut: false,
                    isSigner: false,
                    docs: ['The token account for nft'],
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolPosition',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'personalPosition',
                    isMut: true,
                    isSigner: false,
                    docs: ['Increase liquidity for this position'],
                },
                {
                    name: 'tickArrayLower',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the lower tick'],
                },
                {
                    name: 'tickArrayUpper',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the upper tick'],
                },
                {
                    name: 'tokenAccount0',
                    isMut: true,
                    isSigner: false,
                    docs: ["The payer's token account for token_0"],
                },
                {
                    name: 'tokenAccount1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The token account spending token_1 to mint the position'],
                },
                {
                    name: 'tokenVault0',
                    isMut: true,
                    isSigner: false,
                    docs: ['The address that holds pool tokens for token_0'],
                },
                {
                    name: 'tokenVault1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The address that holds pool tokens for token_1'],
                },
                {
                    name: 'vault0Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 0'],
                },
                {
                    name: 'vault1Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 1'],
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram2022',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'userDecreaseLiquidity',
            accounts: [
                {
                    name: 'vaultInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'userReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'clmmProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'nftAccount',
                    isMut: false,
                    isSigner: false,
                    docs: ['The token account for the tokenized position'],
                },
                {
                    name: 'personalPosition',
                    isMut: true,
                    isSigner: false,
                    docs: ['Decrease liquidity for this position'],
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolPosition',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenVault0',
                    isMut: true,
                    isSigner: false,
                    docs: ['Token_0 vault'],
                },
                {
                    name: 'tokenVault1',
                    isMut: true,
                    isSigner: false,
                    docs: ['Token_1 vault'],
                },
                {
                    name: 'tickArrayLower',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the lower tick'],
                },
                {
                    name: 'tickArrayUpper',
                    isMut: true,
                    isSigner: false,
                    docs: ['Stores init state for the upper tick'],
                },
                {
                    name: 'recipientTokenAccount0',
                    isMut: true,
                    isSigner: false,
                    docs: ['The destination token account for receive amount_0'],
                },
                {
                    name: 'recipientTokenAccount1',
                    isMut: true,
                    isSigner: false,
                    docs: ['The destination token account for receive amount_1'],
                },
                {
                    name: 'memoProgram',
                    isMut: false,
                    isSigner: false,
                    docs: ['memo program'],
                },
                {
                    name: 'vault0Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 0'],
                },
                {
                    name: 'vault1Mint',
                    isMut: false,
                    isSigner: false,
                    docs: ['The mint of token vault 1'],
                },
                {
                    name: 'user',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram2022',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'liquidity',
                    type: 'u128',
                },
                {
                    name: 'amount0Min',
                    type: 'u64',
                },
                {
                    name: 'amount1Min',
                    type: 'u64',
                },
            ],
        },
        {
            name: 'initTokenAccount',
            accounts: [
                {
                    name: 'vaultConfig',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'vaultInfo',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'poolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'vaultReserveTokenInfo',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'tokenMint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'signer',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: 'reserveTokenInfo',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'reserveTokenAmount',
                        type: 'u64',
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
                        name: 'shareLiquidity',
                        type: 'u128',
                    },
                    {
                        name: 'depositedAmount',
                        type: 'u64',
                    },
                    {
                        name: 'reserveWsolAmount',
                        type: 'u64',
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
                        name: 'authority',
                        type: 'publicKey',
                    },
                    {
                        name: 'vaultBotServer',
                        type: 'publicKey',
                    },
                    {
                        name: 'feeWallet',
                        type: 'publicKey',
                    },
                    {
                        name: 'allowedPoolIds',
                        type: {
                            vec: 'publicKey',
                        },
                    },
                    {
                        name: 'managementFeePercent',
                        type: 'u64',
                    },
                    {
                        name: 'performanceFeePercent',
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
                        name: 'poolId',
                        type: 'publicKey',
                    },
                    {
                        name: 'positionNftMint',
                        type: 'publicKey',
                    },
                    {
                        name: 'totalLiquidity',
                        type: 'u128',
                    },
                    {
                        name: 'liquidityRate',
                        type: 'f64',
                    },
                    {
                        name: 'isLocked',
                        type: 'bool',
                    },
                    {
                        name: 'reserveWsolAmount',
                        type: 'u64',
                    },
                    {
                        name: 'totalSolFee',
                        type: 'u64',
                    },
                ],
            },
        },
    ],
    errors: [
        {
            code: 6000,
            name: 'Unauthorized',
            msg: 'You are not authorized to perform this action.',
        },
        {
            code: 6001,
            name: 'InvalidWithdrawLiquidityAmount',
            msg: 'Not enough liquidity amount to withdraw',
        },
        {
            code: 6002,
            name: 'NotEnoughReserveTokenAmount',
            msg: 'Not enough reserve amount to swap',
        },
        {
            code: 6003,
            name: 'PoolLocked',
            msg: 'The pool is currently locked',
        },
        {
            code: 6004,
            name: 'PositionStillActive',
            msg: 'The position is currently active',
        },
        {
            code: 6005,
            name: 'InvalidTickRange',
            msg: 'The current price is out of chosen tick range',
        },
        {
            code: 6006,
            name: 'RebalanceFail',
            msg: 'Too much remaining reserve token in the process of rebalancing',
        },
    ],
};
