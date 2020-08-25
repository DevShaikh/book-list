// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBootToList = book => {
  const list = document.getElementById('book-list');
  // Creat tr element
  const row = document.createElement('tr');
  // Insert Cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Alerts Message
UI.prototype.alertMessage = (msg, className) => {
  // Create Alert
  const alertUI = document.createElement('p');
  alertUI.innerHTML = msg;
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

// Remover book from the list
UI.prototype.removeBook = target => {
  if(target.className == 'delete') {
    // Instantiate UI
    const ui = new UI();

    // Remove book
    target.parentElement.parentElement.remove();

    // Delete alert
    ui.alertMessage('Book has been deleted!', 'alert-success')
  }
}

// Clear input field
UI.prototype.clearInputs = () => {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

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
    
    return false
  
  } else {
    // Add book to list
    ui.addBootToList(book);

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
})