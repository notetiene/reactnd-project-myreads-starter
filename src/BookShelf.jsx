import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Book from './Book';
import { toCamelCase } from './Utils';


/**
 * A section displaying a list of {@link Book} in a specific bookshielf.
 * @class
 * @param {object} props - A properties object.
 * @param {string} props.title - The bookshielf title.
 * @param {Book[]} props.books - A list of {@link Book} to show.
 * @param {string[]} props.bookShelves - A list of bookshelf names in their displayed form.  Used for moving books.
 * @param {function} props.onMoveBook - Function to executed when (re)moving a {@link Book} from a bookshelf.
 * @returns {Component} The new or updated component.
 */
function BookShelf(props) {
  const {
    title,
    books,
    bookShelfList,
    onMoveBook,
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
                bookID={book.id}
                title={book.title}
                authors={book.authors}
                bookShelf={book.bookShelf}
                coverWidth={book.coverWidth}
                coverHeight={book.coverHeight}
                coverURL={book.coverURL}
                onMoveBook={onMoveBook}
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
  onMoveBook: PropTypes.func.isRequired,
};

export default BookShelf;
