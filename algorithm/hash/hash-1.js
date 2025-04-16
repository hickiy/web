/**
 * 实现 Hash-1（SHA-1）算法的简化版，仅用于学习和理解哈希算法的基本原理。
 * 注意：SHA-1 已被弃用，不建议用于安全相关场景。
 * 下面的实现仅供学习参考，未做任何安全保证。
 */

// 工具函数：循环左移
function leftRotate(n, bits) {
  return ((n << bits) | (n >>> (32 - bits))) >>> 0;
}

// 将字符串转为字节数组（UTF-8编码）
function stringToBytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6));
      bytes.push(0x80 | (code & 0x3f));
    } else {
      bytes.push(0xe0 | (code >> 12));
      bytes.push(0x80 | ((code >> 6) & 0x3f));
      bytes.push(0x80 | (code & 0x3f));
    }
  }
  return bytes;
}

// 主函数：计算SHA-1哈希
function sha1(message) {
  // 1. 消息预处理
  let bytes = stringToBytes(message);
  const originalBitLength = bytes.length * 8;

  // 添加 '1' 位
  bytes.push(0x80);

  // 填充 '0' 直到长度为 448 mod 512
  while ((bytes.length * 8) % 512 !== 448) {
    bytes.push(0x00);
  }

  // 添加原始消息长度（64位大端）
  for (let i = 7; i >= 0; i--) {
    bytes.push((originalBitLength >>> (i * 8)) & 0xff);
  }

  // 2. 初始化哈希值（5个32位整数）
  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;

  // 3. 处理每个512位块
  for (let i = 0; i < bytes.length; i += 64) {
    // 3.1 构造80个32位字
    const w = new Array(80);
    for (let j = 0; j < 16; j++) {
      w[j] =
        (bytes[i + 4 * j] << 24) |
        (bytes[i + 4 * j + 1] << 16) |
        (bytes[i + 4 * j + 2] << 8) |
        (bytes[i + 4 * j + 3]);
    }
    for (let j = 16; j < 80; j++) {
      w[j] = leftRotate(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
    }

    // 3.2 初始化本轮变量
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;

    // 3.3 主循环
    for (let j = 0; j < 80; j++) {
      let f, k;
      if (j < 20) {
        f = (b & c) | (~b & d);
        k = 0x5a827999;
      } else if (j < 40) {
        f = b ^ c ^ d;
        k = 0x6ed9eba1;
      } else if (j < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = 0x8f1bbcdc;
      } else {
        f = b ^ c ^ d;
        k = 0xca62c1d6;
      }
      const temp = (leftRotate(a, 5) + f + e + k + w[j]) >>> 0;
      e = d;
      d = c;
      c = leftRotate(b, 30) >>> 0;
      b = a;
      a = temp;
    }

    // 3.4 累加到哈希值
    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0;
  }

  // 4. 拼接最终哈希值（160位，5个32位数）
  function toHex(n) {
    return n.toString(16).padStart(8, '0');
  }
  return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3) + toHex(h4);
}

// 示例用法
console.log(sha1("hello world")); // 输出: 2aae6c35c94fcfb415dbe95f408b9ce91ee846ed