/**
 * Transform a string to camelCase form.
 * @param {string} str - The string to transform.
 * @returns {string} The new transformed string.
 */
const toCamelCase = (str) => {
  const newStr = str.trim().toLocaleLowerCase();

  return (newStr[0] + newStr.replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase()).substr(1)).replace(/\s/g, '');
};

export { toCamelCase };
