document.getElementById('check-balance-btn').addEventListener('click', async () => {
    // Check if MetaMask (or another provider) is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum); // Initialize Web3 using the browser's Ethereum provider
        await window.ethereum.enable(); // Request access to the user's wallet

        // Contract address and ABI for PuDuToPre token
        const puDuToPreAddress = "0xC5c14725F0BE56C5aF1E85FDdFDDAD9d339357e6"; // Replace with your contract address
        const puDuToPreABI = [
            {
                "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
                "name": "balanceOf",
                "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        // Initialize the contract
        const puDuToPreContract = new web3.eth.Contract(puDuToPreABI, puDuToPreAddress);

        try {
            // Get the user's wallet address
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];

            // Call the balanceOf function to get the balance
            const balance = await puDuToPreContract.methods.balanceOf(userAddress).call();

            // Convert the balance from Wei (if necessary)
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
});