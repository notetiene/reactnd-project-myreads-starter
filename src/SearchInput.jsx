import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple search input component.
 * @class
 * @param {object} props - A properties object.
 * @param {function} props.onChange - Function to handle changes in input value.
 * @param {string} props.placeholder - Default text to show when input is empty.
 * @returns {Component} The new or updated component.
 */
function SearchInput(props) {
  const {
    onChange,
    placeholder,
  } = props;

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
