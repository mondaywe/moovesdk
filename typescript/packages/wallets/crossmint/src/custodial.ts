import type { SolanaReadRequest, SolanaTransaction, SolanaWalletClient } from "@goat-sdk/core";
import { type Connection, PublicKey, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import bs58 from "bs58";
import { createCrossmintAPI } from "./api";

type CommonParameters = {
    chain: "solana";
    connection: Connection;
    env?: "staging" | "production";
};

type EmailLocatorParameters = CommonParameters & {
    email: string;
};

type PhoneLocatorParameters = CommonParameters & {
    phone: string;
};

type UserIdLocatorParameters = CommonParameters & {
    userId: number;
};

type AddressLocatorParameters = CommonParameters & {
    address: string;
};

type CustodialOptions =
    | EmailLocatorParameters
    | PhoneLocatorParameters
    | UserIdLocatorParameters
    | AddressLocatorParameters;

function getLocator(params: CustodialOptions): string | number {
    if ("address" in params) return params.address;
    if ("email" in params) return `email:${params.email}`;
    if ("phone" in params) return `phone:${params.phone}`;
    return `userId:${params.userId}`;
}

export function custodialFactory(apiKey: string) {
    return async function custodial(params: CustodialOptions): Promise<SolanaWalletClient> {
        const { connection, env = "staging" } = params;

        const locator = `${getLocator(params)}:solana-custodial-wallet`;
        const client = createCrossmintAPI(apiKey, env);
        const { address } = await client.getWallet(locator);

        return {
            getAddress() {
                return address;
            },
            getChain() {
                return {
                    type: "solana",
                };
            },
            async signMessage(message: string) {
                try {
                    const { id } = await client.signMessageForCustodialWallet(locator, message);

                    while (true) {
                        const latestSignature = await client.checkSignatureStatus(id, address);

                        if (latestSignature.status === "success") {
                            if (!latestSignature.outputSignature) {
                                throw new Error("Signature is undefined");
                            }

                            return {
                                signature: latestSignature.outputSignature,
                            };
                        }

                        if (latestSignature.status === "failed") {
                            throw new Error("Signature failed");
                        }

                        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
                    }
                } catch (error) {
                    throw new Error(`Failed to sign message: ${error}`);
                }
            },
            async sendTransaction({ instructions }: SolanaTransaction) {
                const latestBlockhash = await connection.getLatestBlockhash("confirmed");
                const message = new TransactionMessage({
                    // Placeholder payer key since Crossmint will override it
                    payerKey: new PublicKey("placeholder"),
                    recentBlockhash: latestBlockhash.blockhash,
                    instructions,
                }).compileToV0Message();
                const transaction = new VersionedTransaction(message);
                const serializedVersionedTransaction = transaction.serialize();
                const encodedVersionedTransaction = bs58.encode(serializedVersionedTransaction);

                const { id: transactionId } = await client.createTransactionForCustodialWallet(
                    locator,
                    encodedVersionedTransaction,
                );

                while (true) {
                    const latestTransaction = await client.checkTransactionStatus(locator, transactionId);

                    if (latestTransaction.status === "success") {
                        console.log(`Transaction ${latestTransaction.status}`);
                        return {
                            hash: latestTransaction.onChain?.txId ?? "",
                        };
                    }

                    if (latestTransaction.status === "failed") {
                        throw new Error(`Transaction failed: ${latestTransaction.onChain?.txId}`);
                    }

                    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
                }
            },
            async read(request: SolanaReadRequest) {
                const { accountAddress } = request;

                const pubkey = new PublicKey(accountAddress);
                const accountInfo = await connection.getAccountInfo(pubkey);

                if (!accountInfo) {
                    throw new Error(`Account ${accountAddress} not found`);
                }

                return {
                    value: accountInfo,
                };
            },
            async balanceOf(address: string) {
                const pubkey = new PublicKey(address);
                const balance = await connection.getBalance(pubkey);

                return {
                    value: BigInt(balance),
                    decimals: 9,
                    symbol: "SOL",
                    name: "Solana",
                };
            },
        };
    };
}
