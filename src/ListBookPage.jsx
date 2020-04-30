import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import BookShelf from './BookShelf';

/**
 * Page to show the list of books actually registered in {@link props.bookShelves}
 * @class
 * @param {object} props - A properties object.
 * @param {Book[]} props.books - A list of {@link Book} to show.
 * @param {function} props.onOpenSearch - Function to execute when quitting the current page to the
 * {@link SearchPage}.
 * @param {function} props.onMoveBook - Function to executed when (re)moving a {@link Book} from a
 * bookshelf.
 * @param {string[]} props.bookShelves - A list of bookshelf names in their displayed form.
 * @returns {Component} The new or updated component.
 */
function ListBookPage(props) {
  const {
    books,
    onOpenSearch,
    onMoveBook,
    bookShelves,
  } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves.map((bookShelf) => (
            <BookShelf
              title={bookShelf}
              bookShelfList={bookShelves}
              books={books}
              onMoveBook={onMoveBook}
              key={shortid()}
            />
          ))}
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
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    bookShelf: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    coverWidth: PropTypes.number.isRequired,
    coverHeight: PropTypes.number.isRequired,
    coverURL: PropTypes.string.isRequired,
  })).isRequired,
  onOpenSearch: PropTypes.func.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  bookShelves: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListBookPage;
