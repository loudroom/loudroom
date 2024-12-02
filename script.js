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
window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is detected.');

    const connectWalletButton = document.getElementById('connectWalletButton');
    const walletAddressSpan = document.getElementById('walletAddress');

    connectWalletButton.addEventListener('click', async () => {
      try {
        // Request wallet connection
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();

        // Get wallet address and display it
        const address = await signer.getAddress();
        walletAddressSpan.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    });
  } else {
    alert('Please install MetaMask to use this feature.');
  }
});
