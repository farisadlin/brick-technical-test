/**
 * Checks if a given query exists within an array of objects based on the 'inputQuery' property.
 * 
 * @param {Array} arr - The array of objects to search within.
 * @param {string} query - The query string to search for.
 * @returns {boolean} True if a matching 'inputQuery' is found; otherwise, false.
 */
const hasQueryExisted = (data, inputQuery, inputSelect, inputPage) => {
    return data.some(item => {
        return item.inputQuery.toLowerCase() === inputQuery.toLowerCase()
            && item.inputSelect.toLowerCase() === inputSelect.toLowerCase()
            && item.inputPage === inputPage
    });
};

export default hasQueryExisted