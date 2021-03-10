import './assets/styles/main.scss';
require('./index.html');

///////////////////////////////////
/////// Global variabiles and initializations

const url =
  'https://api.unsplash.com/search/photos?client_id=8grPsf21wjc9xseN23NcxAFlphVciNv-OgbiMokOnKU&query=pizza';

let imagesFromAPI = {};

let products = {
  numberOfProducts: 0,
  productsTitles: [[0, 'none']],
};

/////////////////////////////
///// DOM selection
////////////////////////////

let selectDOM = {
  mainPageSection: document.querySelector('.mainPageSection'),
  cssLoader: document.querySelector('.lds-roller'),
  homeBtn: document.getElementById('homeBtn'),
  aboutPageBtn: document.getElementById('aboutPageBtn'),
  contactPageBtn: document.getElementById('contactPageBtn'),
  mainPageSection: document.getElementById('mainPageSection'),
  addToCartBtn: document.getElementById('addToCartBtn'),
  backToMainListBtn: document.getElementById('backToMainList'),
  aboutPage: document.querySelector('.aboutPage'),
  contactPage: document.querySelector('.contactPage'),
  gridContainer: document.querySelector('.gridContainer'),
  gridElements: document.querySelectorAll('.gridElement'),
  maximizeElement: document.querySelector('.maximizeElement'),
};

let homeContent = selectDOM.gridContainer.innerHTML;

/////////////////////////////
///// Functions
////////////////////////////

// API functions

async function getImagesFromAPI() {
  selectDOM.mainPageSection.classList.add('hidden');
  selectDOM.cssLoader.classList.remove('hidden');
  const response = await fetch(url);
  imagesFromAPI = await response.json();
  if (imagesFromAPI === null) {
    imagesFromAPI = {};
  }
  selectDOM.cssLoader.classList.add('hidden');
  selectDOM.mainPageSection.classList.remove('hidden');
  // console.log(imagesFromAPI);
  populateGridFromAPI(imagesFromAPI);
}

// Grid populating functions

function populateGridFromAPI(imagesFromAPI) {
  let gridListStr = '';
  for (let i = 0; i < imagesFromAPI.results.length; i++) {
    gridListStr += `
    <div class="gridElement">
      <img src="${imagesFromAPI.results[i].urls.small}" alt="pizza-image">
      <h3>${imagesFromAPI.results[i].user.name}</h3>
      <p>${imagesFromAPI.results[i].alt_description}</p>
    </div>
    `;
  }
  selectDOM.gridContainer.innerHTML = gridListStr;
  eventListenersToList();
}

/// Navigation functions

function showHomePage() {
  selectDOM.aboutPage.classList.add('hidden');
  selectDOM.contactPage.classList.add('hidden');
  selectDOM.gridContainer.innerHTML = homeContent;
  selectDOM.mainPageSection.classList.remove('hidden');
  populateGridFromAPI(imagesFromAPI);
  eventListenersToList();
}

function showAboutPage() {
  selectDOM.mainPageSection.classList.add('hidden');
  selectDOM.contactPage.classList.add('hidden');
  selectDOM.aboutPage.classList.remove('hidden');
}

function showContactPage() {
  selectDOM.mainPageSection.classList.add('hidden');
  selectDOM.aboutPage.classList.add('hidden');
  selectDOM.contactPage.classList.remove('hidden');
}

function maximizeElement(item) {
  console.log(item);
  console.log('Imaginea ar fi aici' + item.children[0].innerHTML);
  let imgUrl = item.children[0].attributes[0].value;
  let title = item.children[1].innerHTML;
  let description = item.children[2].innerHTML;
  let str = `
  <div class="maximizeElement ">
    <img src="${imgUrl}" alt="pizza-image">
    <div class="description">
      <h3 class="descriptionTitle">${title}</h3>
      <div class="descriptionAndBtn">
        <p>${description}</p>
        <input type="button" value="Add to Cart" class="addToCartBtn" id="addToCartBtn">

        <input type="button" value="Back main list"  id="backToMainList" onclick="showHomePage()">
      </div>
    </div>
  </div>
  `;
  selectDOM.gridContainer.innerHTML = str;
  document.querySelector('#addToCartBtn').addEventListener('click', (e) => {
    // console.log(e);
    addToCart(e);
  });
  document
    .querySelector('#backToMainList')
    .addEventListener('click', showHomePage);
}
//
// Cart populating functions

function addToCart(e) {
  let productName = e.path[2].firstElementChild.innerText;
  let productsTitlesArr = products.productsTitles.flat();
  if (productsTitlesArr.includes(productName)) {
    products.numberOfProducts++;
    let index;
    for (let i = 1; i < products.productsTitles.length; i++) {
      if (products.productsTitles[i][1] === productName) {
        index = i;
        break;
      }
    }
    products.productsTitles[index][0]++;
  } else {
    products.numberOfProducts++;
    products.productsTitles.push([1, productName]);
    let index = products.productsTitles.length - 1;
  }
  // console.log(products);
  writeToCart(products);
}

function writeToCart(products) {
  let cartTotalNumber = document.querySelector('#cartQuantity');
  let cartTracker = document.querySelector('.cartTracker');
  let productsList = '';
  if (products.numberOfProducts === 0) {
    cartTracker.innerText = '<p>Cart is empty</p>';
  } else {
    cartTotalNumber.innerText = `Cart (${products.numberOfProducts})`;
    productsList = buildCartList(products.productsTitles);
    cartTracker.innerHTML = productsList;
  }
}

function buildCartList(productsList) {
  let str = '';
  for (let i = 1; i < productsList.length; i++) {
    str += `
      <p class="cartItem">(${productsList[i][0]}) ${productsList[i][1]}</p>
    `;
  }
  return str;
}

/////////////////////////////
///// Event listeners
////////////////////////////

window.addEventListener('load', getImagesFromAPI);

selectDOM.homeBtn.addEventListener('click', showHomePage);

selectDOM.aboutPageBtn.addEventListener('click', showAboutPage);

selectDOM.contactPageBtn.addEventListener('click', showContactPage);

function eventListenersToList() {
  document.querySelectorAll('.gridElement').forEach((item) => {
    // console.log(`Elementul din grid este: ${item}`);
    item.addEventListener('click', () => {
      maximizeElement(item);
    });
  });
}
