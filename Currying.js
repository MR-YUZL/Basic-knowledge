//在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
// function ajax(type, url, data) {
//   var xhr = new XMLHttpRequest();
//   xhr.open(type, url, true);
//   xhr.send(data);
// }

// ajax("post", "www.biadu.com", "name=yuzelin");
// ajax("post", "www.biadu1.com", "name=yuzelin");
// ajax("post", "www.biadu2.com", "name=yuzelin");

// var ajaxCurry = curry(ajax);

// var post = ajaxCurry("post");

// post("www.baidu.com", "name=yuzelin");

// var postFrom = post("www.baodu.com");

// postFrom("name=yuze"); //每次可以少传一个参数，其他参数复用之前的

// var person = [{ name: "1" }, { name: "2" }];

// var prop = curry(function (key, obj) {
//   return obj[key];
// });

// var name = person.map(prop("name"));  //直接拿到对象数组中的name值

// var curry = function (fn) {
//   var args = Array.prototype.slice.call(arguments, 1);
//   return function () {
//     var newArgs = args.concat(Array.prototype.slice.call(arguments));
//     return fn.apply(this, newArgs);
//   };
// };

// function add(a, b) {
//   return a + b;
// }

// var addCurry = curry(add);

// console.log(addCurry(1)(2));
// console.log(add);

// function sub_curry(fn) {
//   var args = [].slice.call(arguments, 1);
//   return function () {
//     return fn.apply(this, args.concat([].slice.call(arguments)));
//   };
// }

// function curry(fn, length) {
//   length = length || fn.length;

//   var slice = Array.prototype.slice;

//   return function () {
//     if (arguments.length < length) {
//       var combined = [fn].concat(slice.call(arguments));
//       return curry(sub_curry.apply(this, combined), length - arguments.length);
//     } else {
//       return fn.apply(this, arguments);
//     }
//   };
// }

// function curry(fn, args) {
//   var length = fn.length;
//   args = args || [];

//   return function () {
//     var _args = [...args],
//       i,
//       arg;
//     for (i = 0; i < arguments.length; i++) {
//       arg = arguments[i];
//       _args.push(arg);
//     }

//     if (_args.length < length) {
//       return curry.call(this, fn, _args);
//     } else {
//       return fn.apply(this, _args);
//     }
//   };
// }

// var fn = curry(function (a, b, c) {
//   return [a, b, c];
// });

// console.log(fn("a", "b", "c"));
// console.log(fn("a")("b", "c"));
// console.log(fn("a", "b")("c")); //_占位符
// console.log(fn("a")("b")("c"));

//以最后一个为例
// function fn2(a) {
//   return function fn1(b) {
//     return function fn0(c) {
//       return fn();
//     };
//   };
// }

var foo = function (a, ...args) {
  console.log(a, args);
};

foo(1, 2, 3);

// var curry = (fn) =>
//   (judge = (...args) =>
//     args.length === fn.length ? fn(...args) : (arg) => judge(...args, arg));

// const curry = (fn, ...args) => {
//   return args.length >= fn.length
//     ? fn(...args)
//     : (..._args) => curry(fn, ..._args, ...args);
// };
