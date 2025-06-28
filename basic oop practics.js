/* class UserProfile  {
constructor(username, email){
    this.username = username;
    this.email= email
}
displayInfo(){
    console.log(`Username: ${this.username} Email: ${this.email}`);
}
}

const user = new UserProfile('john', 'john@gmail.com');
user.displayInfo(); */

const libraryDisplay = document.getElementById('library-display');
const bookTitle = document.getElementById('title');
const author = document.getElementById('author');
const getForm = document.getElementById('book-form');

class Book {
    constructor(title, author) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.isRead = true;
    }
    toggleReadStatus() {
        this.isRead = !this.isRead;
        library.saveToLocalStorage(); 
    }
}

class Library {
    constructor() {
        this.books = []
    }
    addBook(book) {
        this.books.push(book);
        this.saveToLocalStorage();
    }
    removeBook(id) {
        const index = this.books.findIndex((book) => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            this.saveToLocalStorage();
        }
    }
    listBooks() {
        libraryDisplay.innerHTML = '';
        if (this.books.length === 0) {
            libraryDisplay.innerHTML = "<p>📚 No books in the library yet.</p>";
            return;
        }
        this.books.forEach((book) => {
            libraryDisplay.innerHTML += `
            <div class="book-card">
            <h3 class ="${book.isRead ? "read" : "unread"}">Book Title: ${book.title}</h3>
            <h3 class ="${book.isRead ? "read" : "unread"}">Book Author: ${book.author}</h3>
            <button class="toggle-status" data-id="${book.id}"> Mark as ${book.isRead ? "Unread " : "Read"}</button>
            <button class="remove-book" data-id="${book.id}">Remove</button>
            </div>
`;
        });
        bookTitle.value = '';
        author.value = '';
        attachEventHandlers();
    }
    saveToLocalStorage() {
        localStorage.setItem("myLibrary", JSON.stringify(this.books));
    }
}

const library = new Library();

const savedBooks = JSON.parse(localStorage.getItem("myLibrary"));
if(savedBooks){
    savedBooks.forEach((data) => {
  const book = new Book(data.title, data.author);
    book.id = data.id;
    book.isRead = data.isRead;
    library.addBook(book);
    })
}
library.listBooks();

getForm.addEventListener('submit', () => {
    event.preventDefault();
    if (!bookTitle.value.trim() && !author.value.trim()) {
        return;
    } else {
        const addBooks = new Book(bookTitle.value.trim(), author.value.trim());
        library.addBook(addBooks);
        library.listBooks();
    }

});

function attachEventHandlers() {
    const toggleStatus = document.querySelectorAll('.toggle-status');
    toggleStatus.forEach((button) => {
        button.addEventListener('click', () => {
            const getStatus = library.books.find(b => b.id === button.dataset.id);
            getStatus.toggleReadStatus();
            library.listBooks();
        });
    });
    const removeBook = document.querySelectorAll('.remove-book');
    removeBook.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            if (confirm("Are you sure you want to delete this book?")) {
                library.removeBook(id);
                library.listBooks();
            }
        });
    });
}