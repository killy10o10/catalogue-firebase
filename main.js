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
const itemsInDB = ref(database, 'items');
const amountInDB = ref(database, 'amount')


onValue(itemsInDB, function (snapshot) {
  if(snapshot.exists()) {
    const itemsList = Object.entries(snapshot.val());
    clearUL();
    itemsList.forEach((item) => {
      addItemsToDOM(item);
    });
  }
  else{
    itemList.innerHTML = "No items here... yet"
  }

});

const itemInput = document.getElementById('item-input');
const amountInput = document.getElementById('amount-input')
const addToCart = document.getElementById('add-button');

addToCart.addEventListener('click', () => {
  let itemInputValue = itemInput.value;
  let amountInputValue = amountInput.value
  if (itemInputValue.length !== 0 && amountInputValue.length !== 0) {
    push(itemsInDB, itemInputValue);
    push(amountInDB, Number(amountInputValue));
    console.log(`${itemInputValue} and ${amountInputValue} added to database`);
    itemInput.value = ""
    amountInput.value = ""
  } else {
    console.log('Please eneter a shopping list item and price');
  }
});


const clearUL = () => itemList.innerHTML = "";
const addItemsToDOM = (item) => {
  const newListEl = document.createElement("li");
  newListEl.textContent = item[1];
  itemList.append(newListEl);
  let itemID = item[0]
  newListEl.addEventListener("dblclick", () => {
    let itemToBeDeleted = ref(database, `items/${itemID}`);
    remove(itemToBeDeleted);
  })
};
