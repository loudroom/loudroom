
// Add event listener to the button
document.getElementById('check-balance-btn').addEventListener('click', getPuDuToPreBalance);





// Function to fetch the balance
async function getPuDuToPreBalance() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const puDuToPreAddress = "0xYourTokenContractAddress"; // Replace with your token contract address
        const puDuToPreABI = [
            {
                "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
                "name": "balanceOf",
                "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const puDuToPreContract = new web3.eth.Contract(puDuToPreABI, puDuToPreAddress);

        try {
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];

            const balance = await puDuToPreContract.methods.balanceOf(userAddress).call();
            const formattedBalance = web3.utils.fromWei(balance, 'ether');

            // Update the UI with the balance
            document.getElementById('balance-display').querySelector('span').innerText = formattedBalance;

            console.log(`Balance: ${formattedBalance} PuDuToPre`);
        } catch (error) {
            console.error("Error fetching balance:", error);
            alert("Failed to fetch balance. Please try again.");
        }
    } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
    }
}

// Add event listener to the button
document.getElementById('check-balance-btn').addEventListener('click', getPuDuToPreBalance);
