//Number 类型使用 IEEE754 标准来表示整数和浮点数值

//所谓 IEEE754 标准，全称 IEEE 二进制浮点数算术标准，这个标准定义了表示浮点数的格式等内容。
//在 IEEE754 中，规定了四种表示浮点数值的方式：单精确度（32位）、双精确度（64位）、延伸单精确度、与延伸双精确度。
// 像 ECMAScript 采用的就是双精确度，也就是说，会用 64 位字节来储存一个浮点数。

//0.1 转成二进制时是一个无限循环的数

// 这个标准认为，一个浮点数 (Value) 可以这样表示：

// Value = sign * exponent * fraction

//-1020  -1 * 10^3 * 1.02
//sign 就是 -1，exponent 就是 10^3，fraction 就是 1.02

// 0.1 的二进制 0.00011001100110011…… 这个数来说：1 * 2^-4 * 1.1001100110011……

//关于浮点数的运算，一般由以下五个步骤完成：对阶、尾数运算、规格化、舍入处理、溢出判断
//因为两次存储时的精度丢失加上一次运算时的精度丢失，最终导致了 0.1 + 0.2 !== 0.3

// 十进制转二进制
// parseFloat(0.1).toString(2);
// => "0.0001100110011001100110011001100110011001100110011001101"

// 二进制转十进制
// parseInt(1100100,2)
// => 100
