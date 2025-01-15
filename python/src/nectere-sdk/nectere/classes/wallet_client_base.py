from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from nectere.classes.tool_base import ToolBase, create_tool
from nectere.types.chain import Chain


@dataclass
class Balance:
    """
    Represents a token balance.

    Attributes:
        value: The balance value
        symbol: The token symbol
        decimals: The number of decimals for the token
    """

    value: float
    symbol: str
    decimals: int


@dataclass
class Signature:
    """
    Represents a signature.

    Attributes:
        signature: The signature value
        public_key: The public key that signed the message
    """

    signature: str
    public_key: str


class WalletClientBase(ABC):
    """
    Abstract base class for wallet clients.
    """

    @abstractmethod
    def get_chain(self) -> Chain:
        """
        Gets the chain this wallet is connected to.

        Returns:
            The chain this wallet is connected to
        """
        pass

    @abstractmethod
    async def get_address(self) -> str:
        """
        Gets the address of this wallet.

        Returns:
            The address of this wallet
        """
        pass

    @abstractmethod
    async def get_balance(self, token_address: Optional[str] = None) -> Balance:
        """
        Gets the balance of a token.

        Args:
            token_address: The address of the token to get the balance of. If not provided,
                         gets the balance of the native token.

        Returns:
            The balance of the token
        """
        pass

    @abstractmethod
    async def sign_message(self, message: str) -> Signature:
        """
        Signs a message.

        Args:
            message: The message to sign

        Returns:
            The signature
        """
        pass

    @abstractmethod
    async def send_transaction(self, transaction: Dict[str, Any]) -> str:
        """
        Sends a transaction.

        Args:
            transaction: The transaction to send

        Returns:
            The transaction hash
        """
        pass

    def get_tools(self) -> List[ToolBase]:
        """
        Gets the tools provided by this wallet.

        Returns:
            An array of tools
        """
        return []
