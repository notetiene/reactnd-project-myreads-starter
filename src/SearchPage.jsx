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
        />
      </div>
    );
  }
}

SearchPage.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
};

export default SearchPage;
