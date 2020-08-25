<<<<<<< HEAD
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
};

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Creat tr element
    const row = document.createElement('tr');
    // Insert Cols
    row.innerHTML = `
      <td class="title-search">${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span class="delete" aria-hidden="true">&times;</span>
    </button></td>
    `;
  
    list.appendChild(row);
  }

  removeBook(target) {
    if(target.className == 'delete') {
      // Instantiate UI
      const ui = new UI();
  
      // Remove book
      target.parentElement.parentElement.parentElement.remove();
  
      // Delete alert
      ui.alertMessage('Book has been deleted!', 'alert-success')
    }
  }

  alertMessage(msg, className) {
    // Create Alert
    const alertUI = document.createElement('div');
    alertUI.innerHTML = `
    ${msg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`;
    alertUI.className = `alert ${className}`;

    // Get parent
    const wrapper = document.getElementById('bookInputWrapper');

    // Get form
    const form = document.getElementById('book-form');

    // Insert Alert
    wrapper.insertBefore(alertUI, form)

    // Set timeout
    setTimeout(() => {
      alertUI.remove()
    }, 3000)
  }

  clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI;
      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Getting form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // Instantiate a book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.alertMessage('Please fill in all fields', 'alert-danger')
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to local storage
    Store.addBook(book);

    // Clear input field
    ui.clearInputs();
    
    // Submit alert
    ui.alertMessage('Book Added!', 'alert-success')
  }

  e.preventDefault();
})

// Event listener for delete book
document.getElementById('book-list').addEventListener('click', e => {
    // Instantiate UI
    const ui = new UI();

    // Remove book
    ui.removeBook(e.target);

    // Remove book from local storage
    Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
})

// Event listener for delete book
document.getElementById('clear-all').addEventListener('click', e => {
  // Instantiate UI
  const ui = new UI();
  
  // Get books
  const books = Store.getBooks();
  
  if(books == '') {
    // Error Alert
    ui.alertMessage('Please add books', 'alert-danger');
  } else {
    // Clear all books from UI
    const list = document.getElementById('book-list');
    while(list.firstChild) {
      list.firstChild.remove();
    }

    // Clear all books from local storage
    localStorage.clear();

    //  Cleared Alert
    ui.alertMessage('Books are cleared', 'alert-success');
  }
});
=======
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
};

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Creat tr element
    const row = document.createElement('tr');
    // Insert Cols
    row.innerHTML = `
      <td class="title-search">${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span class="delete" aria-hidden="true">&times;</span>
    </button></td>
    `;
  
    list.appendChild(row);
  }

  removeBook(target) {
    if(target.className == 'delete') {
      // Instantiate UI
      const ui = new UI();
  
      // Remove book
      target.parentElement.parentElement.parentElement.remove();
  
      // Delete alert
      ui.alertMessage('Book has been deleted!', 'alert-success')
    }
  }

  alertMessage(msg, className) {
    // Create Alert
    const alertUI = document.createElement('div');
    alertUI.innerHTML = `
    ${msg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`;
    alertUI.className = `alert ${className}`;

    // Get parent
    const wrapper = document.getElementById('bookInputWrapper');

    // Get form
    const form = document.getElementById('book-form');

    // Insert Alert
    wrapper.insertBefore(alertUI, form)

    // Set timeout
    setTimeout(() => {
      alertUI.remove()
    }, 3000)
  }

  clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI;
      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Getting form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // Instantiate a book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.alertMessage('Please fill in all fields', 'alert-danger')
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to local storage
    Store.addBook(book);

    // Clear input field
    ui.clearInputs();
    
    // Submit alert
    ui.alertMessage('Book Added!', 'alert-success')
  }

  e.preventDefault();
})

// Event listener for delete book
document.getElementById('book-list').addEventListener('click', e => {
    // Instantiate UI
    const ui = new UI();

    // Remove book
    ui.removeBook(e.target);

    // Remove book from local storage
    Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
})

// Event listener for delete book
document.getElementById('clear-all').addEventListener('click', e => {
  // Instantiate UI
  const ui = new UI();
  
  // Get books
  const books = Store.getBooks();
  
  if(books == '') {
    // Error Alert
    ui.alertMessage('Please add books', 'alert-danger');
  } else {
    // Clear all books from UI
    const list = document.getElementById('book-list');
    while(list.firstChild) {
      list.firstChild.remove();
    }

    // Clear all books from local storage
    localStorage.clear();

    //  Cleared Alert
    ui.alertMessage('Books are cleared', 'alert-success');
  }
});
>>>>>>> 0d59c9085d6105c9289791512b5af15648935317
