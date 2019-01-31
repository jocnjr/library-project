const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');

const dbname = 'library-project';
mongoose.connect(`mongodb://localhost/${dbname}`, { useNewUrlParser: true });
Book.collection.drop();
Author.collection.drop();

const books = [
  {
    name: "The Hunger Games",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Suzanne",
              "lastName": "Collins",
              "nationality": "American",
              "birthday": new Date(1962,07,11),
              "pictureUrl": "https://www.thefamouspeople.com/profiles/images/suzanne-collins-3.jpg"
            },
    rating: 10
  },
  {
    name: "Harry Potter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Joanne",
              "lastName": "Rowling",
              "nationality": "English",
              "birthday": new Date(1965,06,31),
              "pictureUrl": "https://www.biography.com/.image/t_share/MTE4MDAzNDE3OTI3MDI2MTkw/jk-rowling_editedjpg.jpg"
            },
    rating: 9
  },
  {
    name: "To Kill a Mockingbird",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Harper",
              "lastName": "Lee",
              "nationality": "American",
              "birthday": new Date(1926,03,28),
              "pictureUrl": "https://cdn.cnn.com/cnnnext/dam/assets/150710115858-harper-lee-c1-exlarge-169.jpg"
            },
    rating: 8
  },
  {
    name: "Pride and Prejudice",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Jane",
              "lastName": "Austen",
              "nationality": "English",
              "birthday": new Date(1817,11,16),
              "pictureUrl": "https://www.biography.com/.image/t_share/MTE1ODA0OTcxNTQ2ODcxMzA5/jane-austen-9192819-1-402.jpg"
            },
    rating: 9
  },
  {
    name: "Twilight",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Sthephenie",
              "lastName": "Meyer",
              "nationality": "American",
              "birthday": new Date(1973,11,24),
              "pictureUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Stephenie_Meyer_by_Gage_Skidmore.jpg/1200px-Stephenie_Meyer_by_Gage_Skidmore.jpg"
            },
    rating: 10
  },
  {
    name: "The Book Thief",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Markus",
              "lastName": "Zusak",
              "nationality": "Australian",
              "birthday": new Date(1975,05,23),
              "pictureUrl": "https://images.penguinrandomhouse.com/author/59222"
            },
    rating: 7
  },
  {
    name: "The Chronicles of Narnia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Suzanne",
              "lastName": "Lewis",
              "nationality": "British",
              "birthday": new Date(1898,10,29),
              "pictureUrl": "https://media1.britannica.com/eb-media/24/82724-004-C01DBECB.jpg"
            },
    rating: 8
  },
  {
    name: "Animal Farm",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "George",
              "lastName": "Orwell",
              "nationality": "Indian",
              "birthday": new Date(1903,05,25),
              "pictureUrl": "https://www.biography.com/.image/t_share/MTIwNjA4NjMzOTMzNjI4OTQw/george-orwell-9429833-1-4022.jpg"
            },
    rating: 9
  },
  {
    name: "Gone with the Wind ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "Margaret",
              "lastName": "Mitchell",
              "nationality": "American",
              "birthday": new Date(1900,10,08),
              "pictureUrl": "https://media1.britannica.com/eb-media/13/153113-004-8474546E.jpg"
            },
    rating: 10
  },
  {
    name: "The Fault in Our Stars ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: { "name": "John",
              "lastName": "Green",
              "nationality": "American",
              "birthday": new Date(1977,07,24),
              "pictureUrl": "https://i.guim.co.uk/img/media/8a5dc5e279a570fdba282c88d4a2a363a38bc2e4/0_96_4768_2860/master/4768.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=33c90ed86c41e7d9e2a4297936a2e504"
            },
    rating: 8
  }
]

const createAuthors = books.map(book => {
  const newAuthor = new Author(book.author)
  return newAuthor.save()
  .then(author => {
    return author.name;
  })
  .catch(error => {
    throw new Error(`Impossible to add the author. ${error}`)
  })
})

console.log(`createAuthors ---> ${createAuthors}`);

let findAuthors = Promise.all(createAuthors)
  .then(authors => {
    return books.map(book => {
       return Author.findOne({name: book.author.name, lastName: book.author.lastName})
        .then(author => {
          if (!author) {
            throw new Error(`unknown author ${book.author.name} ${book.author.lastName}`);
          }
          return Object.assign({}, book, {author: author._id});
        }).catch(err => { throw new Error(err)});
    });
})
.catch(error => {
  throw new Error(error)
})

const saveBooks = findAuthors.then(findAuthors => {
  return Promise.all(findAuthors)
  .then(books => {
    return books.map(book => {
        const newBook = new Book(book);
        return newBook.save();
    })
  }).catch(err => { throw new Error(err)});
}).then(savedBooks => {
  Promise.all(savedBooks)
  .then(books => { 
    books.forEach(book => console.log(`created ${book.name}`));
    mongoose.connection.close();
  })
  .catch(err => { throw new Error(err) });
}).catch(err => { throw new Error(err)});