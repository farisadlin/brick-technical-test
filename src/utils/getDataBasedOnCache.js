/**
 * Finds and returns the first object in the data array that matches 
 * the 'inputQuery', 'inputSelect', and 'inputPage' properties in cachesData.
 * 
 * @param {Array} data - The array of objects to search through.
 * @param {Array} cachesData - The array of cached objects to compare against.
 * @returns {Object|undefined} The first matched object from data based on cachesData, or undefined if no match is found.
 */
const getDataBasedOnCache = (data, cachesData) => {
    // Convert cache data into a set of strings for quick lookup
    const cacheSet = new Set(
        cachesData?.map(item => `${item.inputQuery}-${item.inputSelect}-${item.inputPage}`)
    );

    return data?.find(item => {
        const itemKey = `${item.inputQuery}-${item.inputSelect}-${item.inputPage}`;
        return cacheSet.has(itemKey);
    });
};

export default getDataBasedOnCache;
