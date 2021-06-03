// flat 数组扁平化
// flat每次返回新数组 不影响原数组
// 不传参数，降一维
// 参数小于等于零，返回原数组 浅拷贝
// 参数为Infinity 无论多少层都拉平
// flat跳过空位

const a1 = [1, 2, 3, [3]];
const a2 = a1.flat(0);

a1.push(1);
a1[3].push(3)
console.log(a2, a1);
