let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  if (read) {
    this.read = "already read";
  } else {
    this.read = "not read yet";
  }
  this.info = function () {
    return `${this.name} by ${this.author}, ${pages} pages, ${this.read}`;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
