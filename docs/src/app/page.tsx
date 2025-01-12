import CodeBlock from "@/components/CodeBlock";

export default function Home() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Protocol Agent Toolkit Hub</h1>
      <p className="text-xl text-gray-400">
        PATH is a powerful toolkit designed to connect AI agents with Solana&apos;s ecosystem, enabling seamless blockchain interactions through natural language.
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="feature-card">
          <h3>🌞 Solana-First Design</h3>
          <p>Built from the ground up for Solana&apos;s high-performance ecosystem, with deep integration for SPL tokens, NFTs, and DeFi protocols.</p>
        </div>
        <div className="feature-card">
          <h3>🤖 AI-Native Architecture</h3>
          <p>Seamlessly integrates with LangChain, Vercel AI SDK, and other popular AI frameworks for natural blockchain interactions.</p>
        </div>
      </div>

      <h2>Quick Start</h2>
      <p>Get started with PATH in just a few minutes:</p>

      <h3>1. Installation</h3>
      <CodeBlock 
        code="pip install path-sdk" 
        language="bash"
      />

      <h3>2. Basic Setup</h3>
      <p>Create a new wallet client and initialize your tools:</p>
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

      <h3>3. Create Your First Tool</h3>
      <p>Build a custom tool to interact with Solana:</p>
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

      <h2>Key Features</h2>
      
      <h3>🔥 Solana Integration</h3>
      <ul>
        <li>Native support for SOL and SPL tokens</li>
        <li>Built-in Jupiter integration for best swap rates</li>
        <li>NFT creation and management</li>
        <li>Program interaction utilities</li>
      </ul>

      <h3>🛠️ Plugin System</h3>
      <p>
        Extend functionality with a powerful plugin system. PATH comes with several official plugins:
      </p>
      <ul>
        <li><strong>Jupiter Plugin:</strong> Best-in-class token swaps</li>
        <li><strong>Meteora Plugin:</strong> Concentrated liquidity operations</li>
        <li><strong>NFT Plugin:</strong> Comprehensive NFT tooling</li>
      </ul>

      <h3>🤖 AI Framework Support</h3>
      <p>
        Seamlessly integrate with popular AI frameworks:
      </p>
      <CodeBlock
        code={`from langchain.agents import initialize_agent
from path.adapters.langchain import PathToolkit

# Initialize PATH tools in LangChain
tools = PathToolkit(wallet).get_tools()

# Create an agent
agent = initialize_agent(
    tools,
    llm,
    agent="zero-shot-react-description",
    verbose=True
)`}
        language="python"
      />

      <h2>Next Steps</h2>
      <p>
        Explore our comprehensive guides to learn more about:
      </p>
      <ul>
        <li>Setting up wallets and managing keys</li>
        <li>Creating custom tools and plugins</li>
        <li>Integrating with DeFi protocols</li>
        <li>Building AI agents for Solana</li>
      </ul>

      <div className="mt-8 p-4 bg-zinc-900 rounded-lg">
        <h3 className="mt-0">💡 Pro Tip</h3>
        <p className="mb-0">
          Check out our examples directory for complete implementations and best practices. Each example comes with detailed explanations and production-ready code.
        </p>
      </div>
    </article>
  );
}
