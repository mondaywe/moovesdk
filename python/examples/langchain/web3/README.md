# Nectere LangChain Web3 Example

This example demonstrates how to use Nectere with LangChain and web3.py to create an AI agent capable of interacting with EVM-compatible blockchains.

## Features

- Integration with LangChain for AI capabilities
- Web3 wallet integration for blockchain interactions
- ERC20 token operations
- Environment-based configuration

## Setup

1. Copy the `.env.template` and populate with your values:

```bash
cp .env.template .env
```

Required environment variables:
- `RPC_PROVIDER_URL`: Your EVM RPC endpoint
- `WALLET_PRIVATE_KEY`: Private key for the wallet (must start with 0x)
- `OPENAI_API_KEY`: Your OpenAI API key for LangChain

2. Install dependencies:

```bash
poetry install
```

## Usage

Run the example:

```bash
poetry run python example.py
```

This will initialize an AI agent that can:
- Check token balances
- Get information about ERC20 tokens
- Perform basic wallet operations

## Learn More

Check out the [Nectere documentation](https://github.com/nectere-sdk/nectere) for more examples and detailed guides.
