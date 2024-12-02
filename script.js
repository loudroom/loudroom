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
    const web3 = new Web3(window.ethereum) 

    try {
      await window.ethereum.request({ method: "eth_requestAccounts"})
      resolve(web3)
    } catch (error) {
      reject(error)
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectWalletButton").addEventListener("click", async () => {
    const web3 = await getWeb3()
  })
})
