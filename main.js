import './style.scss';
import { initializeApp } from 'firebase/app';
import  {getDatabase, ref, push, onValue } from "firebase/database";

const appSettings = {
  databaseURL:
    'https://playground-7f7f7-default-rtdb.europe-west1.firebasedatabase.app/',
};

const itemList = document.getElementById('item-list');
const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, 'movies');

onValue(moviesInDB, function (snapshot) {
  const moviesList = Object.values(snapshot.val());
  clearUL();
  moviesList.forEach((movie) => {
    addMoviesToDOM(movie);
  });
});

const input = document.getElementById('input-field');
const addToCart = document.getElementById('add-button');

addToCart.addEventListener('click', () => {
  let inputValue = input.value;
  if (inputValue.length !== 0) {
    push(moviesInDB, inputValue);
    console.log(`${inputValue} added to database`);
    input.value = ""
  } else {
    console.log('Please eneter a valid movie title');
  }
});


const clearUL = () => itemList.innerHTML = "";
const addMoviesToDOM = (item) => {
  const newListEl = document.createElement("li");
  newListEl.textContent = item;
  itemList.append(newListEl);
};
