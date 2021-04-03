/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    function resultArr(obj) {  
        for(const item of path.split('.')) {
            if (obj === undefined) {
                break;
            } 
            
            obj = obj[item];
        }
        return obj;
    }

    return resultArr;
}
