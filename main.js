let games = [
  {name: 'gta', id: 1, price: 90, img: 'img1.jpg', url: "../games/gta5.html"},
  {name: 'naruto', id: 2, price: 100, img: 'img2.jpg', url: "../games/Naruto.html"}, 
  {name: 'kratos', id: 3, price: 50, img: 'img3.jpg', url: "../games/kratos.html"},
  {name: 'souls', id: 4, price: 24, img: 'img4.jpg', url: "../games/souls.html"},
  {name: 'persona', id: 5, price: 35, img: 'img5.jpg', url: "../games/persona.html"},
  {name: 'final', id: 6, price: 65, img: 'img6.jpg', url: "../games/final.html"},
  {name: 'witcher', id: 7, price: 18, img: 'img7.jpg', url: "../games/witcher.html"},
];

console.log(games);

//let games = []

//const boxContainer = document.querySelector('.box-container');
const gameContainer = document.querySelector('.game-container');
const searchInput = document.querySelector('.search');
const cartNumber = document.querySelector('.cart-number');
const hamburger = document.getElementById('hamburger');
const navBar = document.querySelector('.info');
const moreGameBtn = document.getElementById('more')

console.log('----');


// Create div games

function createGameGrid () {

for (let i = 0; i < games.length; i++) {
  let gameEl = document.createElement('div');
    gameEl.classList.add('game__div');
  let anchor = document.createElement('a');
  anchor.href = games[i].url;
  let gameImg = document.createElement('img');
  gameImg.setAttribute('src', games[i].img);
  gameImg.setAttribute('height', 200);

  let gameName = document.createElement('h5');
  gameName.classList.add('game__name');
  gameName.innerText = games[i].name;

  let gameText = document.createElement('p');
  gameText.classList.add('game__price');
  gameText.innerText = `price: ${games[i].price} pln`;


  let gameBtn = document.createElement('button');
  gameBtn.classList.add('game__btn');
  gameBtn.innerText = 'Add to cart';
  gameBtn.setAttribute('game', JSON.stringify(games[i]));

  anchor.appendChild(gameImg);
  gameEl.appendChild(anchor);
  gameEl.appendChild(gameName);
  gameEl.appendChild(gameText);
  gameEl.appendChild(gameBtn);
  
  gameContainer.appendChild(gameEl);

}
}
createGameGrid()

////////////////////////////////////////////////

// Tu był wcześniej fragent search bar input

 //

const shop = document.querySelector('.shop');
const addToCartButtons = document.querySelectorAll('.game__btn');
const buyButtons = document.querySelectorAll('.list__buy');
const ulList = document.querySelector('.list');
const liItem = document.querySelector('.list__item');
const deleteBtn = document.querySelector('.list__delete');


// Adding number to shop icon whenever item is added to store

let i = 0;
cartNumber.classList.add('hide-number')
console.log(cartNumber.innerHTML);

function addingNumber() {
  
  cartNumber.innerHTML = ++i;
  if (cartNumber.innerHTML == 1) {
    cartNumber.classList.remove('hide-number');
  } 
}

// Adding game to store cart

const gamesAddedToCart = [];

const addGameToCart = (game) => {

  const addedGameListItem = document.createElement('li');
  addedGameListItem.classList.add('list__item');
  const addedGameImage = document.createElement('img');
  addedGameImage.setAttribute('src', game.img);
  addedGameImage.setAttribute('height', 70);
  const addedGameButton = document.createElement('button');
  addedGameButton.classList.add('list__buy');
  addedGameButton.innerText = 'Buy now';
  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('list__delete')
  deleteBtn.innerText = 'X';
  addedGameListItem.appendChild(addedGameImage);
  addedGameListItem.appendChild(addedGameButton);
  addedGameListItem.appendChild(deleteBtn);
   
  gamesAddedToCart.push(game);
  ulList.appendChild(addedGameListItem);
  ulList.classList.add('hide');
}


// Clicking on button creates li and number

addToCartButtons.forEach(button => {
  
  button.addEventListener('click', (e) => {
    const game = JSON.parse(e.currentTarget.attributes.game.value);
    addingNumber()
    addGameToCart(game);
  });
 });

// remove game with every click

function deleteLi (e) {
  const ulList = document.querySelector('.list');
  const liItem = document.querySelector('.list__item');
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('list__delete');

  if (e.target && e.target.classList == 'list__delete') {
    ulList.removeChild(liItem);
    cartNumber.innerHTML = --i;
    if (cartNumber.innerHTML == 0){
      cartNumber.classList.add('hide-number');
    }
  } 
}

document.addEventListener('click', deleteLi);




searchInput.addEventListener('change', lettersResult)

const [{name: val1}, {name: val2}, {name: val3}, {name: val4}, {name: val5}, {name: val6}, {name: val7}] = games;

//const [...{name: val}] = games;

const titles = [val1, val2, val3, val4, val5, val6, val7];


let firstLetters = titles.map(res => {
  return res.charAt(0).toUpperCase() + res.slice(1).toLowerCase();
})
console.log(firstLetters)


function lettersResult (e) {
  
  gameContainer.innerHTML = ''
  if (e.target.value.length === 0) {
    createGameGrid()
  } else {
    for (let i = 0; i < firstLetters.length; i++) {
      //let character = e.target.value;
    
       if (e.target.value == firstLetters[i] || e.target.value == firstLetters[i].toLowerCase())  {
        // e.keyCode = 13 &&
        let filterGame = document.createElement('div');
        filterGame.classList.add('game__div');
        let filterImg = document.createElement('img');
        filterImg.setAttribute('src', games[i].img);
        filterImg.setAttribute('height', 200);
        
        let filterName = document.createElement('h5');
        filterName.classList.add('game__name');
        filterName.innerText = games[i].name;
        
        let filterText = document.createElement('p');
        filterText.classList.add('game__price');
        filterText.innerText = `price: ${games[i].price} pln`;
        
        let filterGameBtn = document.createElement('button');
        filterGameBtn.classList.add('add-selected-btn');
        filterGameBtn.innerText = 'Add to cart';
        filterGameBtn.setAttribute('game', JSON.stringify(games[i]));
        
        filterGame.appendChild(filterImg);
        filterGame.appendChild(filterName);
        filterGame.appendChild(filterText);
        filterGame.appendChild(filterGameBtn);
        
        gameContainer.appendChild(filterGame);
        
        //console.log(games[i].name); 
        
        filterGameBtn.addEventListener('click', function() {
          if (confirm('Are you sure ?') == true) {
            //alert('Done')
            alert(`Congrats, you have bought ${games[i].name} game. Enjoy your playing.`)
            setTimeout(function(){
              window.location.reload();
           }, 4000);
          }
          
        })
  } 
  }
}
}

// addEventListeners

hamburger.addEventListener('click', () => {
navBar.classList.toggle('show-navbar');
});

shop.addEventListener('click', () => {
  //list.classList.toggle('appear');
  ulList.classList.toggle('hide');
  //ulList.classList.toggle('make');
});

document.querySelectorAll('.img').forEach(function(el){
  el.addEventListener('click', function(){
      var src = this.getAttribute('src');
      el.src = src;
    });
});

// Alert if user has bought a game

ulList.addEventListener('click', (e) => {
  if (e.target.classList.contains('list__buy')) {
    alert('Congratulations, you have bought a game')
  }
})
 
// promise
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4899ba6d80msh8dfc66190a08b9bp1eca1bjsn47644093a240',
		'X-RapidAPI-Host': 'cheapshark-game-deals.p.rapidapi.com'
	}
};

/*fetch('https://cheapshark-game-deals.p.rapidapi.com/games?title=final%20fantasy&limit=10', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));*/


/*moreGameBtn.addEventListener('click', function () {
  fetch('https://cheapshark-game-deals.p.rapidapi.com/games?title=god%20of%20war&exact=2&limit=10', options)
	.then(response => response.json())
  
  .then(res => {
    let data1 = "";
    
    res = res.slice (0, 4);

    res.map((values) => {

      data1 += `<div class="game__div">
      <img src=${values.thumb}, height=200, width=156/>
      <h5 class="game__name">${values.external}</h5>
      <p class="game__price"> price: ${values.cheapest} pln</p>
      <button class="game__btn">Add to cart</button>
    </div>`
  
    })
    //document.getElementById("cards").innerHTML = data1;
  gameContainer.insertAdjacentHTML('beforeend', data1);
  
  }).catch(err => {
    console.log(err)
  })
})*/

moreGameBtn.addEventListener('click', finalResult);

 async function loadData () {
  
    //const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
    //const url = ('https://cheapshark-game-deals.p.rapidapi.com/games?title=final%20fantasy&limit=10', options);
    const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc',
        {
	        method: 'GET',
	        headers: {
		      'X-RapidAPI-Key': '4899ba6d80msh8dfc66190a08b9bp1eca1bjsn47644093a240',
		      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	        }
        }
  );
  const data = await res.json(); 
  return data;   
}
//{mode: "no-cors"}


function finalResult() {
 
  loadData()
  .then((res) => {
    console.log(res)
  
  let data1 = "";
    
  res = res.slice (0, 5);

  res.map((values) => {

    data1 += `<div class="game__div">
      <img src=${values.thumbnail} height="200" width="156"/>
      <h5 class="game__name">${values.title}</h5>
      <p class="game__price"> price: ${values.cheapest} pln</p>
      <button class="game__btn">Add to cart</button>
    </div>`

 })
 //document.getElementById("cards").innerHTML = data1;
 gameContainer.insertAdjacentHTML('beforeend', data1);
 
})

.catch((err) => {
  console.log(err)
})
}







//gameBtn.addEventListener('click', function () {
  /*fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
  //fetch('https://www.mmobomb.com/api1/games', {$mode: 'no-cors'})//
  
  .then(response => response.json())
  
  .then(res => {
    let data1 = "";
    
    res = res.slice (0, 4);

    res.map((values) => {

      data1 += `<div class="create-div">
        <img src=${values.url}, height=200, width=156/>
        <h5 class="game__name">${values.title}</h5>
        <button class="game__btn">Add to cart</button>
      </div>`
  
    })
    //document.getElementById("cards").innerHTML = data1;
  boxContainer.insertAdjacentHTML('beforeend', data1);
  
  }).catch(err => {
    console.log(err)
  })
})*/


/*moreGameBtn.addEventListener('click', finalResult);

 async function loadData () {
  
    //const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
    const url = 'https://www.mmobomb.com/api1/games';
    const res = await fetch(url);
    const data = await res.json(); 
    return data;
    
}
//{mode: "no-cors"}


function finalResult() {
 
  loadData().then((res) => {
  let data1 = "";
    
  res = res.slice (0, 4);

  res.map((values) => {

    data1 += `<div class="game__div">
      <img src=${values.url}, height=200, width=156/>
      <h5 class="game__name">${values.title}</h5>
      <button class="game__btn">Add to cart</button>
    </div>`
 })
 //document.getElementById("cards").innerHTML = data1;
 gameContainer.insertAdjacentHTML('beforeend', data1);
 
})

.catch((err) => {
  console.log(err)
})
}*/


    


















