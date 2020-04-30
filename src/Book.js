import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { toCamelCase } from './Utils';

/**
 * Show a book component.
 * @class
 * @param {object} props - A properties object.
 * @param {string} props.bookID - A unique identifier for the book.  Id provided by
 * {@link BooksAPI}.
 * @param {string} props.title - The title of the book.
 * @param {string} props.bookShelf - The bookshelf the book is member of.
 * @param {string} props.authors - Authors of the book.  “Unknown” if empty.
 * @param {string} props.coverURL - The URL of the book cover.  If empty, {@link Book~defaultCover}
 * is provided.
 * @param {number} props.coverWidth - The width of the book cover.
 * @param {number} props.coverHeight - The height of the book cover.
 * @param {function} props.onMoveBook - Function to execute when (re)moving a book from a
 * bookshielf.
 * @param {string[]} props.bookShelfList - A list of bookshelf names in their displayed form.  Used
 * for moving books.
 * @returns {Component} The new or updated component.
 */
function Book(props) {
  const {
    bookID,
    title,
    bookShelf,
    authors,
    coverURL,
    coverWidth,
    coverHeight,
    onMoveBook,
    bookShelfList,
  } = props;

  /**
   * @constant
   * @type {string}
   * @default
   */
  const defaultCover = 'http://books.google.com/books/content?id=&printsec=frontcover&img=1&zoom=1';

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: coverWidth,
            height: coverHeight,
            backgroundImage: `url("${coverURL || defaultCover}")`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={bookShelf}
            onChange={(event) => {
              onMoveBook(bookID, event.target.value);
            }}
          >
            <option value="move" disabled>Move to...</option>
            {bookShelfList.map((bookshelf) => (
              <option
                value={toCamelCase(bookshelf)}
                key={shortid()}
              >
                {bookshelf}
              </option>
            ))}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

Book.propTypes = {
  bookID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bookShelf: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  coverURL: PropTypes.string.isRequired,
  coverWidth: PropTypes.number.isRequired,
  coverHeight: PropTypes.number.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  bookShelfList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Book;
