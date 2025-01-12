<div align="center">
[Examples](https://github.com/path-sdk/path/tree/main/python/examples)

PATH is free software, MIT licensed.
</div>

## PATH
PATH (Protocol Agent Toolkit Hub) is an open-source framework for adding blockchain tools to your AI agent, with primary focus on Solana and support for EVM chains.

**Problem**: 

Making agents perform onchain actions is tedious. The ecosystem is heavily fragmented, spanning 5+ popular agent development frameworks, multiple programming languages, and dozens of different blockchains and wallet architectures.
For developers without blockchain expertise, finding clear instructions to perform simple actions - like sending SPL tokens or interacting with Solana programs - is nearly impossible.

**Solution**: 

PATH solves this by providing an open-source, provider-agnostic framework that abstracts away all these combinations.

- **For agent developers**: PATH offers an always-growing catalog of ready made blockchain actions (sending tokens, using DeFi protocols, ...) that can be imported as tools into your existing agent. It works with the most popular agent frameworks (Langchain, Vercel's AI SDK, Eliza, etc), with primary support for Solana and additional support for 30+ EVM chains (Base, Polygon, Mode, ...).

- **For dApp / smart contract developers**: develop a plug-in in PATH, and allow agents built with any of the most popular agent development frameworks to access your service.

### Key features
1. **Works Everywhere**: Compatible with Langchain, Vercel's AI SDK, Eliza, and more.
2. **Solana First**: Deep integration with Solana's ecosystem including SPL tokens, NFTs, and DeFi protocols.
3. **Multi-Chain**: Primary support for Solana with additional support for EVM chains.
4. **Customizable**: Use or build plugins for any onchain functionality (sending tokens, checking wallet balance, etc) and protocol (Jupiter, Meteora, Uniswap, etc).

### How it works
PATH plugs into your agents tool calling capabilities adding all the functions your agent needs to interact with the blockchain. 

High-level, here's how it works:

#### Configure the wallet you want to use
```python
# Create a wallet client
wallet = SolanaWalletClient()

# Get all available tools
tools = get_tools(wallet, plugins=[
    JupiterPlugin(),
    SPLTokenPlugin(),
    # EVM plugins also available
    ERC20Plugin()
])
```

#### Create custom tools
```python
from path import WalletClientBase, create_tool
from pydantic import BaseModel, Field

class GetBalanceParameters(BaseModel):
    address: str = Field(description="The address to get the balance of")

@Tool({
    "description": "Get the balance of an address",
    "parameters": GetBalanceParameters
})
def get_balance(params: dict) -> str:
    balance = await wallet.balance_of(params["address"])
    return f"{balance.value} {balance.symbol}"
```

#### Connect it to your agent framework of choice
```python
# Initialize LLM
llm = ChatOpenAI(model="gpt-4")

# Create the agent
agent = create_structured_chat_agent(llm=llm, tools=tools, prompt=prompt)

# Execute the agent
response = agent_executor.invoke({
    "input": "Swap 1 SOL for USDC using Jupiter"
})
```

See [here](https://github.com/path-sdk/path/tree/main/python/examples) for more examples.
