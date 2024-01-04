function generateCombinations(start, end, selectNum) {
  const result = [];
  function combine(start, end, selectNum, prefix = []) {
    if (selectNum === 0) {
      result.push(prefix);
      return;
    }
    for (let i = start; i <= end; i++) {
      combine(i + 1, end, selectNum - 1, [...prefix, i]);
    }
  }
  combine(start, end, selectNum);
  return result;
}

const combinations = generateCombinations(0, 12, 6);
console.log(combinations);
