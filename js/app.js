// Selecting the text
let itemText = document.querySelector("#itemText");

// Selecting add item button
let addItemBtn = document.querySelector("#addItemBtn");

// selecting items list
let items = document.querySelector(".list-group");

let itemsList;

let completedItems;

if (localStorage.getItem("items") === null) {
  itemsList = [];
} else {
  itemsList = JSON.parse(localStorage.getItem("items"));
}

if (localStorage.getItem("completedItems") === null) {
  completedItems = [];
} else {
  completedItems = JSON.parse(localStorage.getItem("completedItems"));
}

document.addEventListener("DOMContentLoaded", () => {
  itemsList.forEach((item) => {
    addItem(item);
  });
});

// add Item
addItemBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (itemText.value !== /\s/g) {
    addItem(itemText.value);
    itemsList.push(itemText.value);
    localStorage.setItem("items", JSON.stringify(itemsList));
    itemText.value = "";
    console.log(itemText.value);
  }
});

// add Item by pressing enter
itemText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addItem(itemText.value);
    itemsList.push(itemText.value);
    localStorage.setItem("items", JSON.stringify(itemsList));
    itemText.value = "";
  }
});

// Delete Item
items.addEventListener("click", deleteItem);

// Check Item
items.addEventListener("click", checkItem);

// add Item function
function addItem(text) {
  // Creating new list Item
  let newItem = document.createElement("li");

  // Creating new Checkbox
  let itemCheck = document.createElement("input");

  // Creating new delete button
  let itemDelete = document.createElement("button");

  // Creating new p element
  let itemInfo = document.createElement("p");

  // Adding styling to the new list Item
  newItem.className = "list-group-item d-flex";

  // Adding styling to the new checkbox
  itemCheck.className = "form-check-input me-2";

  // Setting checkbox type
  itemCheck.setAttribute("type", "checkbox");

  // Adding styling to the new delete button
  itemDelete.className = "btn btn-danger py-0 px-2";

  // Adding styling to the new p element based on if the item is completed or not
  if (completedItems.indexOf(text) !== -1) {
    itemInfo.className = "p-0 m-0 flex-grow-1 text-decoration-line-through";
    itemCheck.setAttribute("checked", "");
  } else {
    itemInfo.className = "p-0 m-0 flex-grow-1";
  }

  // Putting the p element in the list item
  newItem.appendChild(itemInfo);

  // Putting the delete button in the list item
  newItem.appendChild(itemDelete);

  // Putting the X in the delete button
  itemDelete.appendChild(document.createTextNode("X"));

  // Putting the checkbox in the p element
  itemInfo.appendChild(itemCheck);

  // Putting the text in the p element
  itemInfo.appendChild(document.createTextNode(text));

  // adding the new Item to the list
  items.appendChild(newItem);
}

// Delete Item Function
function deleteItem(e) {
  if (e.target.classList.contains("btn-danger")) {
    let selectedItem = e.target.parentElement.children[0].innerText;
    // delete item from local storage
    itemsList.splice(itemsList.indexOf(selectedItem), 1);
    // update local storage
    localStorage.setItem("items", JSON.stringify(itemsList));
    // update the UI
    items.removeChild(e.target.parentElement);
  }
}

// Check Item Function
function checkItem(e) {
  if (e.target.classList.contains("form-check-input")) {
    let paragraph = e.target.parentElement.classList;
    let paragraphText = e.target.parentElement.innerText;
    if (!paragraph.contains("text-decoration-line-through")) {
      // Add the item to the completed list
      completedItems.push(paragraphText);
      // update local storage
      localStorage.setItem("completedItems", JSON.stringify(completedItems));
      // update the UI
      paragraph.add("text-decoration-line-through");
    } else {
      // delete the item from the completed list
      completedItems.splice(completedItems.indexOf(paragraphText), 1);
      // update the local storage
      localStorage.setItem("completedItems", JSON.stringify(completedItems));
      // update the UI
      paragraph.remove("text-decoration-line-through");
    }
  }
}
