// Ensure DOM content is loaded before running the script
document.addEventListener("DOMContentLoaded", function () {


const contractAddress = "0xC5c14725F0BE56C5aF1E85FDdFDDAD9d339357e6"; // Your token contract address
const priceFeedAddress = "0x1A26d803C2e796601794f8C5609549643832702C"; // BNB/USDT Price Feed address

// ABI from your contract


const contractABI = [
    

    {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "buyWithBNB",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "usdtAmount",
            "type": "uint256"
          }
        ],
        "name": "buyWithUSDT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "endPresale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_usdtAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_priceFeed",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_fundsRecipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_initialOwner",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "allowance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "approver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawUSDT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "fundsRecipient",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getBNBPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "presaleActive",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "TOKEN_PRICE_USD",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "USDT",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }


    
];

let contract;
let userAccount;

// DOM elements
const connectButton = document.getElementById('connectButton');
const contractDetails = document.getElementById('contractDetails');
const tokenNameElem = document.getElementById('tokenName');
const tokenSymbolElem = document.getElementById('tokenSymbol');
const totalSupplyElem = document.getElementById('totalSupply');
const bnbPriceElem = document.getElementById('bnbPrice');
const fundsAvailableElem = document.getElementById('fundsAvailable');
const ownerElem = document.getElementById('owner');
const withdrawFundsButton = document.getElementById('withdrawFundsButton');

// Event listeners
connectButton.addEventListener('click', connectWallet);
withdrawFundsButton.addEventListener('click', withdrawFunds);

// Initialize Web3 instance
const web3 = new Web3(Web3.givenProvider || 'https://bsc-dataseed.binance.org/');

async function connectWallet() {
    if (window.ethereum) {
        console.log("Ethereum wallet detected!");
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            userAccount = accounts[0];
            contract = new web3.eth.Contract(contractABI, contractAddress);
            contractDetails.style.display = 'block';
            connectButton.style.display = 'none';
            loadContractDetails();
        } catch (error) {
            console.error("User denied account access:", error);
            alert("Failed to connect wallet!");
        }
    } else {
        console.error("No Ethereum wallet detected!");
        alert('MetaMask or a similar Web3 wallet extension is required!');
    }
}

async function loadContractDetails() {
    try {
        const [tokenName, tokenSymbol, totalSupply, bnbPrice, owner] = await Promise.all([
            contract.methods.name().call(),
            contract.methods.symbol().call(),
            contract.methods.totalSupply().call(),
            contract.methods.getBNBPrice().call(),
            contract.methods.owner().call()
        ]);

        tokenNameElem.textContent = tokenName;
        tokenSymbolElem.textContent = tokenSymbol;
        totalSupplyElem.textContent = web3.utils.fromWei(totalSupply, 'ether'); // Ensure correct formatting for totalSupply
        bnbPriceElem.textContent = web3.utils.fromWei(bnbPrice, 'ether') + " USDT"; // Convert BNB price to USDT and display
        ownerElem.textContent = owner;
    } catch (error) {
        console.error("Error loading contract details:", error);
    }
}

async function withdrawFunds() {
    if (!contract) {
        alert('Contract not initialized. Connect your wallet first.');
        return;
    }
    try {
        // Check if user has permission to withdraw
        await contract.methods.withdrawFunds().send({ from: userAccount });
        alert('Funds successfully withdrawn!');
    } catch (error) {
        console.error('Error withdrawing funds:', error);
        alert('Failed to withdraw funds. See console for details.');
    }
}

// Check contract balance (for debugging purposes)
web3.eth.getBalance(contractAddress)
    .then(balance => {
        console.log(`Balance in wei: ${balance}`);
        console.log(`Balance in BNB: ${web3.utils.fromWei(balance, 'ether')} BNB`);
    })
    .catch(error => {
        console.error('Error fetching balance:', error);
    });

// Ensure MetaMask is available
if (typeof window.ethereum === 'undefined') {
    alert("MetaMask not found. Please install MetaMask to use this feature.");
}
//cunt
});