import './style.css'

const input = document.getElementById("input-field");
const addToCart = document.getElementById("add-button");

addToCart.addEventListener('click', () => {
  console.log(input.value);
})



