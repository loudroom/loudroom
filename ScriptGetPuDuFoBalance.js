
let PuDuFoweb3;
let PuDuFocontractInstance;
let PuDuFocontractAddress;
let PuDuFocontractABI;

async function loadPuDuFoContractDetails() {
    try {
      //  const response = await fetch('./PuDuFocontractDetails.json');
        const response = await fetch('./PuDuFoMainNet.json');
        const contractDetails = await response.json();
        PuDuFocontractAddress = contractDetails.address;
        PuDuFocontractABI = contractDetails.abi;

        PuDuFoinitWeb3();
    } catch (error) {
        console.error("Error loading contract details:", error);
    }
    
}

async function PuDuFoinitWeb3() {
    if (window.ethereum) {
        PuDuFoweb3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        PuDuFocontractInstance = new PuDuFoweb3.eth.Contract(PuDuFocontractABI, PuDuFocontractAddress);
        PuDuFoupdateInfo();
    } else {
        alert("Please install MetaMask!");
    }
}

// Get current BNB price in USD
async function PuDuFofetchBNBPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
        const data = await response.json();
        const PuDuFocurrentBNBPrice = data.binancecoin.usd;
     //--------------------------------------------------------------------------remove to restore to contract price feed -----------------------------   
      
     PuDuFobnbUSD = (PuDuFocurrentBNBPrice * 1e8)
       
    //---------------------------------------------------------------------------------------------------
        console.log(`Current PuDuFo BNB Price (USD): $${PuDuFocurrentBNBPrice}`);
    } catch (error) {
        console.error('Error fetching BNB price:', error);
    }
}

let PuDuFobnbUSD;
let PuDuFoformattedTokenPrice;
let PuDuFoformattedTokenSellPrice;

async function PuDuFoupdateInfo() {
 try {
    //gets the BNB price from the contracts price feed

  //  bnbUSD = await PuDuFocontractInstance.methods.getBNBPriceInUSD().call();
  //-----------------un comment to restore to price feed
    
  console.log('PuDuFo bnbUSD: updateinfo', PuDuFobnbUSD);
    // Fetch the wallet address
    const accounts = await PuDuFoweb3.eth.getAccounts();
    const walletAddress = accounts[0];

   // document.getElementById('PuDuFowallet-address').innerText = `Connected Wallet: ${walletAddress}`;
    document.getElementById('PuDuFocontractAddressDisplay').innerText = `Contract Address: ${PuDuFocontractAddress}`;

    // Fetch token balance for the connected wallet
    const balance = await PuDuFocontractInstance.methods.balanceOf(walletAddress).call();
    const formattedBalance = PuDuFoweb3.utils.fromWei(balance, 'ether');
    document.getElementById('PuDuFoWalletBalance').innerText = Number(formattedBalance).toLocaleString();

    // Fetch total token supply
    const totalSupply = await PuDuFocontractInstance.methods.getTotalSupply().call();
    console.log(`total PuDuFo: $${totalSupply}`);
    //document.getElementById('totalTokenSupply').innerText = ` ${web3.utils.fromWei(totalSupply, 'ether')}`;
    document.getElementById('totalPuDuFoSupply').innerText = Number(PuDuFoweb3.utils.fromWei(totalSupply, 'ether')).toLocaleString();


    const percentageOfSupply = (balance / totalSupply) * 100;
    document.getElementById('PuDuFopercentage-held').innerText = ` ${percentageOfSupply.toFixed(2)} %`;

    // Fetch token buy price from the contract
    const tokenPriceInUSD = await PuDuFocontractInstance.methods.tokenPriceInUSD().call();
     PuDuFoformattedTokenPrice = (tokenPriceInUSD / 1e2).toFixed(2); // Convert to 2 decimal places
    // document.getElementById('weiPuDoToUSDPrice').innerText = `Wei Price: $${(tokenPriceInUSD / 1e18).toFixed(18)} USD`;
    document.getElementById('formattedPuDoFoUSDPrice').innerText = `$${PuDuFoformattedTokenPrice}`;
    document.getElementById('formattedPuDoFoBNBPrice').innerText =  ` ${(PuDuFoformattedTokenPrice / (PuDuFobnbUSD / 1e8)).toFixed(8)} BNB`;

    // Fetch token SELL price from the contract
    const tokenSellPriceInUSD = await PuDuFocontractInstance.methods.tokenSellPriceInUSD().call();
     PuDuFoformattedTokenSellPrice = (tokenSellPriceInUSD / 1e2).toFixed(2); // Convert to 2 decimal places
     // document.getElementById('weiPuDoToSellUSDPrice').innerText = `Wei Price: $${(tokenSellPriceInUSD / 1e18).toFixed(18)} USD`;
     document.getElementById('formattedPuDoFoSellUSDPrice').innerText = `$${PuDuFoformattedTokenSellPrice}`;
     document.getElementById('formattedPuDoFoSellBNBPrice').innerText =  ` ${(PuDuFoformattedTokenSellPrice / (PuDuFobnbUSD / 1e8)).toFixed(8)} BNB`;


     //---------------------------------------------------------------------get influence------------------------------------------------
     const getInfluence = await PuDuFocontractInstance.methods.getInfluence(walletAddress).call();
     const influencePoints = (getInfluence * 10);
     document.getElementById('PuDuFoInfluence').innerText = `${influencePoints}`;

     console.log('Influence:', getInfluence);
     console.log('InfluencePoint:', influencePoints);
     console.log('PuDuFo bnbUSD:', PuDuFobnbUSD);
// -------------------------------------------------------- PuDuTo pool balance -------------------------------------------------------
   
   const bnbUSDInDecimal = (PuDuFobnbUSD / 1e8).toFixed(2);//----------------------------price feed-----------------------
   // const bnbUSDInDecimal = bnbUSD ;//-----------------------------coin gecko------------------
    console.log('PuDuFobnbUSD decimal:', bnbUSDInDecimal);

    

    const contractBalance = await PuDuFoweb3.eth.getBalance(PuDuFocontractAddress);
    const formattedValueBalance = PuDuFoweb3.utils.fromWei(contractBalance, 'ether');
   // document.getElementById('PuDuToPoolValue').innerText = ` ${formattedValueBalance} BNB`;
    const totalWithdrawalInUSD = formattedValueBalance * bnbUSDInDecimal;
    document.getElementById('PuDuFoPoolValue').innerText =` $${totalWithdrawalInUSD.toFixed(2)} USD `;

    const formattedBNBBalance = parseFloat(PuDuFoweb3.utils.fromWei(contractBalance, 'ether')).toFixed(5);
    document.getElementById('PuDuFoPoolBNBValue').innerText =` ${formattedBNBBalance} BNB `;

  //------------------------------------------------------------------------------------------------- withdrawlable balance---------------------------------------
    
    

    const currentSellLockStatus = await PuDuFocontractInstance.methods.isSellLocked().call();
    const currentBuyLockStatus = await PuDuFocontractInstance.methods.isBuyLocked().call();
    const currentWithdrawlLockStatus = await PuDuFocontractInstance.methods.isWithdrawLocked().call();

    // Calculate required BNB for the user's token balance
    const tokenPriceInBNB = tokenPriceInUSD / bnbUSD; // Token price in USD divided by BNB price in USD
    const PuDuFoformattedTokenPriceInBNB = tokenPriceInBNB.toFixed(8); // Format to 8 decimal places
 
    
  //-----------------------------------------------------------------------------------------------------------------------------------------------withdrawl calculations----------
   
  //  const bnbUSDInDecimal = (bnbUSD / 1e8).toFixed(2);
  // document.getElementById('BNBUSD').innerText =  `1 BNB is worth: $${(bnbUSDInDecimal)} USD - 1 PuDuTo = ${(PuDuFoformattedTokenPrice / (bnbUSD / 1e8)).toFixed(8)} BNB`;
    // document.getElementById('BNBUSD').innerText =  `1 BNB is worth: $${(702.02).toFixed(2)} USD - 1 PuDuTo = ${(PuDuFoformattedTokenPrice / (702.02)).toFixed(8)} BNB`;
   

} catch (error) {
    console.error("Error fetching token data:", error);
   // document.getElementById('tokenBalanceDisplay').innerText = "Error fetching token balance.";
}

}



loadPuDuFoContractDetails()








//--------------------------------------------------------------------------------------------------------------------------



//-----------------------------------------------------------------------------------------buy puduto------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
// Real-time calculation on user input - updates the USD and BNB as user inputs token amount
document.getElementById('PuDuFoamountToBuy').addEventListener('input', function () {
   //------------------------ get BNB current price to display approx for purchase ------------------------------
    const bnbUSDInDecimal = (PuDuFobnbUSD / 1e8).toFixed(2);
    console.log('PuDuFo bnbUSD: buy', bnbUSDInDecimal);

    const tokenAmountToBuy = parseFloat(this.value, 10);
   // const bnbAmount = parseFloat(this.value); // Get the entered BNB amount

    if (tokenAmountToBuy > 0 ) {
        const USDAmount = (tokenAmountToBuy * PuDuFoformattedTokenPrice).toFixed(2); // Calculate USD equivalent
        const BNBAmount = (tokenAmountToBuy * (PuDuFoformattedTokenPrice / bnbUSDInDecimal)).toFixed(5); // Calculate number of tokens

        document.getElementById('PuDuFobuy-btn').innerText = `Buy ${tokenAmountToBuy} PuDuTo Tokens`;
        document.getElementById('PuDuFoBNBamount').innerText = BNBAmount;
        document.getElementById('PuDuFousd-equivalent').innerText = `$${USDAmount}`;
    } else {
        document.getElementById('PuDuFoBNBamount').innerText = 0;
        document.getElementById('PuDuFousd-equivalent').innerText = '$0.00';
    }
});
//------------------------------------------------------------------------------------------------------------------
async function PuDuFobuyTokens() {
    const tokenAmount = document.getElementById('PuDuFoamountToBuy').value;
    if (!tokenAmount || tokenAmount <= 0) {
        showStatusMessage("Please enter a valid amount of tokens.", 'error');
        return;
    }
    const accounts = await web3.eth.getAccounts();
    const buyer = accounts[0];
    try {
        const tokenAmountInWei = web3.utils.toWei(tokenAmount, 'ether');
        const bnbAmount = await PuDuFocontractInstance.methods.calculateBNBAmount(tokenAmountInWei, await PuDuFocontractInstance.methods.getBNBPriceInUSD().call()).call();
        await PuDuFocontractInstance.methods.buyWithTokens(tokenAmountInWei).send({
            from: buyer,
            value: bnbAmount,
            gas: 500000,
            gasPrice: web3.utils.toWei('30', 'gwei') // Adjust as needed
        });
        showStatusMessage("Purchase successful!", 'success');
        updateInfo();
    } catch (error) {
        console.error("Error buying tokens:", error);
        showStatusMessage("Transaction failed!", 'error');
    }
}
//------------------------Listen for buy button to be clicked ------------------------------------
document.getElementById('PuDuFobuy-btn').addEventListener('click', PuDuFobuyTokens);
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------SELL puduto------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
// Real-time calculation on user input - updates the USD and BNB as user inputs token amount
document.getElementById('PuDuFoamountToSell').addEventListener('input', function () {
    //------------------------ get BNB current price to display approx for purchase ------------------------------
     const bnbUSDInDecimal = (PuDuFobnbUSD / 1e8).toFixed(2);
     console.log('bnbUSD: sell', bnbUSDInDecimal);
 
     const tokenAmountToSell = parseFloat(this.value, 10);
    // const bnbAmount = parseFloat(this.value); // Get the entered BNB amount
 
     if (tokenAmountToSell > 0 ) {
         const USDAmount = (tokenAmountToSell * PuDuFoformattedTokenSellPrice).toFixed(2); // Calculate USD equivalent
         const BNBAmount = (tokenAmountToSell * (PuDuFoformattedTokenSellPrice / bnbUSDInDecimal)).toFixed(5); // Calculate number of tokens
 
         document.getElementById('PuDuFosell-btn').innerText = `Sell ${tokenAmountToSell} PuDuTo Tokens`;
         document.getElementById('PuDuFoBNBSellamount').innerText = BNBAmount;
         document.getElementById('PuDuFoSellusd-equivalent').innerText = `$${USDAmount}`;
     } else {
         document.getElementById('PuDuFoBNBSellamount').innerText = 0;
         document.getElementById('PuDuFoSellusd-equivalent').innerText = '$0.00';
     }
 });

 async function PuDuFosellTokens() {
    const sellAmount = document.getElementById('PuDuFoamountToSell').value;
    if (!sellAmount || sellAmount <= 0) {
        showStatusMessage("Please enter a valid amount of tokens to sell.", 'error');
        return;
    }

    const accounts = await PuDuFoweb3.eth.getAccounts();
    const seller = accounts[0];

    try {
        const tokenAmountInWei = PuDuFoweb3.utils.toWei(sellAmount, 'ether');
        await PuDuFocontractInstance.methods.sellTokensForBNB(tokenAmountInWei).send({
            from: seller,
            gas: 500000
        });

        showStatusMessage("Sell successful!", 'success');
        updateInfo();
    } catch (error) {
        console.error("Error selling tokens:", error);
        showStatusMessage("Transaction failed!", 'error');
    }
}
//------------------------------Listen for sell button to be clicked------------------------------------------
document.getElementById('PuDuFosell-btn').addEventListener('click', PuDuFosellTokens);


 //------------------------------------------------------------------------------------------------------------------
 
 //-------------------------------------------------------------------------------------------------------------------------------------------
 //-------------------------------------------------------------------------------------------------------------------------------------------
 //-------------------------------------------------------------------------------------------------------------------------------------------
 
 









window.onload = async () => {
    await PuDuFofetchBNBPrice();      // Fetch the current BNB price
    await loadPuDuFoContractDetails(); // Initialize the contract and fetch token price
};

setInterval(PuDuFofetchBNBPrice, 60000);
setInterval(PuDuFoupdateInfo, 60000);

