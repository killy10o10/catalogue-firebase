import './style.scss';
import { initializeApp } from 'firebase/app';
import  {getDatabase, ref, push, onValue, remove } from "firebase/database";

const appSettings = {
  databaseURL:
    'https://playground-7f7f7-default-rtdb.europe-west1.firebasedatabase.app/',
};

const itemList = document.getElementById('item-list');
const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, 'movies');

onValue(moviesInDB, function (snapshot) {
  if(snapshot.exists()) {
    const moviesList = Object.entries(snapshot.val());
    clearUL();
    moviesList.forEach((movie) => {
      addMoviesToDOM(movie);
    });
  }
  else{
    itemList.innerHTML = "No items here... yet"
  }

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
  newListEl.textContent = item[1];
  itemList.append(newListEl);
  let itemID = item[0]
  newListEl.addEventListener("dblclick", () => {
    let itemToBeDeleted = ref(database, `movies/${itemID}`);
    remove(itemToBeDeleted);
  })
};
