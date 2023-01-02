const btnBack = document.getElementById('btn-previous');
const btnPurchase = document.getElementById('btn-purchase');
const cartNumber = document.querySelector('.cart-number');
const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.navbar');

btnBack.onclick = function() {
     window.location.href = 'http://127.0.0.1:5501/index.html';
}

let i = 0;

function addingNumber () {
     cartNumber.innerHTML = ++i
}

btnPurchase.addEventListener('click', function (e) {
     addingNumber(e);
     cartNumber.classList.add('show');
}, false);

hamburger.addEventListener('click', () => {
     navBar.classList.toggle('show-nav');
});

