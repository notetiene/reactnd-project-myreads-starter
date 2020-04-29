import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

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
