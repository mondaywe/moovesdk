import CodeBlock from "@/components/CodeBlock";

export default function AIIntegration() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>AI Integration</h1>
      
      <p className="lead">
        PATH is designed to work seamlessly with popular AI frameworks, enabling natural language interactions with blockchain functionality.
      </p>

      <h2 id="langchain">LangChain Integration</h2>
      <p>
        PATH provides first-class support for LangChain through its adapter system:
      </p>
      <CodeBlock
        code={`from langchain.agents import initialize_agent, AgentType
from langchain.llms import OpenAI
from path.adapters.langchain import PathToolkit

# Initialize PATH tools
wallet = SolanaWalletClient.from_env()
toolkit = PathToolkit(wallet)
tools = toolkit.get_tools()

# Create LangChain agent
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# Use the agent
response = await agent.arun(
    "What's the SOL balance of vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg?"
)`}
        language="python"
      />

      <h2 id="vercel">Vercel AI SDK</h2>
      <p>
        Use PATH with the Vercel AI SDK to build AI-powered web applications:
      </p>
      <CodeBlock
        code={`from path import create_tool
from path.adapters.vercel import create_completion_handler

@create_tool({
    "name": "check_balance",
    "description": "Check SOL balance of an address",
    "parameters": {
        "type": "object",
        "properties": {
            "address": {
                "type": "string",
                "description": "Solana wallet address"
            }
        },
        "required": ["address"]
    }
})
async def check_balance(params):
    balance = await wallet.get_sol_balance(params["address"])
    return f"{balance} SOL"

# Create Vercel AI handler
handler = create_completion_handler([check_balance])

# In your API route
async def POST(req: Request):
    return await handler(req)`}
        language="python"
      />

      <h2 id="custom">Custom Agents</h2>
      <p>
        Build your own AI agents using PATH&apos;s tool system:
      </p>
      <CodeBlock
        code={`from path import create_tool, get_tools
from pydantic import BaseModel, Field

class SwapParams(BaseModel):
    input_token: str = Field(description="Input token address")
    output_token: str = Field(description="Output token address")
    amount: float = Field(description="Amount to swap")

@create_tool({
    "name": "swap_tokens",
    "description": "Swap tokens using Jupiter",
    "parameters": SwapParams
})
async def swap_tokens(params: dict) -> str:
    jupiter = JupiterPlugin()
    quote = await jupiter.get_quote(
        input_mint=params["input_token"],
        output_mint=params["output_token"],
        amount=params["amount"]
    )
    tx = await jupiter.swap(quote)
    return f"Swapped {params['amount']} tokens. TX: {tx.signature}"

# Get all available tools
tools = get_tools(wallet, custom_tools=[swap_tokens])

# Use with your AI framework
async def handle_request(user_input: str):
    # Your AI logic here
    pass`}
        language="python"
      />

      <h2>Tool Decorators</h2>
      <p>
        PATH provides powerful decorators to make any function AI-friendly:
      </p>
      <CodeBlock
        code={`from path import create_tool
from path.types import Tool

@create_tool
class NFTTool(Tool):
    """Create and manage NFTs"""
    
    async def create_nft(self, name: str, image_url: str) -> str:
        """Create a new NFT with given name and image"""
        nft = await self.nft_plugin.create_nft({
            "name": name,
            "image": image_url
        })
        return f"Created NFT: {nft.mint_address}"
    
    async def transfer_nft(self, mint: str, to: str) -> str:
        """Transfer NFT to another address"""
        await self.nft_plugin.transfer_nft(mint, to)
        return f"Transferred NFT {mint} to {to}"`}
        language="python"
      />

      <div className="tip">
        <h4>💡 Pro Tip</h4>
        <p>
          Use the <code>description</code> parameter in your tool definitions to help AI models better understand how to use your tools. The more detailed the description, the better the AI will perform.
        </p>
      </div>

      <h2>Error Handling</h2>
      <p>
        PATH tools automatically handle common errors and provide AI-friendly error messages:
      </p>
      <CodeBlock
        code={`@create_tool({
    "name": "send_tokens",
    "description": "Send tokens to an address",
    "error_handlers": {
        "InsufficientFundsError": "Not enough tokens for transfer",
        "InvalidAddressError": "The provided address is invalid"
    }
})
async def send_tokens(params: dict) -> str:
    try:
        tx = await token_plugin.transfer_tokens(
            token=params["token"],
            amount=params["amount"],
            to=params["recipient"]
        )
        return f"Transfer successful: {tx.signature}"
    except Exception as e:
        # PATH automatically converts errors to AI-friendly messages
        raise`}
        language="python"
      />
    </article>
  );
}
