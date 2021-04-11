//闭包是指那些能够访问自由变量的函数。
//自由变量是指既不是函数的参数，也不是函数内的局部变量
//闭包 = 函数 + 函数能够访问的自由变量

var a = 1;

function foo() {
    console.log(a);
}

foo();

//从技术的角度讲，所有的JavaScript函数都是闭包。

// 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
// 从实践角度：以下函数才算是闭包：
// 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
// 在代码中引用了自由变量

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();

// 创建全局上下文，将全局上下文压入执行栈
// 全局执行上下文初始化
// 执行checkscope函数，创建checkscope执行上下文，压入栈
// checkscope执行上下文初始化，变量对象，this，作用域链
// 函数执行完毕，checkscope执行上下文从栈弹出
// 执行f函数，创建f执行上下文，压入栈
// f执行上下文初始化，初始化变量对象，this，作用域链
// 执行完f，f执行上下文从栈弹出

// 之所以能在checkscope执行上下文销毁后，还能拿到scope，是因为f执行上下文中维护了一个作用域链
// fContext = {
//     Scope: [AO, checkscopeContext.AO, globalContext.VO],
// }
// 即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中
// ，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();

// globalContext = {
//     VO: {
//         data: [...],
//         i: 3
//     }
// }

// data[0]();执行时，
// data[0]Context = {
//     Scope: [AO, globalContext.VO]
// }
// 函数中没有i只能去全局拿，得到3

var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();

// data[0]();执行时，
// data[0]Context = {
//     Scope: [AO, 匿名函数Context.AO globalContext.VO]
// }
// data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，
// 这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。