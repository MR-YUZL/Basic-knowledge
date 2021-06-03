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
const arr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  "string",
  { name: "弹铁蛋同学" },
];

// function flat(arr) {
//   let arrRes = [];
//   arr.forEach((item) => {
//     if (Array.isArray(item)) {
//       arrRes = arrRes.concat(flat(item));
//     } else {
//       arrRes.push(item);
//     }
//   });
//   return arrRes;
// }

// function flat(arr) {
//   let arrRes = [];
//   arrRes = arr.reduce((per, cur) => {
//     if (Array.isArray(cur)) {
//       per = per.concat(flat(cur));
//     } else {
//       per.push(cur);
//     }
//     return per;
//   }, []);
//   return arrRes;
// }

// function flat(arr) {
//   return arr.reduce(
//     (per, cur) => per.concat(Array.isArray(cur) ? flat(cur) : cur),
//     []
//   );
// }

// function flat(arr) {
//   let arrRes = [];
//   let stack = [].concat(arr);
//   while (stack.length !== 0) {
//     let val = stack.pop();
//     if (Array.isArray(val)) {
//       stack.push(...val);
//     } else {
//       arrRes.push(val);
//     }
//   }
//   return arrRes;
// }

// function flat(arr, num = 1) {
//   return num > 0
//     ? arr.reduce(
//         (per, cur) => per.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
//         []
//       )
//     : [].concat(arr);
// }

// Array.prototype.fakeFlat = function (num = 1) {
//   if (!Number(num) || Number(num) < 0) {
//     return this;
//   }

//   let arr = [].concat(this);

//   while (num > 0) {
//     if (arr.some((v) => Array.isArray(v))) {
//       arr = [].concat.apply([], arr);
//     } else {
//       break;
//     }
//     num--;
//   }

//   return arr;
// };

// console.log(arr.fakeFlat(Infinity));

let arr3 = arr.flat(0);
arr3[0] = 10;
console.log(arr3, arr);
const arr2 = [1, [3, 4], , ,];

// let arr4 = arr2;

// arr4 = [2];
// console.log(arr4, arr2);
// let i = 0;
// arr2.forEach((v) => i++);
// console.log(i);

// arr2.reduce((per, cur) => {
//   console.log(cur);
//   return per;
// }, 0);

Array.prototype.fakeFlat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) {
    return [].concat(this);
  }

  let arr = [];

  this.forEach((val) => {
    if (Array.isArray(val)) {
      arr = [].concat(val.fakeFlat(num - 1));
    } else {
      arr.push(val);
    }
  });

  return arr;
};

// 大多数ES6方法会挑过空位
// forEach(), filter(), reduce(), every() 和some() 都会跳过空位。

let arr4 = arr2.map((v, index) => {
  console.log("v", v, index);
  return v
});

console.log(arr4)

// join() 和 toString() 会将空位视为 undefined，而undefined 和 null 会被处理成空字符串。

// ES6 明确将空位转为 undefined。

// entries()、keys()、values()、find() 和 findIndex() 会将空位处理成 undefined。
// for...of 循环会遍历空位。
// fill() 会将空位视为正常的数组位置。
// copyWithin() 会连空位一起拷贝。 会修改原数组  从数组的指定位置拷贝元素到数组的另一个指定位置中。
// 扩展运算符（...）也会将空位转为 undefined。
// Array.from 方法会将数组的空位，转为 undefined。
