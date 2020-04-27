import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import ListBookPage from './ListBookPage';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    this.state = {

      showSearchPage: false,
    };
  }

  handleCloseSearch = () => {
    this.setState({ showSearchPage: false });
  }

  handleOpenSearch = () => {
    this.setState({ showSearchPage: true });
  }

  render() {
    const {
      showSearchPage,
    } = this.state;

    return (
      <div className="app">
        {showSearchPage ? (
          <SearchPage
            onCloseSearch={this.handleCloseSearch}
          />
        ) : (
          <ListBookPage
            onOpenSearch={this.handleOpenSearch}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
