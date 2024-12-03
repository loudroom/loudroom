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
function toggleMenu() {
  const menu = document.getElementById('menu');
  if (menu.style.left === '0px') {
    menu.style.left = '-250px';
  } else {
    menu.style.left = '0px';
  }
}


/*----------------------------- Connect wallet -----------------------*/
/*----------------------------- Connect wallet -----------------------*/




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

    console.log("Fetching balances for wallet:", walletAddress); // Debugging

    // Fetch balances for native tokens
    const balances = await getBalances(walletAddress);

    console.log("Native token balances:", balances); // Debugging

    // Update the UI with balances for all networks
    updateBalanceDisplay(balances);

    // Update the button text to show the connected network
    await updateConnectButtonText();
  }

  // Function to get the balance for each blockchain (native tokens)
  async function getBalances(walletAddress) {
    let ethBalance, bnbBalance, polygonBalance, avaxBalance;

    // Ethereum Network (ETH)
    const ethBalanceWei = await web3.eth.getBalance(walletAddress);
    ethBalance = web3.utils.fromWei(ethBalanceWei, 'ether');
    ethBalance = parseFloat(ethBalance).toFixed(4);

    // Binance Smart Chain (BNB)
    const bnbWeb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
    const bnbBalanceWei = await bnbWeb3.eth.getBalance(walletAddress);
    bnbBalance = web3.utils.fromWei(bnbBalanceWei, 'ether');
    bnbBalance = parseFloat(bnbBalance).toFixed(4);

    // Polygon Network (MATIC)
    const polygonWeb3 = new Web3(new Web3.providers.HttpProvider('https://polygon-rpc.com/'));
    const polygonBalanceWei = await polygonWeb3.eth.getBalance(walletAddress);
    polygonBalance = web3.utils.fromWei(polygonBalanceWei, 'ether');
    polygonBalance = parseFloat(polygonBalance).toFixed(4);

    // Avalanche Network (AVAX)
    const avaxWeb3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));
    const avaxBalanceWei = await avaxWeb3.eth.getBalance(walletAddress);
    avaxBalance = web3.utils.fromWei(avaxBalanceWei, 'ether');
    avaxBalance = parseFloat(avaxBalance).toFixed(4);

    return {
      eth: ethBalance || 0,
      bnb: bnbBalance || 0,
      polygon: polygonBalance || 0,
      avax: avaxBalance || 0
    };
  }

  // Function to update the UI with the balances for native tokens
  function updateBalanceDisplay(balances) {
    // Display Ethereum native balance
    ethBalanceElement.innerHTML = `ETH: ${balances.eth}`;
    // Display Binance Smart Chain native balance
    bnbBalanceElement.innerHTML = `BNB: ${balances.bnb}`;
    // Display Polygon native balance
    polygonBalanceElement.innerHTML = `MATIC: ${balances.polygon}`;
    // Display Avalanche native balance
    avaxBalanceElement.innerHTML = `AVAX: ${balances.avax}`;
  }

  // Function to get the connected network's name and update the button text
  async function updateConnectButtonText() {
    const networkId = await web3.eth.net.getId();
    let networkName = '';

    // Check network and set name accordingly
    switch (networkId) {
      case 1:
        networkName = 'Ethereum';
        break;
      case 56:
        networkName = 'Binance Smart Chain';
        break;
      case 137:
        networkName = 'Polygon';
        break;
      case 43114:
        networkName = 'Avalanche';
        break;
      case 250:
        networkName = 'Fantom';
        break;
      case 42161:
        networkName = 'Arbitrum';
        break;
      case 100:
        networkName = 'xDai';
        break;
      case 128:
        networkName = 'HECO';
        break;
      case 42220:
        networkName = 'Celo';
        break;
      default:
        networkName = `Unknown network (ID: ${networkId})`;
    }

    // Update the connect button text with the network name
    connectButton.textContent = `Connected to ${networkName}`;
  }

  // Event listener for the connect wallet button
  connectButton.addEventListener('click', async () => {
    await updateNetworkInfo(); // Fetch and display network info
  });
} else {
  console.log('Ethereum provider not found. Please install MetaMask.');
}
