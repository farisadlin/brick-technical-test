/**
 * Filters an array of objects to remove duplicates based on 'inputQuery', 'inputSelect', and 'inputPage' properties.
 * 
 * @param {Array} data - The array of objects to filter.
 * @returns {Array} The filtered array with unique 'inputQuery', 'inputSelect', and 'inputPage' properties.
 */
const uniqueData = (data) => {
    const uniqueValues = new Set();
    
    return data?.filter(item => {
        const combinedValue = `${item.inputQuery}-${item.inputSelect}-${item.inputPage}`;
        
        if (!uniqueValues.has(combinedValue)) {
            uniqueValues.add(combinedValue);
            return true;
        }
        
        return false;
    });
};

export default uniqueData;