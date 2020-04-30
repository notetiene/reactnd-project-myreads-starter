import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

/**
 * A list of Book matching a specific query.  The list is limited to
 * 20 books according to the API used.
 * @extends Component
 */
class SearchResults extends Component {
  /**
   * {@link SearchResults} constructor.
   * @param {object} props - A properties object.
   * @param {string} props.query - The query for matching a list of books.
   * @param {Book[]} props.books - A list of Book in already parent state.
   * @param {function} props.onMoveBook - A function to move a book to an other bookshelf.
   * @param {string[]} props.bookShelfList - A list of bookshelf to move the book in.
   */
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  /**
   * When the query is updated, call {@link updateBookList}.
   * @param {object} prevProps - A properties object.
   * @param {string} props.query - The query for matching a list of books.
   */
  componentDidUpdate(prevProps) {
    const {
      query,
    } = this.props;

    if (prevProps.query !== query) {
      this.updateBookList(query);
    }
  }

  /**
   * Update the {@link SearchResults.state.results} to the new results.
   * @param {string} query - The query for matching a list of books.
   */
  updateBookList = (query) => {
    BooksAPI.search(query).then((books = []) => {
      this.setState(() => ({
        // When query gives an error, return an empty array
        results: books.error ? [] : books,
      }));
    });
  }

  /**
   * Render a {@link SearchResults} using {@link Book} components.
   * @returns {Component} The new or updated component.
   */
  render() {
    const {
      query,
      books,
      onMoveBook,
      bookShelfList,
    } = this.props;

    const {
      results,
    } = this.state;

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
                    thumbnail = '',
                  } = '',
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
  onMoveBook: PropTypes.func.isRequired,
  bookShelfList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchResults;
