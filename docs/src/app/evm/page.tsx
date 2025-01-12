import CodeBlock from "@/components/CodeBlock";

export default function EVMSupport() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>EVM Support</h1>
      
      <p className="lead">
        PATH provides comprehensive support for Ethereum Virtual Machine (EVM) chains, enabling seamless interaction with Ethereum, Polygon, BSC, and other EVM-compatible networks.
      </p>

      <h2 id="setup">Setup</h2>
      <p>
        Initialize an EVM wallet client:
      </p>
      <CodeBlock
        code={`from path.wallets.evm import EVMWalletClient

# Initialize with private key
wallet = EVMWalletClient.from_private_key(
    private_key="your-private-key",
    rpc_url="https://mainnet.infura.io/v3/your-project-id"
)

# Or use environment variables
wallet = EVMWalletClient.from_env()  # Uses ETH_PRIVATE_KEY and ETH_RPC_URL

# Configure network
wallet.set_chain_id(1)  # Ethereum Mainnet
wallet.set_rpc_url("https://your-rpc-url")`}
        language="python"
      />

      <h2 id="erc20">ERC20 Tokens</h2>
      <p>
        Work with ERC20 tokens using the built-in ERC20 plugin:
      </p>
      <CodeBlock
        code={`from path.plugins.erc20 import ERC20Plugin

# Initialize plugin
erc20 = ERC20Plugin()

# Get token balance
balance = await erc20.get_balance(
    token_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  # USDC
    wallet_address="0x..."
)

# Transfer tokens
tx = await erc20.transfer(
    token_address="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    recipient="0x...",
    amount=100_000_000  # 100 USDC (6 decimals)
)

# Get token info
info = await erc20.get_token_info("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
print(f"Symbol: {info.symbol}, Decimals: {info.decimals}")`}
        language="python"
      />

      <h2 id="smart-wallets">Smart Contract Wallets</h2>
      <p>
        Use smart contract wallets for enhanced security and features:
      </p>
      <CodeBlock
        code={`from path.wallets.evm import EVMSmartWalletClient

# Initialize smart wallet
wallet = EVMSmartWalletClient.create(
    implementation="safe",  # Gnosis Safe
    owners=["0x...", "0x..."],
    threshold=2  # Require 2 signatures
)

# Deploy wallet
deployment = await wallet.deploy()
print(f"Smart wallet deployed at: {deployment.address}")

# Create transaction
tx = await wallet.create_transaction(
    to="0x...",
    value=1_000_000_000_000_000_000,  # 1 ETH
    data="0x..."
)

# Sign transaction
signature1 = await wallet.sign_transaction(tx, owner1_key)
signature2 = await wallet.sign_transaction(tx, owner2_key)

# Execute transaction
result = await wallet.execute_transaction(tx, [signature1, signature2])`}
        language="python"
      />

      <h2 id="contract-interaction">Smart Contract Interaction</h2>
      <p>
        Interact with any smart contract using the low-level API:
      </p>
      <CodeBlock
        code={`from path.wallets.evm import Contract

# Load contract
abi = [...] # Contract ABI
contract = Contract(
    address="0x...",
    abi=abi,
    wallet=wallet
)

# Call view function
result = await contract.functions.balanceOf("0x...").call()

# Send transaction
tx = await contract.functions.transfer(
    "0x...",
    100_000_000
).send(
    gas_limit=100000,
    max_fee_per_gas=2_000_000_000  # 2 gwei
)`}
        language="python"
      />

      <h2 id="networks">Multi-Chain Support</h2>
      <p>
        PATH supports all major EVM-compatible networks:
      </p>
      <CodeBlock
        code={`from path.wallets.evm import networks

# Switch networks
await wallet.switch_network(networks.POLYGON_MAINNET)

# Get network info
network = await wallet.get_network()
print(f"Connected to {network.name} (Chain ID: {network.chain_id})")

# Custom network
custom_network = {
    "name": "My Network",
    "chain_id": 12345,
    "rpc_url": "https://...",
    "currency": {
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18
    }
}
await wallet.add_network(custom_network)`}
        language="python"
      />

      <h2 id="gas">Gas Management</h2>
      <p>
        Advanced gas management features:
      </p>
      <CodeBlock
        code={`# Estimate gas
gas_estimate = await wallet.estimate_gas(
    to="0x...",
    value=1_000_000_000_000_000_000,  # 1 ETH
    data="0x..."
)

# Get gas price
gas_price = await wallet.get_gas_price()

# EIP-1559 transaction
tx = await wallet.send_transaction({
    "to": "0x...",
    "value": 1_000_000_000_000_000_000,  # 1 ETH
    "maxFeePerGas": 2_000_000_000,  # 2 gwei
    "maxPriorityFeePerGas": 1_000_000_000  # 1 gwei
})

# Wait for confirmation
receipt = await wallet.wait_for_transaction(tx.hash, confirmations=3)`}
        language="python"
      />

      <div className="tip">
        <h4>💡 Pro Tip</h4>
        <p>
          Use the <code>networks</code> module to access predefined configurations for popular EVM networks. This ensures you&apos;re using the correct chain IDs and RPC URLs.
        </p>
      </div>
    </article>
  );
}
