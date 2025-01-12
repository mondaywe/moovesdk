import CodeBlock from "@/components/CodeBlock";

export default function SolanaIntegration() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Solana Integration</h1>
      
      <p className="lead">
        PATH provides deep integration with Solana&apos;s ecosystem, making it easy to interact with tokens, NFTs, and DeFi protocols through natural language.
      </p>

      <h2 id="wallet-setup">Wallet Setup</h2>
      <p>PATH supports multiple ways to set up your Solana wallet:</p>
      <CodeBlock
        code={`# From a keypair file
wallet = SolanaWalletClient.from_keypair("path/to/keypair.json")

# From environment variables
wallet = SolanaWalletClient.from_env()

# From a private key
wallet = SolanaWalletClient.from_private_key("your-private-key")

# Create a new wallet
wallet = SolanaWalletClient.create()`}
        language="python"
      />

      <h2 id="spl-tokens">SPL Tokens</h2>
      <p>Work with SPL tokens using the built-in token tools:</p>
      <CodeBlock
        code={`from path.plugins import SPLTokenPlugin

# Initialize token plugin
token_plugin = SPLTokenPlugin()

# Get token balance
balance = await token_plugin.get_token_balance(
    token_address="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",  # USDC
    wallet_address="your-wallet-address"
)

# Transfer tokens
await token_plugin.transfer_tokens(
    token_address="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    recipient="recipient-address",
    amount=100_000_000  # 100 USDC (6 decimals)
)`}
        language="python"
      />

      <h2 id="nfts">NFTs</h2>
      <p>Create and manage NFTs with ease:</p>
      <CodeBlock
        code={`from path.plugins import NFTPlugin

# Initialize NFT plugin
nft_plugin = NFTPlugin()

# Create a new NFT
nft = await nft_plugin.create_nft({
    "name": "My NFT",
    "symbol": "MNFT",
    "description": "A unique NFT created with PATH",
    "image": "https://example.com/image.png",
    "attributes": [
        {"trait_type": "Background", "value": "Blue"},
        {"trait_type": "Eyes", "value": "Green"}
    ]
})

# Get NFT metadata
metadata = await nft_plugin.get_nft_metadata(nft.mint_address)

# Transfer NFT
await nft_plugin.transfer_nft(
    mint_address=nft.mint_address,
    recipient="recipient-address"
)`}
        language="python"
      />

      <h2 id="defi">DeFi Integration</h2>
      <p>
        Interact with popular DeFi protocols using official plugins:
      </p>

      <h3>Jupiter (Token Swaps)</h3>
      <CodeBlock
        code={`from path.plugins import JupiterPlugin

# Initialize Jupiter plugin
jupiter = JupiterPlugin()

# Get best swap route
route = await jupiter.get_quote(
    input_mint="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",  # USDC
    output_mint="So11111111111111111111111111111111111111112",   # SOL
    amount=100_000_000  # 100 USDC
)

# Execute swap
tx = await jupiter.swap(route)`}
        language="python"
      />

      <h3>Meteora (Concentrated Liquidity)</h3>
      <CodeBlock
        code={`from path.plugins import MeteoraPlugin

# Initialize Meteora plugin
meteora = MeteoraPlugin()

# Add liquidity
position = await meteora.add_liquidity(
    pool_address="pool-address",
    token_a_amount=1_000_000,
    token_b_amount=1_000_000,
    price_lower=80,
    price_upper=120
)

# Collect fees
fees = await meteora.collect_fees(position.nft)`}
        language="python"
      />

      <h2>Program Interaction</h2>
      <p>
        Interact with any Solana program using the low-level API:
      </p>
      <CodeBlock
        code={`# Create an instruction
ix = await wallet.create_instruction(
    program_id="program-id",
    accounts=[
        {"pubkey": "account1", "isSigner": True, "isWritable": True},
        {"pubkey": "account2", "isSigner": False, "isWritable": False}
    ],
    data=b"your-instruction-data"
)

# Send transaction
tx = await wallet.send_transaction([ix])`}
        language="python"
      />

      <div className="tip">
        <h4>💡 Pro Tip</h4>
        <p>
          Use the <code>@create_tool</code> decorator to wrap any of these functions into AI-friendly tools that can be used with LangChain or other AI frameworks.
        </p>
      </div>
    </article>
  );
}
