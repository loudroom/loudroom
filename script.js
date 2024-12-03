/*-------------------------------fancy pants circle thingy------------------*/
const mask = document.querySelector('.mask');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Update the circular reveal area
  mask.style.clipPath = `circle(150px at ${x}px ${y}px)`;
});

document.addEventListener('mouseleave', () => {
  // Hide the background when the mouse leaves the screen
  mask.style.clipPath = 'circle(0px at 0 0)';
});



/*------------------------------Slider---------------------------*/
const swiper = new Swiper('.swiper', {
    loop: true, // Enables looping
    autoplay: {
        delay: 3000, // Delay in milliseconds
        disableOnInteraction: false, // Autoplay continues even after user interaction
    },
    effect: 'fade', // Smooth fade transition
    fadeEffect: {
        crossFade: true, // Crossfade between slides
    },
    pagination: {
        el: '.swiper-pagination', // Enable pagination bullets
        clickable: true, // Make bullets clickable
    },
    navigation: {
        nextEl: '.swiper-button-next', // Next button
        prevEl: '.swiper-button-prev', // Previous button 
    },
});

/*-------------------------------menu-----------------------------------*/
if (window.ethereum) {
  const web3 = new Web3(window.ethereum);

  const connectButton = document.querySelector(".connect-wallet");
  const walletAddressElement = document.getElementById("wallet-address");
  const ethBalanceElement = document.getElementById("eth-balance");
  const bnbBalanceElement = document.getElementById("bnb-balance");
  const polygonBalanceElement = document.getElementById("polygon-balance");
  const avaxBalanceElement = document.getElementById("avax-balance");

  // This function will update the UI with wallet address and all balances
  async function updateNetworkInfo() {
      const accounts = await web3.eth.requestAccounts(); // Request accounts
      const walletAddress = accounts[0]; // Get the first wallet address
      walletAddressElement.textContent = `Wallet Address: ${walletAddress}`;

      const balances = await getBalances(walletAddress); // Get balances for all networks
      
      // Update the UI with balances for all networks
      updateBalanceDisplay(balances);
  }

  // Function to get the balance for each blockchain (all networks)
  async function getBalances(walletAddress) {
      let ethBalance, bnbBalance, polygonBalance, avaxBalance;

      // Ethereum Network (ETH)
      const ethBalanceWei = await web3.eth.getBalance(walletAddress);
      ethBalance = web3.utils.fromWei(ethBalanceWei, 'ether');
      
      // Binance Smart Chain (BNB)
      const bnbWeb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
      const bnbBalanceWei = await bnbWeb3.eth.getBalance(walletAddress);
      bnbBalance = web3.utils.fromWei(bnbBalanceWei, 'ether');

      // Polygon Network (MATIC)
      const polygonWeb3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com/'));
      const polygonBalanceWei = await polygonWeb3.eth.getBalance(walletAddress);
      polygonBalance = web3.utils.fromWei(polygonBalanceWei, 'ether');

      // Avalanche Network (AVAX)
      const avaxWeb3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));
      const avaxBalanceWei = await avaxWeb3.eth.getBalance(walletAddress);
      avaxBalance = web3.utils.fromWei(avaxBalanceWei, 'ether');

      return {
          eth: ethBalance || 0,
          bnb: bnbBalance || 0,
          polygon: polygonBalance || 0,
          avax: avaxBalance || 0
      };
  }

  // Function to update the UI with the balances for each network
  function updateBalanceDisplay(balances) {
      // Display Ethereum balance
      ethBalanceElement.innerHTML = `
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="Ethereum Logo" width="30" />
          ETH: ${balances.eth}
      `;

      // Display Binance Smart Chain balance
      bnbBalanceElement.innerHTML = `
          <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg" alt="Binance Smart Chain Logo" width="30" />
          BNB: ${balances.bnb}
      `;

      // Display Polygon balance
      polygonBalanceElement.innerHTML = `
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Polygon_logo.png" alt="Polygon Logo" width="30" />
          MATIC: ${balances.polygon}
      `;

      // Display Avalanche balance
      avaxBalanceElement.innerHTML = `
          <img src="https://cryptologos.cc/logos/avalanche-avax-logo.svg" alt="Avalanche Logo" width="30" />
          AVAX: ${balances.avax}
      `;
  }

  // Handle wallet connection
  connectButton.addEventListener("click", async () => {
      try {
          await web3.eth.requestAccounts(); // Request accounts
          updateNetworkInfo(); // Update wallet address and all balances
      } catch (error) {
          console.error("User denied wallet connection", error);
      }
  });

  // Update info when the page loads
  window.addEventListener("load", async () => {
      // Check if user is already connected and update balances
      if (web3.eth.accounts.length > 0) {
          updateNetworkInfo();
      }
  });
} else {
  console.error("No Ethereum provider detected. Please install MetaMask.");
}

