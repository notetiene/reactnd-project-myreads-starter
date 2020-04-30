import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple search input component.
 * @class
 * @param {object} props - A properties object.
 * @param {string} props.placeholder - Default text to show when input is empty.
 * @param {function} props.onChange - Function to handle changes in input value.
 * @returns {Component} The new or updated component.
 */
function SearchBookInput(props) {
  const {
    placeholder,
    onChange,
  } = props;

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

SearchBookInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBookInput;
