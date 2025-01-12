import CodeBlock from "@/components/CodeBlock";

export default function GettingStarted() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Getting Started</h1>
      
      <h2>Prerequisites</h2>
      <ul>
        <li>Python 3.8 or higher</li>
        <li>pip package manager</li>
        <li>A Solana wallet (optional for testing)</li>
      </ul>

      <h2>Installation</h2>
      <p>Install PATH using pip:</p>
      <CodeBlock 
        code="pip install path-sdk" 
        language="bash"
      />

      <h2>Basic Setup</h2>
      <p>
        To get started with PATH, you&apos;ll need to set up a wallet client and initialize your tools:
      </p>
      <CodeBlock
        code={`from path import SolanaWalletClient, get_tools
from path.plugins import JupiterPlugin, SPLTokenPlugin

# Initialize wallet client
wallet = SolanaWalletClient()

# Get available tools
tools = get_tools(wallet, plugins=[
    JupiterPlugin(),  # For token swaps
    SPLTokenPlugin()  # For token transfers
])`}
        language="python"
      />

      <h2>Configuration</h2>
      <p>Configure your environment with your Solana wallet:</p>
      <CodeBlock
        code={`# Set up your wallet (multiple options available)
wallet = SolanaWalletClient.from_keypair("path/to/keypair.json")

# Or use environment variables
wallet = SolanaWalletClient.from_env()  # Uses SOLANA_PRIVATE_KEY

# Configure RPC endpoint (defaults to mainnet)
wallet.set_rpc_endpoint("https://api.mainnet-beta.solana.com")`}
        language="python"
      />

      <h2>Quick Example</h2>
      <p>Here&apos;s a simple example of checking an account&apos;s SOL balance:</p>
      <CodeBlock
        code={`from path import create_tool
from pydantic import BaseModel, Field

class GetBalanceParams(BaseModel):
    address: str = Field(description="Wallet address to check")

@create_tool({
    "name": "get_sol_balance",
    "description": "Get SOL balance for a wallet address",
    "parameters": GetBalanceParams
})
async def get_balance(params: dict) -> str:
    balance = await wallet.get_sol_balance(params["address"])
    return f"{balance} SOL"`}
        language="python"
      />

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <a href="/solana">Solana Integration</a> features</li>
        <li>Explore available <a href="/plugins">Plugins</a></li>
        <li>Check out <a href="/ai">AI Integration</a> capabilities</li>
        <li>Read the <a href="/advanced">Advanced</a> guide</li>
      </ul>

      <div className="tip">
        <h4>💡 Pro Tip</h4>
        <p>
          Use the <code>path.plugins</code> module to extend functionality with official plugins like Jupiter for token swaps or Meteora for concentrated liquidity operations.
        </p>
      </div>
    </article>
  );
}
