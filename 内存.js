// 内存分配 -> 内存使用 -> 内存释放。
// 如果内存不需要时，没有经过生命周期的释放期，那么就存在内存泄漏。
// JavaScript 语言不需要程序员手动分配内存，绝大部分情况下也不需要手动释放内存，对 JavaScript 程序员来说通常就是使用内存（即使用变量、函数、对象等）

// 使用值的过程实际上是对分配内存进行读取与写入的操作。读取与写入可能是写入一个变量或者一个对象的属性值，甚至传递函数的参数。

// 给数值变量分配内存
let number = 123;
// 给字符串分配内存
const string = "xianshannan";
// 给对象及其包含的值分配内存
const object = {
  a: 1,
  b: null,
};
// 给数组及其包含的值分配内存（就像对象一样）
const array = [1, null, "abra"];
// 给函数（可调用的对象）分配内存
function func(a) {
  return a;
}

// 写入内存
number = 234;
// 读取 number 和 func 的内存，写入 func 参数内存
func(number);

// 内存泄漏一般都是发生在这一步，JavaScript 的内存回收机制虽然能回收绝大部分的垃圾内存，但是还是存在回收不了的情况，如果存在这些情况，需要我们手动清理内存。

// “这个对象”分配给 a 变量
var a = {
  a: 1,
  b: 2,
};
// b 引用“这个对象”
var b = a;
// 现在，“这个对象”的原始引用 a 被 b 替换了
a = 1;

console.log(b);

// 当前执行环境中，“这个对象”内存还没有被回收的，需要手动释放“这个对象”的内存
// b = null;

// 引用计数法  标记清除法

// E6中有强引用与弱引用之分，目前只在Set和Map中有
// 强引用会用引用计数叠加，计数为0的对象内存被回收，弱引用不触发引用计数

// 当变量进入执行环境时标记为“进入环境”，当变量离开执行环境时则标记为“离开环境”，被标记为“进入环境”的变量是不能被回收的，因为它们正在被使用，而标记为“离开环境”的变量则可以被回收

// 假设这里是全局变量
// b 被标记进入环境
var b = 2;
function test() {
  var a = 1;
  // 函数执行时，a 被标记进入环境
  return a + b;
}
// 函数执行结束，a 被标记离开环境，被回收
// 但是 b 就没有被标记离开环境
test();

// 全局作用域的变量只会在页面关闭才会销毁。

// 下面有些例子是在执行环境中，没离开当前执行环境，还没触发标记清除法。所以你需要读懂上面 JavaScript 的内存回收机制，才能更好理解下面的场景。

// 在全局作用域下定义
function count(number) {
  // basicCount 相当于 window.basicCount = 2;
  basicCount = 2;
  return basicCount + number;
}
// 被遗忘的计时器
// setInterval(function () {
//   // 轮询获取数据
//   this.refresh();
// }, 2000);

// 被遗忘的事件监听器
// this.resizeEventCallback = () => {
//     // 这里做一些操作
//   }
//   window.addEventListener('resize', this.resizeEventCallback)
//   window.removeEventListener('resize', this.resizeEventCallback)

let map = new Set();
let value = { test: 22 };

map.add(value);

value = null;
// map.delete(value)加delete，内存才不会泄露
console.log(map);

// let map = new WeakSet(); //弱引用
// let value = { test: 22};
// map.add(value);

// value = null;

let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
key = null;
// map.delete(key) //此时不会泄露

// let map = new WeakMap(); //弱引用
// let key = new Array(5 * 1024 * 1024);
// map.set(key, 1);

// key = null;

// 假设订阅发布事件有三个方法 emit 、on 、off 三个方法。

// methods: {
//     onClick() {
//       customEvent.emit('test', { type: 'click' })
//     },
//   },
//   mounted() {
//     customEvent.on('test', data => {
//       // 一些逻辑
//       console.log(data)
//     })
//   },

//组件销毁时test事件还在监听中 无法收回，需要在beforeDestroy中调用off

function closure() {
  const name = "xianshannan";
  return () => {
    return name.split("").reverse().join("");
  };
}
const reverseName = closure();
// 这里调用了 reverseName
reverseName();
//此时内存并没有泄露 因为name被调用，会触发回收机制

// class Test {
//   constructor() {
//     this.elements = {
//       button: document.querySelector("#button"),
//       div: document.querySelector("#div"),
//       span: document.querySelector("#span"),
//     };
//   }
//   removeButton() {
//     document.body.removeChild(this.elements.button);
//     // this.elements.button = null  //需要手动释放内存
//   }
// }

// const a = new Test();
// a.removeButton();

// 内存泄漏时，内存一般都是会周期性的增长，我们可以借助谷歌浏览器的开发者工具进行判别。
// 打开谷歌开发者工具，切换至 Performance 选项，勾选 Memory 选项。