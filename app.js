// Declarations.
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
      return `${this.name} by ${this.author}, ${this.pages} pages, ${this.isRead}`;
    };
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const FOTR = new Book(
  "The Fellowship of the Ring",
  "J.R.R. Tolkien",
  736,
  true
);
const TT = new Book("The Two Towers", "J.R.R. Tolkien", 608, true);
const ROTK = new Book("The Return of the King", "J.R.R. Tolkien", 736, true);

let myLibrary = [theHobbit, FOTR, TT, ROTK];

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
  myLibrary.push(addBookToLibrary());
  displayBooks();
  modal.style.display = "none";
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
    createBook(myLibrary[i]);
  }
}

function createBook(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  const bookTitle = document.createElement("h2");
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = book.author;
  const bookPages = document.createElement("p");
  bookPages.textContent = `${book.pages} pages`;
  const bookRead = document.createElement("p");
  if (book.isRead) {
    bookRead.textContent = "Already read";
  } else {
    bookRead.textContent = "Not read yet";
  }

  const delBtn = document.createElement("button");
  delBtn.textContent = "x";

  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.textContent = "Toggle read status";

  toggleReadBtn.addEventListener("click", () => {
    if (book.isRead) {
      book.isRead = false;
      bookRead.textContent = "Not read yet";
    } else {
      book.isRead = true;
      bookRead.textContent = "Already read";
    }
  });

  bookContainer.setAttribute("data-i", myLibrary.indexOf(book));

  delBtn.addEventListener("click", () => {
    myLibrary.splice(bookContainer.getAttribute("data-i"), 1);
    displayBooks();
  });

  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(bookAuthor);
  bookContainer.appendChild(bookPages);
  bookContainer.appendChild(bookRead);
  bookContainer.appendChild(delBtn);
  bookContainer.appendChild(toggleReadBtn);
  container.appendChild(bookContainer);
}
