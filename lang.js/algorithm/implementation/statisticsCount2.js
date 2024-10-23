/**
 * @explain 统计重复个数, 循环节方法
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
var getMaxRepetitions = function (s1, n1, s2, n2) {
  if (n1 == 0) return 0;
  let index = 0;
  let s1cnt = 0;
  let s2cnt = 0;
  let recall = {};
  while (true) {
    s1cnt++;
    for (let j = 0; j < s1.length; j++) {
      if (s1[j] == s2[index]) {
        index++;
      }
      if (index == s2.length) {
        index = 0;
        s2cnt++;
      }
    }
    if (s1cnt == n1) {
      return parseInt(s2cnt / n2);
    }
    if (recall[index]) {
      /*
       * 找到循环节
       * 计算循环节数量
       * 计算每个循环节中s2出现的次数
       * 计算s2总共出现的次数，包括循环节之前的和循环节中的
       * 计算循环节之后剩余的s1的数量
       * 计算剩余的s1中s2出现的次数（暴力匹配）
       * 最终返回总共出现的次数
       */
      let [s1cnt_prime, s2cnt_prime] = recall[index];
      let [in_loop_s1cnt, in_loop_s2cnt] = [s1cnt - s1cnt_prime, s2cnt - s2cnt_prime];
      let loop_count = parseInt((n1 - s1cnt_prime) / in_loop_s1cnt) * in_loop_s2cnt + s2cnt_prime;
      let rest_s1 = (n1 - s1cnt_prime) % in_loop_s1cnt;
      for (let k = 0; k < rest_s1; k++) {
        for (let j = 0; j < s1.length; j++) {
          if (s1[j] == s2[index]) {
            index++;
          }
          if (index == s2.length) {
            index = 0;
            loop_count++;
          }
        }
      }
      return parseInt(loop_count / n2);
    } else {
      recall[index] = [s1cnt, s2cnt];
    }
  }
};

console.log(getMaxRepetitions('acb', 4, 'ab', 2));
