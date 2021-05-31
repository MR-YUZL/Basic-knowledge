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

function flat(arr) {
  let arrRes = [];
  let stack = [].concat(arr);
  while (stack.length !== 0) {
    let val = stack.pop();
    if (Array.isArray(val)) {
      stack.push(...val);
    } else {
      arrRes.push(val);
    }
  }
  return arrRes;
}

console.log(flat(arr));
