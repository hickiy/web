const formData = new FormData();
const formData2 = new FormData();
const arr = [1, 2, 3];
formData.append('arr', arr);
formData2.append('arr', ...arr.reverse());
console.log(formData.get('arr')); // 1,2,3
console.log(formData2.get('arr')); // 1,2,3
