function decimalToF32(decimal) {
  let buffer = new ArrayBuffer(4);
  let float32Array = new Float32Array(buffer);
  float32Array[0] = decimal;
  // console.log(float32Array, buffer);
  let uint8Array = new Uint8Array(buffer);
  let binaryString = '';
  for (let i = 3; i >= 0; i--) {
    console.log(uint8Array[i], uint8Array[i].toString(2), uint8Array[i].toString(2).padStart(8, '0'));
    binaryString += uint8Array[i].toString(2).padStart(8, '0');
  }
  return binaryString;
}

console.log(decimalToF32(16.14)); 