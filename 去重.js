var array = [
  1,
  1,
  "1",
  "1",
  null,
  null,
  undefined,
  undefined,
  new String("1"),
  new String("1"),
  /a/,
  /a/,
  /b/,
  NaN,
  NaN,
];

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    console.log(typeof item + JSON.stringify(item));
    return obj.hasOwnProperty(typeof item + JSON.stringify(item))
      ? false
      : (obj[typeof item + JSON.stringify(item)] = true);
  });
}

console.log(unique(array));

var array2 = [1, 1, "1", "1"];

function unique2(array) {
  let map = new Map();
  //   return array.filter((v) => (map.has(v) ? false : map.set(v)));
  return array.filter((v) => !map.has(v) && map.set(v));
}

function unique3(array) {
  let res = [];
  for (let i = 0; i < array.length; i++) {
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i]);
    }
  }
  return res;
}

function unique4(arr) {
  //   return arr.filter((v,index) => {
  //     return res.indexOf(v) === -1 ? res.push(v) : false;
  //   });
  return arr.filter((v, index) => {
    return arr.indexOf(v) === index;
  });
}

const obj = [{ x: 1 }, { x: 2 }, { x: 1 }];

// const sameBy = (a, fn) => {
//   return a.filter((v, index) => {
//     return a.map(fn).indexOf(fn(v)) === index;
//   });
// };

const sameBy = (a, fn) => {
  let obj = {};
  return a.reduce((per, cur) => {
    if (obj[fn(cur)]) {
      per.push(cur);
      return per;
    } else {
      obj[fn(cur)] = true;
      return per;
    }
  }, []);
};


console.log(
  "sameBy",
  sameBy(obj, (v) => v.x)
);

const differenceBy = (a, b, fn) => {
  let s = new Set(b.map(fn));
  return a.filter((v) => !s.has(fn(v)));
};

// function unique4(array, isSorted, iteratee) {
//   let res = [];
//   let seen = [];
//   for (let i = 0; i < array.length; i++) {
//     let value = array[i];
//     let computed = iteratee ? iteratee(value, i, array) : value;
//     if (isSorted) {
//       if (!i || seen !== computed) {
//         res.push(value);
//       }
//       seen = computed;
//     } else if (iteratee) {
//       if (res.indexOf(computed) === -1) {
//         res.push(value);
//       }
//     } else {
//       if (res.indexOf(value) === -1) {
//         res.push(value);
//       }
//     }
//   }
// }

if (array.length) {
  console.log("aaa");
} else if (array[2]) {
  console.log("jjjj");
}

console.log(unique2(array));
