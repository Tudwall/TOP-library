// Declarations.
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

let myLibrary = [];

// Modal selectors.
const container = document.querySelector("#container");
const addBookBtn = document.querySelector("#add-book");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close");

// Form selectors.
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const readField = document.querySelector("#read");
const submitBtn = document.querySelector("#submit");

displayBooks();

// Event Listeners.
addBookBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

submitBtn.addEventListener("click", () => {
  if (formValidation()) {
    myLibrary.push(addBookToLibrary());
    displayBooks();
    saveBooks();
    modal.style.display = "none";
    clearForm();
  }
});

closeBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target == modal) modal.style.display = "none";
});

// Functions.
function addBookToLibrary() {
  let title = titleField.value;
  let author = authorField.value;
  let pages = Number(pagesField.value);
  let isRead = readField.checked;
  return new Book(title, author, pages, isRead);
}

function displayBooks() {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    createBookCard(myLibrary[i]);
  }
}

function createBookCard(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  bookContainer.setAttribute("data-i", myLibrary.indexOf(book));

  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement("p");
  bookPages.classList.add("book-pages");
  bookPages.textContent = `${book.pages} pages`;

  const bookRead = document.createElement("p");
  bookRead.classList.add("book-read");
  bookRead.textContent = checkIsRead(book.isRead);

  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-item-btn");
  delBtn.innerHTML = "&times;";
  addDeleteButtonListener(delBtn, bookContainer);

  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.classList.add("toggle-read-btn");
  toggleReadBtn.textContent = "Toggle read status";
  addToggleReadButtonListener(toggleReadBtn, book, bookRead);

  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(bookAuthor);
  bookContainer.appendChild(bookPages);
  bookContainer.appendChild(bookRead);
  bookContainer.appendChild(toggleReadBtn);
  bookContainer.appendChild(delBtn);
  container.appendChild(bookContainer);
}

function checkIsRead(isRead) {
  if (isRead) {
    return "Already read";
  } else {
    return "Not read yet";
  }
}

function addToggleReadButtonListener(button, book, bookRead) {
  button.addEventListener("click", () => {
    if (book.isRead) {
      book.isRead = false;
      bookRead.textContent = checkIsRead(book.isRead);
      saveBooks();
    } else {
      book.isRead = true;
      bookRead.textContent = checkIsRead(book.isRead);
      saveBooks();
    }
  });
}

function addDeleteButtonListener(button, card) {
  button.addEventListener("click", () => {
    const bookIndex = card.dataset.i;
    myLibrary.splice(bookIndex, 1);
    displayBooks();
    saveBooks();
  });
}

function formValidation() {
  if (titleField.value == "") {
    alert("Please enter the book's title.");
    titleField.focus();
    return false;
  }
  if (authorField.value == "") {
    alert("Please enter the author's name.");
    authorField.focus();
    return false;
  }
  if (pagesField.value == "") {
    alert("Please enter the pages number.");
    pagesField.focus();
    return false;
  }
  return true;
}

function clearForm() {
  titleField.value = "";
  authorField.value = "";
  pagesField.value = "";
  readField.checked = false;
}

function saveBooks() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getBooks() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary == null) myLibrary = [];
  displayBooks();
}

getBooks();
