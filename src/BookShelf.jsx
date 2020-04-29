import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Book from './Book';
import { toCamelCase } from './Utils';


function BookShelf(props) {
  const {
    title,
    books,
    bookShelfList,
  } = props;

  const bookShelfID = toCamelCase(title);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.filter((book) => (book.bookShelf === bookShelfID)).map((book) => (
            <li
              key={shortid()}
            >
              <Book
                bookShelfList={bookShelfList}
                title={book.title}
                authors={book.authors}
                bookShelf={book.bookShelf}
                coverWidth={book.coverWidth}
                coverHeight={book.coverHeight}
                coverURL={book.coverURL}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    bookShelf: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    coverWidth: PropTypes.number.isRequired,
    coverHeight: PropTypes.number.isRequired,
    coverURL: PropTypes.string.isRequired,
  })).isRequired,
  bookShelfList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BookShelf;
