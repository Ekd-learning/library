const libraryContainer = document.querySelector(`.library_container`);
const newBookBtn = document.querySelector(`.newBookBtn`);
const addBookBtn = document.querySelector(`.addBookBtn`);
const modalWindow = document.querySelector(`#modal`);

class Book {
  title;
  author;
  pages;
  read;
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read ? (this.read = false) : (this.read = true);
  }

  info() {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      (read ? "read already" : "not read yet")
    );
  }
}

class Library {
  myLibrary = [];
  //   addBookToLibrary(theBook) {
  //     this.myLibrary.push(theBook);
  //   }
  addBookToLibrary(title, author, pages, read) {
    const theBook = new Book(title, author, pages, read);
    this.myLibrary.push(theBook);
  }

  displayBooks() {
    this.clearBooksContainer();
    this.myLibrary.forEach((book, index) => {
      const bookCard = `
        <div class="${index} bookCard" width="300px" height="300px">
            <p><strong>${book.title}</strong>\n</p>
            <p>${book.author}\n</p>
            <p>${book.pages} pages\n</p>          
            <p>${book.read ? "read already" : "not read yet"}\n</p>
            <label for="read">Read?</label>
            <input type="checkbox" class="${index} read" id="${
        book.title
      }_read" name="${book.title}_read" ${book.read ? "checked" : ""} />
            <button class="removeBookBtn">Remove the book</button>
        </div>`;
      libraryContainer.insertAdjacentHTML("beforeend", bookCard);
    });
  }
  clearBooksContainer() {
    libraryContainer.innerHTML = " ";
  }
}

const aLibrary = new Library();
// const firstBook = new Book('one', 'oneth', '234', true);
aLibrary.addBookToLibrary("one", "oneth", "234", true);
aLibrary.addBookToLibrary("two", "twoth", "234", false);
aLibrary.displayBooks();

newBookBtn.addEventListener("click", function (e) {
  modalWindow.classList.toggle("hidden");
});
addBookBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  aLibrary.addBookToLibrary(title, author, pages, read);
  aLibrary.displayBooks();
  modalWindow.classList.toggle("hidden");
});
document.addEventListener("click", function (e) {
  const target = e.target; // button/element clicked
  const targetBook = target.closest(".bookCard"); // parent container of the element/button clicked
  if (target.classList.contains("read")) {
    // toggle read property
    if (aLibrary.myLibrary[targetBook.classList[0]].read)
      aLibrary.myLibrary[targetBook.classList[0]].read = false;
    else aLibrary.myLibrary[targetBook.classList[0]].read = true;
    aLibrary.displayBooks();
  }
  if (target.classList.contains("removeBookBtn")) {
    // remove the book
    aLibrary.myLibrary.splice(targetBook.classList[0], 1);
    aLibrary.displayBooks();
  }
});
