import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBookBar from './SearchBookBar';
import SearchBookResults from './SearchBookResults';


/**
 * A page to search remote books to add/move to a bookshelf.
 */
class SearchBookPage extends Component {
  /**
   * {@link SearchBookPage} constructor
   * @constructor
   * @param {object} props - A properties object.
   * @param {Book[]} props.books - A list of Book already in parent state.
   * @param {function} props.onCloseSearch - A function to quit the {@link SearchBookPage}
   * component.
   * @param {function} props.onMoveBook - A function to move a book to an other bookshelf.
   * @param {string[]} props.bookShelves - A list of bookshelf to move the book in.
   */
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  /**
   * Handle input change from the {@link SearchBookInput} component.  This sets the state to the new
   * query to be passed to {@link SearchBookResuls}.
   * @param {Event} event - Change event when the input has changed its value.
   */
  handleInputChange = (event) => {
    const {
      target: {
        value,
      },
    } = event;

    this.setState(() => ({
      query: value,
    }));
  }

  /**
   * Render a {@link SearchBookPage} using a {@link SearchBookBar} component and a {@link SearchBookResults}
   * component.
   * @returns {Component} The new or updated component.
   */
  render() {
    const {
      books,
      onCloseSearch,
      onMoveBook,
      bookShelves,
    } = this.props;

    const {
      query,
    } = this.state;

    return (
      <div className="search-books">
        <SearchBookBar
          onCloseSearch={onCloseSearch}
          onChange={this.handleInputChange}
          placeholder="Search by title or author"
        />
        <SearchBookResults
          query={query}
          bookShelfList={bookShelves}
          books={books}
          onMoveBook={onMoveBook}
        />
      </div>
    );
  }
}

SearchBookPage.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    bookShelf: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    coverWidth: PropTypes.number.isRequired,
    coverHeight: PropTypes.number.isRequired,
    coverURL: PropTypes.string.isRequired,
  })).isRequired,
  onCloseSearch: PropTypes.func.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  bookShelves: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchBookPage;
