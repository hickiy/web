/**
 * 在js中所有的字符都使用UTF-16编码，即每个字符占用16位，即2个字节，即一个码元
 * 但是UTF-16编码中有一些字符是占用4个字节的，这些字符称为代理对
 * 代理对是一对码元，第一个码元的范围是0xD800-0xDBFF，第二个码元的范围是0xDC00-0xDFFF
 * 在字符串的length属性中，代理对算作2个字符
 */
// 如何检查一个字符是否是代理对的第一个码元，请看下面的代码
function isHighSurrogate(char) {
    return char >= 0xD800 && char <= 0xDBFF;
}
function isLowSurrogate(char) {
    return char >= 0xDC00 && char <= 0xDFFF;
}
