

// Add event listener to the button
document.getElementById('check-balance-btn').addEventListener('click', getPuDuToPreBalanceAndStats);




async function getPuDuToPreBalanceAndStats() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const puDuToPreAddress = "0xC5c14725F0BE56C5aF1E85FDdFDDAD9d339357e6"; // Replace with your token contract address
        const puDuToPreABI = [
            {
                "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
                "name": "balanceOf",
                "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const puDuToPreContract = new web3.eth.Contract(puDuToPreABI, puDuToPreAddress);

        try {
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];
            console.log(`User Address: ${userAddress}`);

            // Fetch user's balance
            const balance = await puDuToPreContract.methods.balanceOf(userAddress).call();
            console.log(`Raw Balance from Contract: ${balance}`);
            const formattedBalance = web3.utils.fromWei(balance, 'ether');
            console.log(`Formatted Balance: ${formattedBalance}`);

            // Fetch total supply
            const totalSupply = await puDuToPreContract.methods.totalSupply().call();
            console.log(`Raw Total Supply from Contract: ${totalSupply}`);
            const formattedTotalSupply = web3.utils.fromWei(totalSupply, 'ether');
            console.log(`Formatted Total Supply: ${formattedTotalSupply}`);

            // Calculate percentage held
            const percentageHeld = ((balance / totalSupply) * 100).toFixed(2);
            console.log(`Percentage Held: ${percentageHeld}%`);

            // Update the UI
            document.getElementById('balance-display').querySelector('span').innerText = formattedBalance;
            document.getElementById('total-supply').querySelector('span').innerText = formattedTotalSupply;
            document.getElementById('percentage-held').querySelector('span').innerText = `${percentageHeld}%`;
            document.getElementById('return-amount').querySelector('span').innerText = `${percentageHeld}%`;
        } catch (error) {
            console.error("Error fetching data from the contract:", error);
            alert("Failed to fetch balance or total supply. Please try again.");
        }
    } else {
        alert("MetaMask is not installed. Please fucking install it to use this feature.");
    }
}

