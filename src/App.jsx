import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchPage from './SearchPage';
import ListBookPage from './ListBookPage';

/**
 * Main application component of the project.
 * @param {object} props - A properties object.  Not in use.
 */
class BooksApp extends React.Component {
  /**
   * Initialize the {@link BookApp} component with dummy values (in case network has problems).
   * @param {object} props - A properties object.  Not in use.
   */
  constructor(props) {
    super(props);

    this.state = {
      books: [
        {
          title: 'To Kill a Mockingbird',
          id: 'aaaaa',
          bookShelf: 'currentlyReading',
          authors: 'Harper Lee',
          coverWidth: 128,
          coverHeight: 193,
          coverURL: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1',
        }, {
          title: 'Ender’s Game',
          id: 'bbbbb',
          bookShelf: 'currentlyReading',
          authors: 'Orson Scott Card',
          coverWidth: 128,
          coverHeight: 188,
          coverURL: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1',
        }, {
          title: 'Harry Potter and the Sorcerer’s Stone',
          id: 'ccccc',
          bookShelf: 'wantToRead',
          authors: 'J.K. Rowling',
          coverWidth: 128,
          coverHeight: 192,
          coverURL: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1',
        }, {
          title: '1776',
          id: 'ddddd',
          bookShelf: 'wantToRead',
          authors: 'David McCullough',
          coverWidth: 128,
          coverHeight: 193,
          coverURL: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1',
        }, {
          title: 'The Hobbit',
          id: 'eeeee',
          bookShelf: 'read',
          authors: 'J.R.R. Tolkien',
          coverWidth: 128,
          coverHeight: 192,
          coverURL: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1',
        }, {
          title: 'Oh, the Places You’ll Go!',
          id: 'fffff',
          bookShelf: 'read',
          authors: 'Seuss',
          coverWidth: 128,
          coverHeight: 174,
          coverURL: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1',
        }, {
          title: 'The Adventures of Tom Sawyer',
          id: 'ggggg',
          bookShelf: 'read',
          authors: 'Mark Twain',
          coverWidth: 128,
          coverHeight: 192,
          coverURL: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1',
        },
      ],
      bookShelves: [
        'Currently Reading',
        'Want to Read',
        'Read',
      ],
    };
  }

  /**
   * When the component is mounted, update the list of {@link Book} using {@link BooksAPI}.
   * @async
   */
  async componentDidMount() {
    const bookList = await BooksAPI.getAll();
    const books = bookList.map((book) => {
      const {
        title,
        id,
        authors,
        shelf,
        imageLinks: {
          thumbnail = '',
        } = '',
      } = book;

      return {
        title,
        id,
        bookShelf: shelf,
        authors: (authors && authors.length > 0 && authors.join(', ')) || 'Unknown',
        coverURL: thumbnail,
        coverWidth: 128,
        coverHeight: 192,
      };
    });

    this.setState(() => ({
      books,
    }));
  }

  /**
   * Remove a {@link Book} from recorded books ({@link Book.state.books}) and remote registry.
   * @param {string} bookID - A unique identifier for the book.  Id provided by {@link BooksAPI}.
   */
  removeBook = (bookID) => {
    this.setState((oldState) => {
      const book = this.getBook(bookID);

      BooksAPI.update(book, 'none');

      return {
        books: oldState.books.filter((b) => (b.id !== bookID)),
      };
    });
  }

  /**
   * Get a {@link Book} from {@link Book.state.books}.
   * @param {string} bookID - A unique identifier for the book.  Id provided by {@link BooksAPI}.
   * @returns {Book} A book object.
   */
  getBook = (bookID) => {
    const {
      books,
    } = this.state;

    return books.find((book) => (book.id === bookID));
  }

  /**
   * Add a book to the recorded books ({@link Book.state.books}) and remote registry.
   * @param {string} bookID - A unique identifier for the book.  Id provided by {@link BooksAPI}.
   * @param {string} bookShelf - Bookshelf to add the book to.  Must be the canonical form
   * (camelCase).
   */
  addBook = async (bookID, bookShelf) => {
    const {
      title,
      id,
      authors,
      imageLinks: {
        thumbnail = '',
      } = '',
    } = await BooksAPI.get(bookID);

    this.setState((oldState) => ({
      books: [...oldState.books, {
        title,
        id,
        authors: (authors && authors.length > 0 && authors.join(', ')) || 'Unknown',
        coverURL: thumbnail,
        coverWidth: 128,
        coverHeight: 192,
        bookShelf,
      }],
    }));

    BooksAPI.update({
      id: bookID,
    }, bookShelf);
  }

  /**
   * Move a specified book to an other bookshielf.
   * @param {string} bookID - A unique identifier for the book.  Id provided by {@link BooksAPI}.
   * @param {string} bookShelf - Bookshelf to add the book to.  Must be the canonical form
   * (camelCase).
   */
  moveBook = (bookID, bookShelf) => {
    this.setState((oldState) => {
      const {
        books,
      } = oldState;
      const bookIndex = books.findIndex((element) => (element.id === bookID));

      books[bookIndex].bookShelf = bookShelf;

      return books;
    });
  }

  /**
   * Act on the book registry according to user input.
   * @param {string} bookID - A unique identifier for the book.  Id provided by {@link BooksAPI}.
   * @param {string} bookShelf - Bookshelf to add/(re)move the book.  Must be the canonical form
   * (camelCase).  If “none”, remove book.
   */
  onMoveBook = (bookID, bookShelf) => {
    const {
      books,
    } = this.state;
    const bookIndex = books.findIndex((element) => (element.id === bookID));

    if (bookShelf === 'none') {
      this.removeBook(bookID);
    } else if (bookIndex === -1) {
      this.addBook(bookID, bookShelf);
    } else {
      this.moveBook(bookID, bookShelf);
    }
  }

  /**
   * Render a {@link BookApp} using {@link ListBookPage} and {@link SearchPage} components.
   * @returns {Component} The new or updated component.
   */
  render() {
    const {
      books,
      bookShelves,
    } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <ListBookPage
              books={books}
              bookShelves={bookShelves}
              onOpenSearch={() => {
                history.push('/search');
              }}
              onMoveBook={this.onMoveBook}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchPage
              onCloseSearch={() => {
                history.push('/');
              }}
              bookShelves={bookShelves}
              books={books}
              onMoveBook={this.onMoveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
