import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import BookShelf from './BookShelf';

function ListBookPage(props) {
  const {
    books,
    bookShelves,
    onOpenSearch,
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
  bookShelves: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListBookPage;
