import React from 'react';
import PropTypes from 'prop-types';

function SearchResults(props) {
  const {
    query,
  } = props;

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {query}
      </ol>
    </div>
  );
}

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
};

export default SearchResults;
