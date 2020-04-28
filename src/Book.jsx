import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { toCamelCase } from './Utils';

function Book(props) {
  const {
    coverURL,
    bookShelfList,
    title,
    authors,
    coverWidth,
    coverHeight,
  } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: coverWidth,
            height: coverHeight,
            backgroundImage: `url("${coverURL}")`,
          }}
        />
        <div className="book-shelf-changer">
          <select>
            <option value="move" disabled>Move to...</option>
            {bookShelfList.map((bookshelf) => (
              <option
                value={toCamelCase(bookshelf)}
                key={shortid()}
              >
                {bookshelf}
              </option>
            ))}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

Book.propTypes = {
  coverURL: PropTypes.string.isRequired,
  bookShelfList: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  coverWidth: PropTypes.number.isRequired,
  coverHeight: PropTypes.number.isRequired,
};

export default Book;
