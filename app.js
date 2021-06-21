// Variable declarations.
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if ((read = "on")) {
      this.read = "already read";
    } else {
      this.read = "not read yet";
    }
    this.info = function () {
      return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
  }
}

const container = document.querySelector("#container");
const addBookBtn = document.querySelector("#add-book");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close");

const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const readField = document.querySelector("#read");
const submitBtn = document.querySelector("#submit");

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const FotR = new Book(
  "The Fellowship of the Ring",
  "J.R.R. Tolkien",
  736,
  true
);
const TT = new Book("The Two Towers", "J.R.R. Tolkien", 608, true);
const ROTK = new Book("The Return of the King", "J.R.R. Tolkien", 736, true);

let myLibrary = [theHobbit, FotR, TT, ROTK];

displayBooks();

// Event Listeners.
addBookBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

submitBtn.addEventListener("click", () => {
  myLibrary.push(addBookToLibrary());
  container.innerHTML = "";
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
  let read = readField.value;
  return new Book(title, author, pages, read);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookContainer = document.createElement("div");
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.author;
    const bookPages = document.createElement("p");
    bookPages.textContent = `${book.pages} pages`;
    const bookRead = document.createElement("p");
    bookRead.textContent = book.read;

    bookContainer.style.border = "2px solid black";
    bookContainer.style.margin = "2vh";
    bookContainer.style.padding = "20px";
    bookContainer.style.width = "200px";

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookRead);
    container.appendChild(bookContainer);
  });
}
