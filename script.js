const library = [];

function Book(title, author, pageCount, isRead = false) {
    if (!new.target)
        throw Error("You must use the \"new\" operator to call a constructor!");

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.hasRead = isRead;
    this.author.info = function() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.hasRead ? "has been read" : "not yet read"}.`;
    }
}

function addBookToLibrary(title, author, pageCount, isRead = false) {
    library.push(new Book(title, author, pageCount, isRead));
    refreshBookshelf();
}

let removeBtns = [];

function refreshBookshelf() {
bookshelf.replaceChildren();

    library.forEach((book) => {
        console.table(library);
        console.log("\n current foreach book = " + book);
        const card = document.createElement("div");
        card.classList.add("card");
        bookshelf.appendChild(card);
    
        const cardTitleContainer = document.createElement("div");
        cardTitleContainer.id = "card-title-container";
        card.appendChild(cardTitleContainer);

        const cardHasRead = document.createElement("h4");
        cardHasRead.classList.add("book-title");
        cardHasRead.textContent = book.hasRead ? "Read" : "Unread";
        cardTitleContainer.appendChild(cardHasRead);

        const cardTitle = document.createElement("h2");
        cardTitle.classList.add("book-title");
        cardTitle.textContent = book.title;
        cardTitleContainer.appendChild(cardTitle);

        const cardAuthor = document.createElement("h3");
        cardAuthor.textContent = book.author;
        card.appendChild(cardAuthor);

        const cardBot = document.createElement("div");
        cardBot.classList.add("card-bot");
        card.appendChild(cardBot);

        const cardBotBtns = document.createElement("div");
        cardBotBtns.classList.add("card-bot-btns");
        cardBot.appendChild(cardBotBtns);

        const btnRemoveBook = document.createElement("button");
        btnRemoveBook.classList.add("card-btn-remove");
        removeBtns.push(btnRemoveBook);
        btnRemoveBook.removeConfirm = false;
        btnRemoveBook.addEventListener("click", () => {
            if (btnRemoveBook.removeConfirm == true) {
                card.remove();
                const idx = library.indexOf(book);
                library.splice(idx, 1);
            }
            else {
                btnRemoveBook.removeConfirm = true;
                btnRemoveBook.textContent = "Remove?";
            }
        });
        btnRemoveBook.textContent = "Remove";
        cardBotBtns.appendChild(btnRemoveBook);

        const btnReadBook = document.createElement("button");
        btnReadBook.classList.add("card-btn-read");
        btnReadBook.addEventListener("click", () => {
            book.hasRead = !book.hasRead;
            btnReadBook.textContent = book.hasRead ? "Undo" : "Finish";
            cardHasRead.textContent = book.hasRead ? "Read" : "Unread";
        });
        btnReadBook.textContent = book.hasRead ? "Undo" : "Finish";
        cardBotBtns.appendChild(btnReadBook);

        const cardPageCount = document.createElement("p");
        cardPageCount.classList.add("card-page-count");
        cardPageCount.textContent = book.pageCount;
        cardBot.appendChild(cardPageCount);
    });
}

window.addEventListener("keydown", (key) => {
    if (key.code == "Escape") {
        console.log("Escape down!");
        removeBtns.forEach(btn => {
            btn.removeConfirm = false;
            btn.textContent = "Remove";
        });
    }
})

const bookshelf = document.querySelector("#bookshelf");

const newBookForm = document.querySelector("#new-book-form");
const btnNewBook = document.querySelector("#btn-new-book");
btnNewBook.addEventListener("click", () => {
    btnNewBook.textContent = newBookForm.hidden ? "Hide" : "New Book";
    newBookForm.hidden = !newBookForm.hidden;
});
const newBookBtnDiv = document.querySelector("#new-book-btn-div");

const inputTitle = document.querySelector("#book-title");
const inputAuthor = document.querySelector("#book-author");
const inputPageCount = document.querySelector("#book-page-count");
const btnRead = document.querySelector("#btn-book-read");
btnRead.addEventListener("click", (event) => {
    event.preventDefault();
    btnRead.textContent = btnRead.textContent == "✔" ? "✖" : "✔";
})
const btnAddBook = document.querySelector("#btn-add-book");
btnAddBook.addEventListener("click", (event) => {
    event.preventDefault();
    tryAddBook(
    inputTitle.value,
    inputAuthor.value,
    inputPageCount.value,
    btnRead.textContent == "✔" ? true : false 
    );
});

function tryAddBook(title, author, pageCount, read = false) {
    if (title == "" | author == "" | pageCount < 1)
        return;

    addBookToLibrary(title, author, pageCount, read);
}

addBookToLibrary("The Last Templar", "Raymond Khoury", 800);
addBookToLibrary("Brisingr", "Christopher Paolini", 500);