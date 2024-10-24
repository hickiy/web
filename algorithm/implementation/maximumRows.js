/**
 * @param {number[][]} mat
 * @param {number} cols
 * @return {number}
 */
var maximumRows = function (mat, cols) {
  const n = mat[0].length;

  const zeroCount = cols,
    oneCount = n - cols;

  const list = [];

  function formatList(zeroCount, oneCount, str) {
    if (str.length === n) {
      list.push(parseInt(str, 2));
      return;
    }

    if (zeroCount > 0) formatList(zeroCount - 1, oneCount, str + '0');
    if (oneCount > 0) formatList(zeroCount, oneCount - 1, str + '1');
  }

  formatList(zeroCount, oneCount, '');

  const matrixList = mat.map((i) => parseInt(i.join(''), 2));

  let result = 0;
  for (let i = 0; i < list.length; ++i) {
    let count = 0;

    for (let j = 0; j < matrixList.length; ++j) {
      if ((matrixList[j] & list[i]) === 0) {
        count++;

        result = Math.max(count, result);
      }
    }
  }

  return result;
};
