import './style.scss';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://playground-7f7f7-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, 'movies');

console.log(database);

const input = document.getElementById('input-field');
const addToCart = document.getElementById('add-button');

addToCart.addEventListener('click', () => {
  let inputValue = input.value;
  if (inputValue.length !== 0) {
    push(moviesInDB, inputValue);
    console.log(`${inputValue} added to database`);
  } else {
    console.log('Please eneter a valid movie title');
  }
});
