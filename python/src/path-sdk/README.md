# PATH - Python SDK

PATH (Protocol Agent Toolkit Hub) is an open-source framework for connecting AI agents to any onchain app, with primary focus on Solana and support for EVM chains.

## Installation

```bash
pip install path-sdk
```

Or with Poetry:

```bash
poetry add path-sdk
```

## Quick Start

```python
from path import WalletClientBase, create_tool
from pydantic import BaseModel, Field

# Create a wallet client
wallet = SolanaWalletClient()

# Create a tool with parameters
class GetBalanceParameters(BaseModel):
    address: str = Field(description="The address to get the balance of")

@Tool({
    "description": "Get the balance of an address",
    "parameters": GetBalanceParameters
})
def get_balance(params: dict) -> str:
    balance = await wallet.balance_of(params["address"])
    return f"{balance.value} {balance.symbol}"

# Get all available tools
tools = get_tools(wallet, plugins=[
    JupiterPlugin(),
    SPLTokenPlugin(),
    # EVM plugins also available
    ERC20Plugin()
])
```

## Features

-   🔌 Plugin System - Extend functionality with plugins
-   🌞 Solana First - Deep integration with Solana's ecosystem
-   🔗 Multi-Chain Support - Primary support for Solana with additional support for EVM chains
-   🛠️ Tool Framework - Create custom tools for AI agents
-   📦 Type Safety - Full type support with Python type hints
-   ⚡ Async Support - Built for high performance

## Examples

Check out our [examples directory](https://github.com/path-sdk/path/tree/main/python/examples) for complete working examples.

## Development

1. Clone the repository:

```bash
git clone https://github.com/path-sdk/path.git
cd path/python
```

2. Install dependencies:

```bash
poetry install
```

3. Run tests:

```bash
poetry run pytest
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
