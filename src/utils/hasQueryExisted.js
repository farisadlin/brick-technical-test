/**
 * Checks if a given set of input parameters ('inputQuery', 'inputSelect', and 'inputPage') exists 
 * within an array of objects.
 * 
 * @param {Array} data - The array of objects to search within.
 * @param {string} inputQuery - The 'inputQuery' string to match against.
 * @param {string} inputSelect - The 'inputSelect' string to match against.
 * @param {number|string} inputPage - The 'inputPage' value to match against.
 * @returns {boolean} True if an object in the data array matches all the given input parameters; otherwise, false.
 */
const hasQueryExisted = (data, inputQuery, inputSelect, inputPage) => {
    return data.some(item => {
        return item.inputQuery.toLowerCase() === inputQuery.toLowerCase()
            && item.inputSelect.toLowerCase() === inputSelect.toLowerCase()
            && item.inputPage === inputPage
    });
};

export default hasQueryExisted