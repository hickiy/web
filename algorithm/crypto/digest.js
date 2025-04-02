import crypto from 'crypto';
// 计算公钥的 SHA-256 指纹
let publicKey =
  '000475A444EA0F552ACF5974EB46BBA586ECAF6DCD0FF36AD594CE0553A08589CFFA886FD895C6356CC38D7E9958E75C9C1FE21F2517241E48892E6670B84EA18653';
// 公钥的 SHA-256 指纹
async function digestMessage(message) {
  console.log(message);
  // 将公钥转换为 ArrayBuffer
  const publicKeyBuffer = new Uint8Array(message);
  // 计算公钥的 SHA-256 指纹
  const digestBuffer = crypto
    .createHash('sha256')
    .update(Buffer.from(publicKeyBuffer))
    .digest();
  // 将指纹从 ArrayBuffer 转换为十六进制字符串
  const digestArray = Array.from(new Uint8Array(digestBuffer));
  const digestHex = digestArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return digestHex;
}
digestMessage(publicKey).then((digestHex) => {
  console.log(digestHex); // 输出公钥的 SHA-256 指纹
});