import React from 'react';
import PropTypes from 'prop-types';
import SearchBookInput from './SearchBookInput';

/**
 * Search bar component that contains main controls of a {@link SearchBookPage}.
 * @class
 * @param {object} props - A properties object.
 * @param {string} props.placeholder - Default text to show when input is empty.
 * @param {function} props.onChange - Function to handle changes in search input value.
 * @param {function} props.onCloseSearch - Function to execute when closing the current
 * {@link SearchBookPage}.
 * @returns {Component} The new or updated component.
 */
function SearchBookBar(props) {
  const {
    placeholder,
    onChange,
    onCloseSearch,
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
        <SearchBookInput
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

SearchBookBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onCloseSearch: PropTypes.func.isRequired,
};


export default SearchBookBar;
