import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

function SearchBar(props) {
  const {
    onCloseSearch,
    onChange,
    placeholder,
  } = props;

  return (
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
          onChange={onChange}
          placeholder={placeholder}
        />

      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};


export default SearchBar;
