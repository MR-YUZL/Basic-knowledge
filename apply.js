//调用 call 和 apply 的对象，必须是一个函数 Function
//改变函数执行的上下文，将一个对象的方法交给另一个对象来执行，并且是立即执行

let obj = {
  foo: "1",
};

function func(a, b, c) {
  console.log(a, b, c);
}

func.call(obj, 1, 2, 3); // 1,2,3

func.call(obj, [1, 2, 3]); //[1,2,3]  undefined undefined

// 调用 call 的对象，必须是个函数 Function。
// call 的第一个参数，是一个对象。 Function 的调用者，将会指向这个对象。如果不传，则默认为全局对象 window。
// 第二个参数开始，可以接收任意个参数。每个参数会映射到相应位置的 Function 的参数上。但是如果将所有的参数作为数组传入，它们会作为一个整体映射到 Function 对应的第一个参数上，之后参数都为空。

// func.apply(obj, 1); //TypeError:CreateListFromArrayLike called on non-object
func.apply(obj, [1, 2, 3]); // 1,2,3

func.apply(obj, {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
}); // 1,2,3

//类数组  可以通过角标拿数据，有length属性，可通过for循环遍历，但Array.prototype上的方法用不了

//call apply使用场景

//继承

function Foo() {
  this.a = 1;
  this.print = function () {
    console.log(this.b);
  };
}

function Bar() {
  Foo.call(this);
  this.b = "b";
  this.print();
}

let b = new Bar();
console.log("b", b); //{ a: 1, b: 'b',print: [Function] }
b.print();

let arg = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

console.log(Array.prototype.slice.call(arg, 1));

//apply应用
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let max = Math.max.apply(null, arr1);
let min = Math.min.apply(null, arr1);

console.log("min", min);
console.log("max", max);
console.log("push", Array.prototype.push.apply(arr1, arr2), arr1);
