import CodeBlock from "@/components/CodeBlock";

export default function Advanced() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Advanced Topics</h1>
      
      <p className="lead">
        Learn about advanced features and best practices for building with PATH.
      </p>

      <h2 id="tools">Custom Tools</h2>
      <p>
        Create sophisticated tools with advanced parameter handling and validation:
      </p>
      <CodeBlock
        code={`from path import create_tool
from pydantic import BaseModel, Field, validator
from typing import List, Optional

class TokenSwapParams(BaseModel):
    input_token: str = Field(description="Input token address")
    output_token: str = Field(description="Output token address")
    amount: float = Field(description="Amount to swap")
    slippage: Optional[float] = Field(
        default=0.5,
        description="Slippage tolerance in percentage"
    )

    @validator("slippage")
    def validate_slippage(cls, v):
        if v < 0 or v > 100:
            raise ValueError("Slippage must be between 0 and 100")
        return v

@create_tool({
    "name": "swap_tokens",
    "description": "Swap tokens with advanced options",
    "parameters": TokenSwapParams,
    "examples": [
        {
            "input": {
                "input_token": "USDC...",
                "output_token": "SOL...",
                "amount": 100,
                "slippage": 0.5
            },
            "output": "Swapped 100 USDC for 1.5 SOL"
        }
    ]
})
async def swap_tokens(params: dict) -> str:
    # Your implementation here
    pass`}
        language="python"
      />

      <h2 id="errors">Error Handling</h2>
      <p>
        Implement robust error handling for better AI interactions:
      </p>
      <CodeBlock
        code={`from path import create_tool, PathError
from typing import Dict, Any

class InsufficientBalanceError(PathError):
    """Raised when wallet has insufficient balance"""
    def __init__(self, required: float, available: float):
        self.required = required
        self.available = available
        super().__init__(
            f"Insufficient balance. Required: {required}, Available: {available}"
        )

@create_tool({
    "name": "send_tokens",
    "description": "Send tokens to an address",
    "error_handlers": {
        InsufficientBalanceError: lambda e: (
            f"Not enough tokens. You need {e.required} but only have {e.available}"
        ),
        "InvalidAddressError": "The provided address is invalid",
        "default": "An unexpected error occurred"
    }
})
async def send_tokens(params: Dict[str, Any]) -> str:
    balance = await get_balance(params["token"])
    if balance < params["amount"]:
        raise InsufficientBalanceError(params["amount"], balance)
    
    # Rest of implementation
    pass`}
        language="python"
      />

      <h2 id="best-practices">Best Practices</h2>
      
      <h3>1. Tool Design</h3>
      <ul>
        <li>Use clear, descriptive names for tools and parameters</li>
        <li>Provide detailed descriptions and examples</li>
        <li>Implement proper validation and error handling</li>
        <li>Return informative, human-readable responses</li>
      </ul>

      <h3>2. Performance Optimization</h3>
      <CodeBlock
        code={`from path import create_tool
from functools import lru_cache
from typing import List

class TokenTool:
    @lru_cache(maxsize=100)
    async def get_token_info(self, address: str) -> dict:
        """Cached token information lookup"""
        return await fetch_token_info(address)

    @create_tool
    async def get_token_price(self, token: str) -> float:
        """Get token price with caching"""
        info = await self.get_token_info(token)
        return info["price"]

    async def batch_operation(self, tokens: List[str]):
        """Batch operations for better performance"""
        tasks = [self.get_token_info(token) for token in tokens]
        results = await asyncio.gather(*tasks)
        return results`}
        language="python"
      />

      <h3>3. Security Best Practices</h3>
      <CodeBlock
        code={`from path import create_tool, validate_address
from path.security import sanitize_input, rate_limit

@rate_limit(max_calls=10, window_seconds=60)
@create_tool
async def transfer_tokens(params: dict) -> str:
    """Rate-limited token transfer"""
    # Sanitize and validate input
    recipient = sanitize_input(params["recipient"])
    if not validate_address(recipient):
        raise ValueError("Invalid recipient address")
    
    # Implement transfer logic
    pass

# Configure security settings
config = {
    "max_transaction_size": 1000_000_000,
    "allowed_programs": ["Jupiter", "Meteora"],
    "blocked_addresses": ["known-scam-address-1", ...],
}`}
        language="python"
      />

      <h3>4. Testing</h3>
      <CodeBlock
        code={`import pytest
from path.testing import MockWallet, MockPlugin

@pytest.fixture
async def setup_test_env():
    # Create mock environment
    wallet = MockWallet()
    plugin = MockPlugin()
    
    # Configure mock responses
    wallet.mock_balance("SOL", 100)
    plugin.mock_response("get_price", {"price": 50})
    
    return wallet, plugin

async def test_swap_tokens(setup_test_env):
    wallet, plugin = setup_test_env
    
    # Test the swap
    result = await swap_tokens({
        "input_token": "SOL",
        "output_token": "USDC",
        "amount": 1
    })
    
    assert "Swapped 1 SOL" in result
    assert wallet.get_call_count("transfer") == 1`}
        language="python"
      />

      <h3>5. Monitoring and Logging</h3>
      <CodeBlock
        code={`from path import create_tool
from path.monitoring import monitor, log_transaction

@monitor(
    metrics=["latency", "success_rate"],
    alerts={"error_rate": "> 0.1"}
)
@create_tool
async def monitored_operation(params: dict) -> str:
    """Operation with monitoring"""
    try:
        tx = await perform_operation(params)
        await log_transaction(tx, {
            "type": "swap",
            "amount": params["amount"],
            "user": params["user"]
        })
        return f"Operation successful: {tx.signature}"
    except Exception as e:
        await log_error(e, params)
        raise`}
        language="python"
      />

      <div className="tip">
        <h4>💡 Pro Tip</h4>
        <p>
          When designing tools for AI use, focus on making them self-contained and idempotent. Each tool should handle one specific task well and provide clear feedback about its execution.
        </p>
      </div>
    </article>
  );
}
