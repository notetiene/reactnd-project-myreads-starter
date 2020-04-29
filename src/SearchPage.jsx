import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

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
    } = this.props;

    const {
      query,
    } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={onCloseSearch}
            type="button"
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
               NOTES: The search from BooksAPI is limited to a particular set of search terms.
               You can find these search terms here:
               https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

               However, remember that the BooksAPI.search method
               DOES search by title or author. So, don't worry if
               you don't find a specific author or title. Every
               search is limited by search terms.
             */}
            <SearchInput
              onChange={this.handleInputChange}
              placeholder="Search by title or author"
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query}
          </ol>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
};

export default SearchPage;
