import CodeBlock from "@/components/CodeBlock";

export default function Plugins() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Plugins</h1>
      
      <p className="lead">
        PATH&apos;s plugin system allows you to extend its functionality with official and custom plugins.
      </p>

      <h2 id="jupiter">Jupiter Plugin</h2>
      <p>
        The Jupiter plugin provides best-in-class token swaps on Solana:
      </p>
      <CodeBlock
        code={`from path.plugins import JupiterPlugin

# Initialize plugin
jupiter = JupiterPlugin()

# Get swap quote
quote = await jupiter.get_quote(
    input_mint="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",  # USDC
    output_mint="So11111111111111111111111111111111111111112",   # SOL
    amount=100_000_000  # 100 USDC
)

# Execute swap
tx = await jupiter.swap(quote)

# Get routes
routes = await jupiter.get_routes(
    input_mint="USDC...",
    output_mint="SOL...",
    amount=1_000_000,
    slippage=0.5  # 0.5% slippage
)`}
        language="python"
      />

      <h2 id="meteora">Meteora Plugin</h2>
      <p>
        The Meteora plugin enables concentrated liquidity operations:
      </p>
      <CodeBlock
        code={`from path.plugins import MeteoraPlugin

# Initialize plugin
meteora = MeteoraPlugin()

# Create position
position = await meteora.create_position(
    pool_address="pool-address",
    token_a_amount=1_000_000,
    token_b_amount=1_000_000,
    price_lower=80,
    price_upper=120
)

# Increase liquidity
await meteora.increase_liquidity(
    position_nft="position-nft",
    token_a_amount=500_000,
    token_b_amount=500_000
)

# Collect fees
fees = await meteora.collect_fees("position-nft")

# Close position
await meteora.close_position("position-nft")`}
        language="python"
      />

      <h2 id="custom">Creating Custom Plugins</h2>
      <p>
        You can create your own plugins by extending the <code>PluginBase</code> class:
      </p>
      <CodeBlock
        code={`from path.classes import PluginBase
from path import create_tool
from pydantic import BaseModel, Field

class MyPlugin(PluginBase):
    """Custom plugin for XYZ protocol"""

    def __init__(self):
        super().__init__()
        # Initialize your plugin
        self.contract = "..."

    class StakeParams(BaseModel):
        amount: float = Field(description="Amount to stake")
        duration: int = Field(description="Stake duration in days")

    @create_tool({
        "name": "stake_tokens",
        "description": "Stake tokens in XYZ protocol",
        "parameters": StakeParams
    })
    async def stake(self, params: dict) -> str:
        amount = params["amount"]
        duration = params["duration"]
        
        # Your staking logic here
        tx = await self.contract.stake(amount, duration)
        
        return f"Staked {amount} tokens for {duration} days"

# Use your plugin
my_plugin = MyPlugin()
tools = get_tools(wallet, plugins=[my_plugin])`}
        language="python"
      />

      <h2>Plugin Configuration</h2>
      <p>
        Plugins can be configured using environment variables or direct parameters:
      </p>
      <CodeBlock
        code={`# Using environment variables
jupiter = JupiterPlugin()  # Uses JUPITER_RPC_URL

# Direct configuration
jupiter = JupiterPlugin(
    rpc_url="https://...",
    api_key="your-api-key"
)

# Multiple plugins
tools = get_tools(wallet, plugins=[
    JupiterPlugin(),
    MeteoraPlugin(rpc_url="https://..."),
    MyPlugin(param1="value1")
])`}
        language="python"
      />

      <h2>Plugin Events</h2>
      <p>
        Plugins can emit and handle events for better integration:
      </p>
      <CodeBlock
        code={`from path.classes import PluginBase, Event

class MyPlugin(PluginBase):
    def __init__(self):
        super().__init__()
        self.on("transaction", self.handle_transaction)

    async def handle_transaction(self, event: Event):
        tx = event.data["transaction"]
        print(f"Transaction sent: {tx.signature}")

    async def do_something(self):
        # Your logic here
        tx = await self.send_transaction(...)
        
        # Emit event
        self.emit("transaction", {
            "transaction": tx,
            "type": "stake"
        })`}
        language="python"
      />

      <div className="tip">
        <h4>💡 Pro Tip</h4>
        <p>
          When creating custom plugins, use the <code>@create_tool</code> decorator on your methods to automatically make them available to AI agents. The decorator will handle parameter validation and error handling.
        </p>
      </div>

      <h2>Testing Plugins</h2>
      <p>
        PATH provides utilities for testing plugins:
      </p>
      <CodeBlock
        code={`from path.testing import PluginTester

async def test_my_plugin():
    # Create test environment
    tester = PluginTester()
    plugin = MyPlugin()
    
    # Mock responses
    tester.mock_rpc_response(
        method="stake",
        params={"amount": 100, "duration": 30},
        response={"txid": "..."}
    )
    
    # Test plugin
    result = await plugin.stake({
        "amount": 100,
        "duration": 30
    })
    
    assert "Staked 100 tokens" in result`}
        language="python"
      />
    </article>
  );
}
