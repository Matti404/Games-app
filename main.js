const gameContainer = document.querySelector(".game-container");
const searchInput = document.querySelector(".search__input");
const cartNumber = document.querySelector(".cart-number");
const hamburger = document.getElementById("hamburger");
const menuInfo = document.querySelector('.menu__info');
const navBar = document.querySelector(".info");
const moreGameBtn = document.getElementById("more");
const asideMenu = document.querySelector(".aside-menu")


// Fetch API

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4899ba6d80msh8dfc66190a08b9bp1eca1bjsn47644093a240",
    "X-RapidAPI-Host": "cheapshark-game-deals.p.rapidapi.com",
  },
};

let finalData = "";

async function loadData() {
  const res = await fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "4899ba6d80msh8dfc66190a08b9bp1eca1bjsn47644093a240",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
    );
    let data = await res.json();
    
    return data;
  }


  
  const shop = document.querySelector(".shop");
  const addToCartButtons = document.querySelectorAll(".game__btn");
  const buyButtons = document.querySelectorAll(".list__buy");
  const ulList = document.querySelector(".list");
  const navEl = document.querySelector(".menu__list")
  const liItem = document.querySelector(".list__item");
  const deleteBtn = document.querySelector(".list__delete");
  
  let i = 0;
  
  async function showGames() {
    let allGames = await loadData();
    console.log(allGames);
    allGames = allGames.slice(0, 8);
    cartNumber.classList.add("hide-number");
    allGames.forEach((values) => {
      const item = document.createElement("div");
      item.classList.add("game__div");
      item.innerHTML = `
      <img class="game__image" src=${values.thumbnail} />
      <h5 class="game__name">${values.title}</h5>
      <button class="game__btn" onclick='addToCart(${values.id})'>Add to cart</button>
      </div>`;
      gameContainer.appendChild(item);
    });
  }

  showGames()
  
  function clickedGame() {
    if (cartNumber.innerHTML == 1) {
      cartNumber.classList.remove("hide-number");
    }
  }
  
  let cart = [];
  
  async function addToCart(id) {
    let allGames = await loadData();
    
    if (cart.some((item) => item.id === id)) {
      alert("Game is already in shop list");
      
    } else {
      const item = allGames.find((product) => product.id === id);
      cart.push(item);
      
    // Add game li tag to shoping list

      const addedGameListItem = document.createElement("li");
      addedGameListItem.classList.add("list__item");
      const addedGameImage = document.createElement("img");
      
      cart.forEach((id) => {
        addedGameImage.setAttribute("src", id.thumbnail);
        addedGameImage.setAttribute("height", 70);
        addedGameImage.setAttribute("width", 70);
        addedGameListItem.appendChild(addedGameImage);
      });

      const addedGameButton = document.createElement("button");
      addedGameButton.classList.add("list__buy");
      addedGameButton.innerText = "Buy now";
    
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("list__delete");
      deleteBtn.innerText = "X";
      addedGameListItem.appendChild(addedGameButton);
      addedGameListItem.appendChild(deleteBtn);
      console.log(addedGameListItem);
      ulList.appendChild(addedGameListItem);

      // Delete games in shoping list
      
      deleteBtn.addEventListener("click", (e) => {
        if (e.target && e.target.classList == "list__delete") {
          cartNumber.innerHTML = --i;
          ulList.removeChild(addedGameListItem);
          cart.splice(e, 1)
          if (cartNumber.innerHTML == 0) {
          cartNumber.classList.add("hide-number");
        }
      }
    });

    console.log(cart)

  // check if user has bought a game then refresh a page

    addedGameButton.addEventListener('click', function() {
      if (confirm('Are you sure ?') == true) {
        
        alert(`Congrats, you have bought a ${item.title} game. Enjoy your playing :) `)
        setTimeout(function(){
          window.location.reload();
       }, 3000);
      }
    })
    cartNumber.innerHTML = ++i;
  }
  clickedGame();
}

//showGames();

let start = 8;
let end = 16;

const pageSize = 8

async function sliced() {
  let currentGames = await loadData();
  console.log(currentGames);
  
  currentGames = currentGames.slice(start, end);
  start = start + pageSize;
  end = end + pageSize;

  currentGames.forEach((values) => {
    const item = document.createElement("div");
    item.classList.add("game__div");
    item.innerHTML = `
    <img src=${values.thumbnail} height="200" width="156"/>
    <h5 class="game__name">${values.title}</h5>
    <button class="game__btn" onclick='addToCart(${values.id})'>Add to cart</button>
    </div>`;
    gameContainer.appendChild(item);
  });
}

// narrow search results after user types game title in input field

async function searchLetters() {
  gameContainer.innerHTML = "";
  const allGames = await loadData();
  let targ = searchInput.value;
  allGames.filter(on => {
    if (on.title.includes(targ) || 
    on.title.toLowerCase().includes(targ.toLowerCase())) {
      let filterGame = document.createElement("div");
          filterGame.classList.add("game__div");
          let filterImg = document.createElement("img");
          filterImg.setAttribute("src", on.thumbnail);
          filterImg.setAttribute("height", 200);
          filterImg.setAttribute("width", 156);
          
          let filterName = document.createElement("h5");
          filterName.classList.add("game__name");
          filterName.innerText = on.title;
          
          let filterGameBtn = document.createElement("button");
          filterGameBtn.classList.add("add-selected-btn");
          filterGameBtn.innerText = "Buy now";
          filterGameBtn.setAttribute("game", JSON.stringify(on));
          
          filterGame.appendChild(filterImg);
          filterGame.appendChild(filterName);
          filterGame.appendChild(filterGameBtn);
          
          gameContainer.appendChild(filterGame);

          // check if user has bought selected by him game then refresh a page

          filterGameBtn.addEventListener('click', function() {
            if (confirm('Are you sure ?') == true) {
              alert(`Congrats, you have bought a ${on.title} game. Enjoy your playing :) `)
              setTimeout(function(){
                window.location.reload();
            }, 3000);
        } 
      })
    }  
  })
}

// debounce function 

function debounce (callback, limit) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, limit);
  };
}

const debounceFinal = debounce(searchLetters, 2000);



// addEventListeners

menuInfo.addEventListener('click', () => {
  navBar.classList.toggle('show-navbar');
});

shop.addEventListener('click', () => {
  //ulList.classList.toggle('hide');
  ulList.classList.toggle('appear');
});

hamburger.addEventListener('click', () => {
  asideMenu.classList.toggle('appear');
});

document.querySelectorAll('.img').forEach(function (el) {
  el.addEventListener('click', function () {
    var src = this.getAttribute('src');
    el.src = src;
  });
});

moreGameBtn.addEventListener("click", sliced);

searchInput.addEventListener("change", debounceFinal);


// Draft

/*let games = [
  {name: 'gta', id: 1, price: 90, img: 'img1.jpg', url: "../games/gta5.html"},
  {name: 'naruto', id: 2, price: 100, img: 'img2.jpg', url: "../games/Naruto.html"}, 
  {name: 'kratos', id: 3, price: 50, img: 'img3.jpg', url: "../games/kratos.html"},
  {name: 'souls', id: 4, price: 24, img: 'img4.jpg', url: "../games/souls.html"},
  {name: 'persona', id: 5, price: 35, img: 'img5.jpg', url: "../games/persona.html"},
  {name: 'final', id: 6, price: 65, img: 'img6.jpg', url: "../games/final.html"},
  {name: 'witcher', id: 7, price: 18, img: 'img7.jpg', url: "../games/witcher.html"},
];*/

/*listData.map((el) => {
  newData.push({
    "title": el.title.split('_').map(word => {
      return word[0].toUpperCase() + word.substring(1)
    }).join(' '),
    "dataTypes": el.dataTypes
  })
})*/

/*const newData = []

async function spec () {
  const games = await loadData()

  games.map((el) => {
    let title = el.title.toLowerCase()
    return newData.push({
      ...el,
      title
    })
  })

  console.log(newData)
  
  }
  spec()/*




// Alert if user has bought a game

/*ulList.addEventListener('click', (e) => {
  if (e.target.classList.contains('list__buy')) {
    alert("Congratulations, you have bought a game");
  }
});*/

/*function createGameGrid() {
  for (let i = 0; i < games.length; i++) {
    let gameEl = document.createElement("div");
    gameEl.classList.add("game__div");
    let anchor = document.createElement("a");
    anchor.href = games[i].url;
    let gameImg = document.createElement("img");
    gameImg.setAttribute("src", games[i].img);
    gameImg.setAttribute("height", 200);

    let gameName = document.createElement("h5");
    gameName.classList.add("game__name");
    gameName.innerText = games[i].name;

    let gameText = document.createElement("p");
    gameText.classList.add("game__price");
    gameText.innerText = `price: ${games[i].price} pln`;

    let gameBtn = document.createElement("button");
    gameBtn.classList.add("game__btn");
    gameBtn.innerText = "Add to cart";
    gameBtn.setAttribute("game", JSON.stringify(games[i]));

    anchor.appendChild(gameImg);
    gameEl.appendChild(anchor);
    gameEl.appendChild(gameName);
    gameEl.appendChild(gameText);
    gameEl.appendChild(gameBtn);

    gameContainer.appendChild(gameEl);
  }
}

//createGameGrid()

// Adding number to shop icon whenever item is added to store

/*let i = 0;
cartNumber.classList.add('hide-number')
console.log(cartNumber.innerHTML);

function addingNumber() {
  
  cartNumber.innerHTML = ++i;
  if (cartNumber.innerHTML == 1) {
    cartNumber.classList.remove('hide-number');
  } 
}
//addingNumber()

// Adding game to store cart

const gamesAddedToCart = [];

const addGameToCart = (game) => {
  const addedGameListItem = document.createElement("li");
  addedGameListItem.classList.add("list__item");
  const addedGameImage = document.createElement("img");
  addedGameImage.setAttribute("src", game.img);
  addedGameImage.setAttribute("height", 70);
  const addedGameButton = document.createElement("button");
  addedGameButton.classList.add("list__buy");
  addedGameButton.innerText = "Buy now";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("list__delete");
  deleteBtn.innerText = "X";
  addedGameListItem.appendChild(addedGameImage);
  addedGameListItem.appendChild(addedGameButton);
  addedGameListItem.appendChild(deleteBtn);

  //gamesAddedToCart.push(game);
  ulList.appendChild(addedGameListItem);
  //ulList.classList.add('hide');
}*/
/*let filterGame = document.createElement('div');
filterGame.classList.add('game__div');
let filterImg = document.createElement('img');
 filterImg.setAttribute('src', values.thumbnail);
 filterImg.setAttribute('height', 200);
 filterImg.setAttribute('width', 156);
 
 let filterName = document.createElement('h5');
 filterName.classList.add('game__name');
 filterName.innerText = values.title;
 
 let filterGameBtn = document.createElement('button');
 filterGameBtn.classList.add('add-selected-btn');
 filterGameBtn.innerText = 'Add to cart';
 filterGameBtn.setAttribute('game', JSON.stringify(values));
 
 filterGame.appendChild(filterImg);
 filterGame.appendChild(filterName);
 filterGame.appendChild(filterGameBtn);

 gameContainer.appendChild(filterGame);*/

// Search input by tapping title name

/*const [{name: val1}, {name: val2}, {name: val3}, {name: val4}, {name: val5}, {name: val6}, {name: val7}] = games;

//const [...{name: val}] = games;
const [...{title: val}] = loadData()
const titles = [val1, val2, val3, val4, val5, val6, val7];


let firstLetters = titles.map(res => {
  return res.charAt(0).toUpperCase() + res.slice(1).toLowerCase();
})
console.log(firstLetters)*/

/*function lettersResult (e) {
  
  gameContainer.innerHTML = ''
  if (e.target.value.length === 0) {
    //createGameGrid()
    loadData()
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
}*/
