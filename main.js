import './style.scss';
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

const appSettings = {
  databaseURL: "https://playground-7f7f7-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)

console.log(app)

const input = document.getElementById('input-field');
const addToCart = document.getElementById('add-button');

addToCart.addEventListener('click', () => {
  console.log(input.value);
});
