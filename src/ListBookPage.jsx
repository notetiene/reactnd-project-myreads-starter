import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import Book from './Book';

function ListBookPage(props) {
  const {
    onOpenSearch,
    bookShelves,
  } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
          >
            <li>
              <Book
                bookShelfList={bookShelves}
                title="To Kill a Mockingbird"
                authors="Harper Lee"
                coverWidth={128}
                coverHeight={193}
                coverURL="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1"
              />
            </li>
            <li>
              <Book
                bookShelfList={bookShelves}
                title="Ender’s Game"
                authors="Orson Scott Card"
                coverWidth={128}
                coverHeight={188}
                coverURL="http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1"
              />
            </li>
          </BookShelf>
          <BookShelf
            title="Want to Read"
          >
            <li>
              <Book
                bookShelfList={bookShelves}
                title="Harry Potter and the Sorcerer’s Stone"
                authors="J.K. Rowling"
                coverWidth={128}
                coverHeight={192}
                coverURL="http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1"
              />
            </li>
            <li>
              <Book
                bookShelfList={bookShelves}
                title="1776"
                authors="David McCullough"
                coverWidth={128}
                coverHeight={193}
                coverURL="http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1"
              />
            </li>
          </BookShelf>
          <BookShelf
            title="Read"
          >
            <li>
              <Book
                bookShelfList={bookShelves}
                title="The Hobbit"
                authors="J.R.R. Tolkien"
                coverWidth={128}
                coverHeight={192}
                coverURL="http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1"
              />
            </li>
            <li>
              <Book
                bookShelfList={bookShelves}
                title="Oh, the Places You’ll Go!"
                authors="Seuss"
                coverWidth={128}
                coverHeight={174}
                coverURL="http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1"
              />
            </li>
            <li>
              <Book
                bookShelfList={bookShelves}
                title="The Adventures of Tom Sawyer"
                authors="Mark Twain"
                coverWidth={128}
                coverHeight={192}
                coverURL="http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1"
              />
            </li>
          </BookShelf>
        </div>
      </div>
      <div className="open-search">
        <button
          onClick={onOpenSearch}
          type="button"
        >
          Add a book
        </button>
      </div>
    </div>
  );
}

ListBookPage.propTypes = {
  onOpenSearch: PropTypes.func.isRequired,
  bookShelves: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListBookPage;
