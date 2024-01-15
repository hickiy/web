/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
var minExtraChar = function (s, dictionary) {
  dictionary.sort((a, b) => b.length - a.length);
  let count = 0;
  for (let i = 0; i < dictionary.length; i++) {
    let word = dictionary[i];
    let index = s.indexOf(word);
    if (index !== -1) {
      s = s.replace(word, '');
      i--;
    }
  }
  return s.length;
};
s = 'bvbv';
let dictionary = ['bvb', 'bv'];

console.log(minExtraChar(s, dictionary));
