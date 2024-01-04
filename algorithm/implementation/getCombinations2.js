const list = [];

function formatList(zeroCol, oneCol, str) {
  if (str.length === 12) {
    list.push(str);
    return;
  }

  if (zeroCol > 0) formatList(zeroCol - 1, oneCol, str + '0');
  if (oneCol > 0) formatList(zeroCol, oneCol - 1, str + '1');
}

formatList(6, 6, '');
console.log(list);
