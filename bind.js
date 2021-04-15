// bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数

// 返回一个函数
// 可以传入参数

var foo = {
  value: 1,
};

function car() {
  console.log("car");
  return "car";
}

function bar(name, age) {
  this.habit = "baoyu";
  console.log(this.value);
  console.log(name);
  console.log(age);
  return 2;
}

var bindFoo = bar.bind(foo, "yuzelin"); //不管是bind，apply，call，这个参数是给前面那个函数用的
bindFoo("13");

// Function.prototype.bind2 = function (arg) {
//   var self = this;
//   var args = Array.from(arguments).slice(1);
//   return function () {
//     var bindArgs = Array.from(arguments);
//     return self.apply(arg, args.concat(bindArgs));
//   };
// };

Function.prototype.bind2 = function (arg) {
  
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    //当作为构造函数时，this指向实例，此结果为true，将绑定函数的this指向该实例，可以让实例获取来自绑定函数的值
    //以上是demo为例，如果改成 this instanceof fBound ？ null ： context  实例只是一个空对象，将null改成this，实例会具有habit属性
    //当作为普通函数时 this指向window 此时结果为false 将绑定函数的this 指向context
    return self.apply(
      this instanceof fNOP ? this : arg,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;

  fBound.prototype = new fNOP();

  return fBound;
};

bar.prototype.friend = "gaotuoxiao";

var bind2Foo = bar.bind2(foo, "taooujiang");
var newBar2 = new bind2Foo("298");
console.log(newBar2.habit);
console.log(newBar2.friend);
console.log(newBar2);
//bind的另一个特点一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

var value = 2;

var bindBar = bar.bind(foo, "hanshenghao1");

var newBar = new bindBar("56");
console.log(newBar.habit);
console.log(newBar.friend);
console.log(newBar);