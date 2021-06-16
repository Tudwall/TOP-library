// Variable declarations.
const addBookBtn = document.querySelector("#add-book");

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

// Event Listeners.
addBookBtn.addEventListener("click", () => {
  myLibrary.push(addBookToLibrary());
});

// Functions.
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read) {
    this.read = "already read";
  } else {
    this.read = "not read yet";
  }
  this.info = function () {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function addBookToLibrary() {
  let title = prompt("Write the book's title: ", "");
  let author = prompt("Write the author's name: ", "");
  let pages = Number(prompt("How many pages?", ""));
  let read = prompt("Have you read it? (true or false)", "");
  const newBook = new Book(title, author, pages, read);
  return newBook;
}
