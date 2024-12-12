import { PublicKey } from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";
import { parseUnits } from "viem";
import { z } from "zod";
import type { Plugin } from "../plugins";
import type { SolanaWalletClient } from "../wallets";

export function sendSOL(): Plugin<SolanaWalletClient> {
    return {
        name: "send_sol",
        supportsSmartWallets: () => true,
        supportsChain: (chain) => chain.type === "solana",
        getTools: async (walletClient: SolanaWalletClient) => {
            return [
                {
                    name: "send_sol",
                    description: "This {{tool}} sends SOL to an address.",
                    parameters: sendSOLParametersSchema,
                    method: (parameters: z.infer<typeof sendSOLParametersSchema>) =>
                        sendSOLMethod(walletClient, parameters),
                },
            ];
        },
    };
}

const sendSOLParametersSchema = z.object({
    to: z.string().describe("The address to send SOL to"),
    amount: z.string().describe("The amount of SOL to send"),
});

async function sendSOLMethod(
    walletClient: SolanaWalletClient,
    parameters: z.infer<typeof sendSOLParametersSchema>,
): Promise<string> {
    try {
        const { to, amount } = parameters;

        const senderAddress = walletClient.getAddress();
        const lamports = parseUnits(amount, 9);

        const transferInstruction = SystemProgram.transfer({
            fromPubkey: new PublicKey(senderAddress),
            toPubkey: new PublicKey(to),
            lamports,
        });

        const txResult = await walletClient.sendTransaction({
            instructions: [transferInstruction],
        });

        return txResult.hash;
    } catch (error) {
        throw new Error(`Failed to send SOL: ${error}`);
    }
}
