//定义函数
// function foo(){}

// var foo = function(){}
//调用函数时我们都需要在后面加一对圆括号()
//但是 function foo(){}()会报错，如果不明确告诉圆括号是一个表达式，它会将其当作没有名字的函数声明并报错，抛出一个错误，函数声明需要一个名字

// 问题1：这里我么可以思考一个问题，我们是不是也可以像这样直接调用函数 var foo = function(){console.log(1)}()，答案是可以的。
// 问题2：同样的，我们还可以思考一个问题，像这样的函数声明在后面加上圆括号被直接调用，又会出现什么情况呢？请看下面的解答。

// 在Javascript里，圆括号不能包含声明。因为这点，当圆括号为了包裹函数碰上了 function关键词，它便知道将它作为一个函数表达式去解析而不是函数声明。注意理解这里的圆括号和上面的圆括号遇到函数时的表现是不一样的，也就是说。

// 当圆括号出现在匿名函数的末尾想要调用函数时，它会默认将函数当成是函数声明。

// 当圆括号包裹函数时，它会默认将函数作为表达式去解析，而不是函数声明。

// function foo(){/* code */}(1)

// //它等同于如下，一个函数声明跟着一个完全没有关系的表达式:

// function foo(){/* code */}
// (1);

//这两种模式都可以被用来立即调用一个函数表达式，利用函数的执行来创造私有变量
// (function () {
//   console.log("a");
// }())
//括号内的表达式代表函数立即调用表达式

// (function () {
//   console.log("b");
// })();
//括号内的表达式代表函数表达式

var a = (function () {
  console.log("b");
  return 1;
})();

console.log("a", a);

// var elems = document.getElementsByTagName('a');
// for(var i = 0;i < elems.length;i++) {
//     (function(lockedInIndex){
//         elems[i].addEventListener('click',function(e){
//             e.preventDefault();
//             alert('I am link #' + lockedInIndex);
//             },false)
//     })(i);
// // }
// lockedInIndex可以没有任何问题的访问i,但是作为函数的参数使用一个不同的命名标识符可以使概念更加容易的被解释。

// 立即执行函数一个最显著的优势是就算它没有命名或者说是匿名，函数表达式也可以在没有使用标识符的情况下被立即调用，一个闭包也可以在没有当前变量污染的情况下被使用。
// Immediately-Invoked Function Expression

function foo() {
  console.log("foo");
  foo();
}
// foo();

//js模块模式

var counter = (function () {
  var i = 0;
  return {
    i,
    get: function () {
      return i;
    },
    set: function (val) {
      i = val;
    },
    increment: function () {
      return ++i;
    },
  };
})();

const { i, get, set, increment } = counter;

set(3);
increment();

console.log("i", i, increment());
