/**
 * Capitalizes the first letter of each word in a given text.
 * @param {string} text - The input text to be capitalized.
 * @returns {string} - The capitalized text.
 */
export default function capitalizeText(text) {
  const words = text.split(' ');

  const capitalizedWords = [];

  for (const word of words) {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    capitalizedWords.push(capitalizedWord);
  }

  const capitalizedText = capitalizedWords.join(' ');

  return capitalizedText;
}
