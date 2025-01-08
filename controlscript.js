// Ensure DOM content is loaded before running the script
document.addEventListener("DOMContentLoaded", function () {


/*--------------------------------------  Import contract detail -----------------------------------*/
        /*---------------------------------------------------------------------------------------------------*/
        /*---------------------- instead of pasting the entire ABI, paste this to get contract detail -------*/

        let contractAddress; // Declare globally
        let contractABI;     // Declare globally
        try {
            const response = await fetch('./contractDetails.json');
            if (!response.ok) {
                throw new Error("Failed to load contractDetails.json");
            }
            const contractDetails = await response.json();

            contractAddress = contractDetails.address;
            contractABI = contractDetails.abi;

            console.log("Contract Address:", contractAddress);
            console.log("Contract ABI:", contractABI);
        } catch (error) {
            console.error("Error loading contract details:", error);
        }

            
        /*---------------------------------------------------------------------------------------------------*/
        /*---------------------------------------------------------------------------------------------------*/

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