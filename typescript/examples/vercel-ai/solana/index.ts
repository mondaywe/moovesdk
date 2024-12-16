import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { solana } from "@goat-sdk/wallet-solana";

import { sendSOL } from "@goat-sdk/core";
import { Connection, Keypair } from "@solana/web3.js";

import { jupiter } from "@goat-sdk/plugin-jupiter";
import { splToken } from "@goat-sdk/plugin-spl-token";
import base58 from "bs58";

require("dotenv").config();

const connection = new Connection(process.env.SOLANA_RPC_URL as string);
const keypair = Keypair.fromSecretKey(base58.decode(process.env.SOLANA_PRIVATE_KEY as string));

(async () => {
    const tools = await getOnChainTools({
        wallet: solana({
            keypair,
            connection,
        }),
        plugins: [sendSOL(), jupiter({ connection }), splToken({ connection, network: "mainnet" })],
    });

    const result = await generateText({
        model: openai("gpt-4o-mini"),
        tools: tools,
        maxSteps: 5,
        prompt: "Swap 0.05 USDC to GOAT, return the transaction hash, make sure you check i have enough USDC to cover the swap",
    });

    console.log(result.text);
})();
