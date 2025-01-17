<div align="center">
  <img src="logo.jpg" alt="Bookbag" width="100" height="100">
  <h1>Bookbag</h1>
  <p>All-in-one framework for Solana AI development and learning</p>
  <p>A passion project by <a href="https://x.com/shek_dev">@shek_dev</a></p>

</div>

<div align="center">

  <a href="https://x.com/bookbag">
    <img src="https://img.shields.io/twitter/follow/bookbag?style=social" alt="Twitter Follow">
  </a>
</div>

## Overview

Bookbag is an open-source framework that empowers AI agents with Solana-native capabilities. Built from the ground up for Solana, it provides a comprehensive suite of tools for building intelligent on-chain applications:

- 🎯 **Solana-Native**: Deep integration with Solana's ecosystem - SPL tokens, Metaplex NFTs, and Jupiter DEX
- 🤖 **AI-Powered**: LangChain integration for natural language interactions with Solana programs and data
- 📊 **Real-Time**: Live market data through Pyth oracles and automated trading strategies
- 🔒 **Secure**: AI-driven program analysis and security scanning for Solana smart contracts

## Features

- 🌞 **Solana-First AI**
  - LangChain integration for Solana operations
  - SPL token and NFT interactions
  - Jupiter DEX aggregation
  - Solana program analysis
  - Metaplex metadata handling

- 🤖 **AI Capabilities**
  - Natural language Solana interactions
  - Automated DeFi strategies on Solana
  - NFT collection analysis
  - Program vulnerability scanning
  - Token sentiment analysis

- 🛠️ **Developer Tools**
  - Type-safe Python SDK
  - Solana wallet abstractions
  - Program deployment helpers
  - Async/await support
  - Comprehensive testing utilities

## Examples

### Solana Trading Bot
```python
from bookbag.agents import SolanaTrader
from bookbag.plugins import JupiterDex, PythOracle
from bookbag.strategies import MeanReversion

# Create an AI-powered Solana trading bot
agent = SolanaTrader(
    strategy=MeanReversion(),
    plugins=[
        JupiterDex(),    # Best execution on Solana
        PythOracle()     # Real-time price data
    ]
)

# Train on Solana market data
await agent.train(
    pairs=["SOL/USDC", "BONK/USDC"],
    timeframe="1h",
    periods=168
)

# Start automated trading
await agent.trade(
    capital=100,
    slippage=0.1
)
```

### Program Analysis
```python
from bookbag.agents import ProgramAnalyzer
from bookbag.plugins import AnchorScanner

# Analyze Solana program security
analyzer = ProgramAnalyzer(
    plugins=[AnchorScanner()]
)

# Get AI-powered insights
analysis = await analyzer.analyze(
    program_id="ABC123...",
    cluster="mainnet"
)

print(analysis.security_score)
print(analysis.optimization_tips)
```

## Installation

```bash
# Core SDK with Solana features
pip install "bookbag-sdk[solana]"

# Minimal installation
pip install bookbag-sdk

# Optional plugins
pip install bookbag-sdk-plugin-jupiter bookbag-sdk-plugin-pyth
```

## Links

Follow [@bookbag](https://x.com/bookbag) and [@shek_dev](https://x.com/shek_dev)

## License

Bookbag is open source under the [MIT License](LICENSE).
