/* eslint-disable import/prefer-default-export */

/**
 *
 * @param {HTMLTableElement} that
 * @param {any[][]} array2d
 */
export function htmlTableElementFill(that, array2d) {
  that.querySelector('tbody').remove();
  array2d.forEach((row) => {
    const htmlRow = that.insertRow();
    row.forEach((cell) => {
      htmlRow.insertCell().innerHTML = cell.toString();
    });
  });
}

/**
 *
 * @param {HTMLTableElement} that
 * @param {any[]} array1d
 * @param {number} rowSize
 */
export function htmlTableElementFill1d(that, array1d, rowSize) {
  that.querySelector('tbody').remove();
  let htmlRow;
  array1d.forEach((item, index) => {
    if (index % rowSize === 0) {
      htmlRow = that.insertRow();
    }
    htmlRow.insertCell().innerHTML = item.toString();
  });
}
