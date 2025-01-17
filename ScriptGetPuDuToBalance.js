

let web3;
let contractInstance;
let contractAddress;
let contractABI;

async function loadContractDetails() {
    try {
        const response = await fetch('./contractDetails.json');
        const contractDetails = await response.json();
        contractAddress = contractDetails.address;
        contractABI = contractDetails.abi;

        initWeb3();
    } catch (error) {
        console.error("Error loading contract details:", error);
    }
    
}

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        updateInfo();
    } else {
        alert("Please install MetaMask!");
    }
}

// Get current BNB price in USD

async function fetchBNBPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
        const data = await response.json();
        const currentBNBPrice = data.binancecoin.usd;
     //--------------------------------------------------------------------------remove to restore to contract price feed -----------------------------   
      
     bnbUSD = (currentBNBPrice * 1e8)
       
    //---------------------------------------------------------------------------------------------------
        console.log(`Current BNB Price (USD): $${currentBNBPrice}`);
    } catch (error) {
        console.error('Error fetching BNB price:', error);
    }
}

let bnbUSD;
let formattedTokenPrice;
let formattedTokenSellPrice

async function updateInfo() {
 try {
    //gets the BNB price from the contracts price feed

  //  bnbUSD = await contractInstance.methods.getBNBPriceInUSD().call();
  //-----------------un comment to restore to price feed
    
  console.log('bnbUSD: updateinfo', bnbUSD);
    // Fetch the wallet address
    const accounts = await web3.eth.getAccounts();
    const walletAddress = accounts[0];

    document.getElementById('wallet-address').innerText = `Connected Wallet: ${walletAddress}`;
    document.getElementById('contractAddressDisplay').innerText = `Contract Address: ${contractAddress}`;

    // Fetch token balance for the connected wallet
    const balance = await contractInstance.methods.balanceOf(walletAddress).call();
    const formattedBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById('PuDuToWalletBalance').innerText = Number(formattedBalance).toLocaleString();

    // Fetch total token supply
    const totalSupply = await contractInstance.methods.getTotalSupply().call();
    console.log(`total PuDuto: $${totalSupply}`);
    //document.getElementById('totalTokenSupply').innerText = ` ${web3.utils.fromWei(totalSupply, 'ether')}`;
    document.getElementById('totalTokenSupply').innerText = Number(web3.utils.fromWei(totalSupply, 'ether')).toLocaleString();


    const percentageOfSupply = (balance / totalSupply) * 100;
    document.getElementById('percentage-held').innerText = ` ${percentageOfSupply.toFixed(2)} %`;

    // Fetch token buy price from the contract
    const tokenPriceInUSD = await contractInstance.methods.tokenPriceInUSD().call();
     formattedTokenPrice = (tokenPriceInUSD / 1e2).toFixed(2); // Convert to 2 decimal places
    // document.getElementById('weiPuDoToUSDPrice').innerText = `Wei Price: $${(tokenPriceInUSD / 1e18).toFixed(18)} USD`;
    document.getElementById('formattedPuDoToUSDPrice').innerText = `$${formattedTokenPrice}`;
    document.getElementById('formattedPuDoToBNBPrice').innerText =  ` ${(formattedTokenPrice / (bnbUSD / 1e8)).toFixed(8)} BNB`;

    // Fetch token SELL price from the contract
    const tokenSellPriceInUSD = await contractInstance.methods.tokenSellPriceInUSD().call();
     formattedTokenSellPrice = (tokenSellPriceInUSD / 1e2).toFixed(2); // Convert to 2 decimal places
     // document.getElementById('weiPuDoToSellUSDPrice').innerText = `Wei Price: $${(tokenSellPriceInUSD / 1e18).toFixed(18)} USD`;
     document.getElementById('formattedPuDoToSellUSDPrice').innerText = `$${formattedTokenSellPrice}`;
     document.getElementById('formattedPuDoToSellBNBPrice').innerText =  ` ${(formattedTokenSellPrice / (bnbUSD / 1e8)).toFixed(8)} BNB`;
     //formattedPuDoToSellBNBPrice
  
 
     console.log('bnbUSD:', bnbUSD);
// -------------------------------------------------------- PuDuTo pool balance -------------------------------------------------------
   
   const bnbUSDInDecimal = (bnbUSD / 1e8).toFixed(2);//----------------------------price feed-----------------------
   // const bnbUSDInDecimal = bnbUSD ;//-----------------------------coin gecko------------------
    console.log('bnbUSD decimal:', bnbUSDInDecimal);

    document.getElementById('BNBcurrentPrice').innerText = `$${bnbUSDInDecimal} USD`;
    const contractBalance = await web3.eth.getBalance(contractAddress);
    const formattedValueBalance = web3.utils.fromWei(contractBalance, 'ether');
   // document.getElementById('PuDuToPoolValue').innerText = ` ${formattedValueBalance} BNB`;
    const totalWithdrawalInUSD = formattedValueBalance * bnbUSDInDecimal;
    document.getElementById('PuDuToPoolValue').innerText =` $${totalWithdrawalInUSD.toFixed(2)} USD `;

    const formattedBNBBalance = parseFloat(web3.utils.fromWei(contractBalance, 'ether')).toFixed(5);
    document.getElementById('PuDuToPoolBNBValue').innerText =` ${formattedBNBBalance} BNB `;

  //------------------------------------------------------------------------------------------------- withdrawlable balance---------------------------------------
    
    

    const currentSellLockStatus = await contractInstance.methods.isSellLocked().call();
    const currentBuyLockStatus = await contractInstance.methods.isBuyLocked().call();
    const currentWithdrawlLockStatus = await contractInstance.methods.isWithdrawLocked().call();

    // Calculate required BNB for the user's token balance
    const tokenPriceInBNB = tokenPriceInUSD / bnbUSD; // Token price in USD divided by BNB price in USD
    const formattedTokenPriceInBNB = tokenPriceInBNB.toFixed(8); // Format to 8 decimal places
 
    
  //-----------------------------------------------------------------------------------------------------------------------------------------------withdrawl calculations----------
   
  //  const bnbUSDInDecimal = (bnbUSD / 1e8).toFixed(2);
  // document.getElementById('BNBUSD').innerText =  `1 BNB is worth: $${(bnbUSDInDecimal)} USD - 1 PuDuTo = ${(formattedTokenPrice / (bnbUSD / 1e8)).toFixed(8)} BNB`;
    // document.getElementById('BNBUSD').innerText =  `1 BNB is worth: $${(702.02).toFixed(2)} USD - 1 PuDuTo = ${(formattedTokenPrice / (702.02)).toFixed(8)} BNB`;
   

} catch (error) {
    console.error("Error fetching token data:", error);
   // document.getElementById('tokenBalanceDisplay').innerText = "Error fetching token balance.";
}

}



loadContractDetails()








//--------------------------------------------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------buy puduto------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
// Real-time calculation on user input - updates the USD and BNB as user inputs token amount
document.getElementById('amountToBuy').addEventListener('input', function () {
   //------------------------ get BNB current price to display approx for purchase ------------------------------
    const bnbUSDInDecimal = (bnbUSD / 1e8).toFixed(2);
    console.log('bnbUSD: buy', bnbUSDInDecimal);

    const tokenAmountToBuy = parseFloat(this.value, 10);
   // const bnbAmount = parseFloat(this.value); // Get the entered BNB amount

    if (tokenAmountToBuy > 0 ) {
        const USDAmount = (tokenAmountToBuy * formattedTokenPrice).toFixed(2); // Calculate USD equivalent
        const BNBAmount = (tokenAmountToBuy * (formattedTokenPrice / bnbUSDInDecimal)).toFixed(5); // Calculate number of tokens

        document.getElementById('buy-btn').innerText = `Buy ${tokenAmountToBuy} PuDuTo Tokens`;
        document.getElementById('pudutoBNBamount').innerText = BNBAmount;
        document.getElementById('usd-equivalent').innerText = `$${USDAmount}`;
    } else {
        document.getElementById('pudutoBNBamount').innerText = 0;
        document.getElementById('usd-equivalent').innerText = '$0.00';
    }
});
//------------------------------------------------------------------------------------------------------------------
async function buyTokens() {
    const tokenAmount = document.getElementById('amountToBuy').value;
    if (!tokenAmount || tokenAmount <= 0) {
        showStatusMessage("Please enter a valid amount of tokens.", 'error');
        return;
    }
    const accounts = await web3.eth.getAccounts();
    const buyer = accounts[0];
    try {
        const tokenAmountInWei = web3.utils.toWei(tokenAmount, 'ether');
        const bnbAmount = await contractInstance.methods.calculateBNBAmount(tokenAmountInWei, await contractInstance.methods.getBNBPriceInUSD().call()).call();
        await contractInstance.methods.buyWithTokens(tokenAmountInWei).send({
            from: buyer,
            value: bnbAmount
        });
        showStatusMessage("Purchase successful!", 'success');
        updateInfo();
    } catch (error) {
        console.error("Error buying tokens:", error);
        showStatusMessage("Transaction failed!", 'error');
    }
}
//------------------------Listen for buy button to be clicked ------------------------------------
document.getElementById('buy-btn').addEventListener('click', buyTokens);
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------SELL puduto------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
// Real-time calculation on user input - updates the USD and BNB as user inputs token amount
document.getElementById('amountToSell').addEventListener('input', function () {
    //------------------------ get BNB current price to display approx for purchase ------------------------------
     const bnbUSDInDecimal = (bnbUSD / 1e8).toFixed(2);
     console.log('bnbUSD: sell', bnbUSDInDecimal);
 
     const tokenAmountToSell = parseFloat(this.value, 10);
    // const bnbAmount = parseFloat(this.value); // Get the entered BNB amount
 
     if (tokenAmountToSell > 0 ) {
         const USDAmount = (tokenAmountToSell * formattedTokenSellPrice).toFixed(2); // Calculate USD equivalent
         const BNBAmount = (tokenAmountToSell * (formattedTokenSellPrice / bnbUSDInDecimal)).toFixed(5); // Calculate number of tokens
 
         document.getElementById('sell-btn').innerText = `Sell ${tokenAmountToSell} PuDuTo Tokens`;
         document.getElementById('pudutoBNBSellamount').innerText = BNBAmount;
         document.getElementById('Sellusd-equivalent').innerText = `$${USDAmount}`;
     } else {
         document.getElementById('pudutoBNBSellamount').innerText = 0;
         document.getElementById('Sellusd-equivalent').innerText = '$0.00';
     }
 });

 async function sellTokens() {
    const sellAmount = document.getElementById('amountToSell').value;
    if (!sellAmount || sellAmount <= 0) {
        showStatusMessage("Please enter a valid amount of tokens to sell.", 'error');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const seller = accounts[0];

    try {
        const tokenAmountInWei = web3.utils.toWei(sellAmount, 'ether');
        await contractInstance.methods.sellTokensForBNB(tokenAmountInWei).send({
            from: seller
        });

        showStatusMessage("Sell successful!", 'success');
        updateInfo();
    } catch (error) {
        console.error("Error selling tokens:", error);
        showStatusMessage("Transaction failed!", 'error');
    }
}
//------------------------------Listen for sell button to be clicked------------------------------------------
document.getElementById('sell-btn').addEventListener('click', sellTokens);


 //------------------------------------------------------------------------------------------------------------------
 
 //-------------------------------------------------------------------------------------------------------------------------------------------
 //-------------------------------------------------------------------------------------------------------------------------------------------
 //-------------------------------------------------------------------------------------------------------------------------------------------
 
 









window.onload = async () => {
    await fetchBNBPrice();      // Fetch the current BNB price
    await loadContractDetails(); // Initialize the contract and fetch token price
};

setInterval(fetchBNBPrice, 60000);
setInterval(updateInfo, 60000);

