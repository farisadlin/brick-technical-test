/**
 * Truncates a given string to a specified length and appends '...' at the end.
 * 
 * @param {string} str - The string to be truncated.
 * @param {number} [num=50] - The maximum length of the truncated string (including '...'). Defaults to 50 characters.
 * @returns {string} The truncated string, or the original string if it's shorter than the specified length.
 */
const truncateText = (str, num = 50) => {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + '...';
}

export default truncateText;