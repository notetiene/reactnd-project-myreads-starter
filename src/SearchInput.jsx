import React from 'react';
import PropTypes from 'prop-types';

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
