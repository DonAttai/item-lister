const form = document.querySelector("#form");
const itemList = document.querySelector("#itemList");
const filter = document.querySelector("#filter");
let input = document.querySelector("#item");

let items = [];
//Add event to form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addItem(input.value);
});

//Add event to listItems
itemList.addEventListener("click", removeItem);

//Add event to filter
filter.addEventListener("keyup", filterItems);

//function to add item

function addItem(newItem) {
  if (newItem == "") {
    showAlert("Please, enter an item", "danger");
  } else {
    const newItem = {
      id: Date.now().toString(),
      item: input.value,
    };
    items.push(newItem);
    addTolocalStorage(items);
    showAlert("Item was successfully added", "success");
    input.value = "";
  }
}

function renderItem(items) {
  itemList.innerHTML = "";

  items.forEach((item) => {
    //create li element
    const li = document.createElement("li");

    //add classes to li element
    li.classList.add("list-group-item");
    // li.append();

    //create deleteButton
    const deleteButton = document.createElement("button");
    deleteButton.append(document.createTextNode("X"));
    deleteButton.classList.add("btn", "btn-sm", "btn-danger", "delete");
    deleteButton.style.float = "right";

    //append newItem & deleteButton to li element
    li.append(document.createTextNode(item.item), deleteButton);
    li.setAttribute("data-id", item.id);

    //append li to ul
    itemList.append(li);
  });
}

//add item to localStorage

function addTolocalStorage(items) {
  localStorage.setItem("items", JSON.stringify(items));
  renderItem(items);
}

//get items from localstorage

function getFromLocalStorage() {
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    items = JSON.parse(storedItems);
    renderItem(items);
  }
}

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className} p-1 m-0 my-3`;
  div.append(document.createTextNode(message));
  const card = document.querySelector(".card");
  card.insertBefore(div, form);

  //
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}

getFromLocalStorage();

//delete Item

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  addTolocalStorage(items);
}
//function to delete item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Delete Item?")) {
      const id = e.target.parentElement.getAttribute("data-id");
      deleteItem(id);
    }
  }
}

//Filter Items
function filterItems(e) {
  //Convert input text to lowercase
  input = e.target.value.toLowerCase();

  //Get list items
  let items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    let itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(input) > -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
