const { default: Web3 } = require("web3");

let web3Modal;
let provider;
let selectedAccount;
let web3;



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

/*----------------------- Connect wallet ------------------------------------*/

const getWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum); // Initialize Web3

    try {
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectWalletButton").addEventListener("click", async (target) => {
    try {
      const web3 = await getWeb3();  // Get Web3 instance
      const walletAddress = await web3.eth.getAccounts();  // Fetch wallet addresses
      const walletBalanceInWei = await web3.eth.getBalance(walletAddress[0]); // Get balance in Wei
      const walletBalanceInEth = Web3.utils.fromWei(walletBalanceInWei, "ether");  // Convert balance to ETH

      // Hide the button after connection
      target.setAttribute("hidden", "hidden");

      // Update the wallet address and balance in the UI
      document.getElementById("wallet_address").innerText = walletAddress[0];  // Display first address
      document.getElementById("wallet_balance").innerText = walletBalanceInEth;  // Display balance

      // Reveal wallet info section
      document.getElementById("wallet_info").removeAttribute("hidden");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  });
});
