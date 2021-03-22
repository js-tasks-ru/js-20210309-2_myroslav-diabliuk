/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    if (arr) {
        let newArr = [...arr];

        return newArr.filter((value, i, arr) => newArr.indexOf(value) === i)
    }

    return [];
}
