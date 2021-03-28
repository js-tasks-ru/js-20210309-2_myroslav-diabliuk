/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let returnString = "";
    let substr = "";
    
    let resultString = "";
    let lastChar = "";
    let count = 0;

    if (size === 0 || string === '') return "";
    if (!size) return string;
    
    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (lastChar === char) {
            count++;

            if (count < size) {
                resultString += char;
                
            }
        } else {
            resultString += char;
            lastChar = char;
            count = 0;
        }
    }
    
    return resultString;
}