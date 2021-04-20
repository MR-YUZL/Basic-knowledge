function* example() {
  yield 1;
  yield 2;
  yield 3;
}

const iter = example();
console.log("iter", iter);

console.log(iter.next()); //{ value: 1, done: false }
console.log(iter.next()); //{ value: 2, done: false }
console.log(iter.next()); //{ value: 3, done: false }
console.log(iter.next()); //{ value: undefined, done: true }
// 当调用生成器函数 example() 时，并非立即执行该函数，而是返回一个生成器对象。
// 每当调用生成器对象的.next() 方法时，函数将运行到下一个 yield 表达式，返回表达式结果并暂停自身。
// 当抵达生成器函数的末尾时，返回结果中 done 的值为 true，value 的值为 undefined。
// 我们将上述 example() 函数称之为生成器函数

// 普通函数使用 function 声明，生成器函数用 function*声明
// 普通函数使用 return 返回值，生成器函数使用 yield 返回值
// 普通函数是 run to completion 模式，即普通函数开始执行后，会一直执行到该函数所有语句完成，
// 在此期间别的代码语句是不会被执行的；生成器函数是 run-pause-run 模式，即生成器函数可以在函数运行中被暂停一次或多次，
// 并且在后面再恢复执行，在暂停期间允许其他代码语句被执行

//迭代器Generators(生成器)
