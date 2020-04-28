import React from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import ListBookPage from './ListBookPage';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookShelves: [
        'Currently Reading',
        'Want to Read',
        'Read',
      ],
    };
  }

  render() {
    const {
      bookShelves,
    } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <ListBookPage
              bookShelves={bookShelves}
              onOpenSearch={() => {
                history.push('/search');
              }}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchPage
              onCloseSearch={() => {
                history.push('/');
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
