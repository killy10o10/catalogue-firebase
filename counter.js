const addItemsToDOM = (item) => {
  const newItemEl = document.createElement("li");
  const itemNameEl = document.createElement("span");
  const itemAmountEl = document.createElement("span");

  itemNameEl.textContent = item[1];
  itemAmountEl.textContent = "0"; // Set the default amount to 0

  newItemEl.append(itemNameEl);
  newItemEl.append(document.createTextNode(" - "));
  newItemEl.append(itemAmountEl);
  itemList.append(newItemEl);

  let itemID = item[0];

  onValue(ref(database, `amount/${itemID}`), (snapshot) => {
    if (snapshot.exists()) {
      const itemAmount = snapshot.val();
      itemAmountEl.textContent = itemAmount;
    }
  });

  newItemEl.addEventListener("dblclick", () => {
    const itemRef = ref(database, `items/${itemID}`);
    const amountRef = ref(database, `amount/${itemID}`);

    database.runTransaction((transaction) => {
      return transaction.get(itemRef).then((itemSnapshot) => {
        if (itemSnapshot.exists()) {
          // Get the current amount of the item
          const currentAmount = itemSnapshot.val();

          // Get the amount ref and set its value to null
          const amountSnapshot = transaction.get(amountRef);
          transaction.update(amountRef, null);

          // Set the item ref's value to null
          transaction.update(itemRef, null);

          console.log(`Item ${item[1]} with amount ${currentAmount} removed successfully`);
        } else {
          console.log(`Item ${itemID} does not exist`);
        }
      });
    }).then(() => {
      // Remove the item from the DOM
      newItemEl.remove();
    }).catch((error) => {
      console.error(`Transaction failed: ${error}`);
    });
  });
};
