function* example() {
  yield 1;
  console.log(1);
  yield 2;
  console.log(2);
  yield 3;
}

const iter = example();
console.log("iter", iter);

console.log(iter.next()); //{ value: 1, done: false }
//1
console.log(iter.next()); //{ value: 2, done: false }
//2
// console.log(iter.next()); //{ value: 3, done: false }
// console.log(iter.next()); //{ value: undefined, done: true }
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

// yield 关键字在 Javascript 中如何实现呢？

// 首先，生成器不是线程。支持线程的语言中，多段不同的代码可以在同一时候运行，这经常会导致资源竞争，
// 使用得当会有不错的性能提升。生成器则完全不同，Javascript 执行引擎仍然是一个基于事件循环的单线程环境，
// 当生成器运行的时候，它会在叫做 caller 的同一个线程中运行。执行的顺序是有序、确定的，并且永远不会产生并发。
// 不同于系统的线程，生成器只会在其内部用到 yield 的时候才会被挂起。

// 既然生成器并非由引擎从底层提供额外的支持，我们可以沿用上文在 C#中对 yield 特性的原理探究的经验，将生成器视为一个语法糖
// ，用一个辅助工具将生成器函数转换为普通的 Javascript 代码，在经过转换的代码中，
// 有两个关键点，一是要保存函数的上下文信息，二是实现一个完善的迭代方法，使得多个 yield 表达式按序执行，
// 从而实现生成器的特性。

// Regenerator(辅助工具) 将生成器函数中的 yield 表达式重写为 switch case，同时，
// 在每个 case 中使用 context$1$0 来保存函数当前的上下文状态。

// switch case 之外，迭代器函数 example 被 regeneratorRuntime.mark 包装，
// 返回一个被 regeneratorRuntime.wrap 包装的迭代器对象。
// 此时已经继承了GeneratorFunctionPrototype上的方法

// runtime.mark = function(genFun) {
//   if (Object.setPrototypeOf) {
//     Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
//   } else {
//     genFun.__proto__ = GeneratorFunctionPrototype;
//   }
//   genFun.prototype = Object.create(Gp);
//   return genFun;
// };

// 当调用迭代器对象 iter.next() 方法时，因为有如下代码，所以会执行_invoke 方法，
// 而根据前面 wrap 方法代码可知，最终是调用了迭代器对象的 makeInvokeMethod (innerFn, self, context); 方法

//makeInvokeMethod 返回 invoke 函数，当我们执行.next 方法时，实际调用的是 invoke 方法中的下面语句
// 这里 tryCatch 方法中 fn 为经过转换后的 example$方法，arg 为上下文对象 context,
//  因为 invoke 函数内部对 context 的引用形成闭包引用，所以 context 上下文得以在迭代期间一直保持。

//tryCatch 方法会实际调用 example$方法，进入转换后的 switch case,
// 执行代码逻辑。如果得到的结果是一个普通类型的值，我们将它包装成一个可迭代对象格式，
// 并且更新生成器状态至 GenStateCompleted 或者 GenStateSuspendedYield

var record = tryCatch(innerFn, self, context);
if (record.type === "normal") {
  // If an exception is thrown from innerFn, we leave state ===
  // GenStateExecuting and loop back for another invocation.
  state = context.done ? GenStateCompleted : GenStateSuspendedYield;

  var info = {
    value: record.arg,
    done: context.done,
  };
}

// 通过对 Regenerator 转换后的生成器代码及工具源码分析，我们探究了生成器的运行原理。
// Regenerator 通过工具函数将生成器函数包装，为其添加如 next/return 等方法。
// 时也对返回的生成器对象进行包装，使得对 next 等方法的调用，最终进入由 switch case 组成的状态机模型中。
// 除此之外，利用闭包技巧，保存生成器函数上下文信息。

//通过*来判断是否为生成器函数，执行时通过辅助工具来将函数进行包装，为其添加next等放方法，利用闭包来保存函数的上下文
//switch case来控制顺序，当调用next函数时返回一个包装后的对象{value:'',done:fasle}
