import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


/**
 * A page to search remote books to add/move to a bookshelf.
 */
class SearchPage extends Component {
  /**
   * {@link SearchPage} constructor
   * @constructor
   * @param {object} props - A properties object.
   * @param {function} props.onCloseSearch - A function to quit the SearchPage component.V
   * @param {function} props.onMoveBook - A function to move a book to an other bookshelf.
   * @param {string[]} props.bookShelves - A list of bookshelf to move the book in.
   * @param {Book[]} props.books - A list of Book already in parent state.
   */
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  /**
   * Handle input change from the {@link SearchInput} component.  This sets the state to the new query to be passed to {@link SearchResuls}.
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
   * Render a {@link SearchPage} using a {@link SearchBar} component and a {@link SearchResults} component.
   * @returns {Component} The new or updated component.
   */
  render() {
    const {
      onCloseSearch,
      bookShelves,
      books,
      onMoveBook,
    } = this.props;

    const {
      query,
    } = this.state;

    return (
      <div className="search-books">
        <SearchBar
          onCloseSearch={onCloseSearch}
          onChange={this.handleInputChange}
          placeholder="Search by title or author"
        />
        <SearchResults
          query={query}
          bookShelfList={bookShelves}
          books={books}
          onMoveBook={onMoveBook}
        />
      </div>
    );
  }
}

SearchPage.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
  bookShelves: PropTypes.arrayOf(PropTypes.string).isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    bookShelf: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    coverWidth: PropTypes.number.isRequired,
    coverHeight: PropTypes.number.isRequired,
    coverURL: PropTypes.string.isRequired,
  })).isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default SearchPage;
