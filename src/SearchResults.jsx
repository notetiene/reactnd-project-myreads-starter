import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  componentDidUpdate(prevProps) {
    const {
      query,
    } = this.props;

    if (prevProps.query !== query) {
      this.updateBookList(query);
    }
  }

  updateBookList = (query) => {
    BooksAPI.search(query).then((books = []) => {
      this.setState(() => ({
        results: books.error ? [] : books,
      }));
    });
  }

  render() {
    const {
      bookShelfList,
      books,
      query,
      onMoveBook,
    } = this.props;

    const {
      results,
    } = this.state;

    const defaultCover = 'http://books.google.com/books/content?id=&printsec=frontcover&img=1&zoom=1';

    return (
      <div className="search-books-results">
        {query && (
          <div>
            <h2
              className="bookshelf-title"
            >
              Books for “{query}”
            </h2>
            <ol className="books-grid">
              {results.length > 0 ? results.map((result) => {
                const {
                  title,
                  id,
                  authors,
                  imageLinks: {
                    thumbnail,
                  } = defaultCover,
                } = result;

                const book = books.find((b) => b.id === id);
                const shelf = book ? book.bookShelf : 'none';

                return (
                  <li
                    key={shortid()}
                  >
                    <Book
                      bookShelfList={bookShelfList}
                      bookID={id}
                      title={title}
                      authors={(authors && authors.join(', ')) || 'Unknown'}
                      bookShelf={shelf}
                      coverWidth={128}
                      coverHeight={192}
                      coverURL={thumbnail}
                      onMoveBook={onMoveBook}
                    />
                  </li>
                );
              }) : (
                <h3>No books found</h3>
              )}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
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

export default SearchResults;
