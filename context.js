//当javascript执行到一段可执行代码时，会创建对象的执行上下文
//每个执行上下文有三个重要属性
//变量对象 作用域链 this

// 当查找变量时，会先从当前执行上下文的变量对象去找，没找到再去父级的执行上下文的变量对象去找，一直找到全局执行上下文，这样
// 由多个执行上下文的变量对象构成的链表叫做作用域链
function foo(c) {
  var a = 1;
  function bar() {}
  console.log(arguments);
}

let bar = () => {
  console.log("this", this);
};

//函数的作用域在函数定义的时候就决定了
// 函数有一个内部属性[scope]，当函数创建的时候，就会保存父级的变量对象，注意[scope]并不代表完整的作用域链

// foo.[[scope]] = [
//     globalContext.VO  //变量对象(variable object)
// ];

//变量对象是执行上下文下的数据作用域，存储了上下文当中定义的变量和函数声明
//全局对象是预定义的对象，是作用域链的头，在顶层声明变量会成为全局对象
//在客户端中全局对象就是window
//全局上下文的变量对象就是全局对象

// bar.[[scope]]= [
//     globalContext.VO,
//     fooContext.AO  //活动对象(activation object)   在函数上下文当中活动对象表示变量对象
// ]

//函数激活之后，进入函数上下文，创建VO/AO，将活动对象添加到作用域前端
// 此时执行上下文的作用域链
// scope = [AO].concat([[scope]])
//作用域创建完毕,此时活动对象上的属性才能被访问

foo("a");
bar();

var scope = "global scope";
function checkscope() {
  var scope2 = "local scope";
  return scope2;
}
checkscope();

//创建checkscop函数，保存作用域链到内部属性[[scope]]
// checkscope.[[scope]] = [
//     globalContext.VO
// ]

//执行checkscope函数，创建checkscope函数上下文，checkscope函数上下文被压入执行栈
//ECStack = [checkscopeContext,globalContext]

//checkscope函数并不立刻执行，开始做准备工作，复制函数[[scope]]属性，创建作用域链

checkscopeContext = { Scope: checkscope[[scope]] };

//用arguments 创建活动对象，初始化活动对象，加入形参，函数声明，变量声明

checkscopeContext = {
  AO: {
    arguments: {
      length: 0,
    },
    scope2: undefined,
  },
  Scope: checkscope[[scope]],
};

//将活动对象压入作用域链顶部

checkscopeContext = {
  AO: {
    arguments: {
      length: 0,
    },
    scope2: undefined,
  },
  Scope: [AO, [[scope]]],
};

//准备工作做完，开始执行函数，随着函数执行修改AO的值

checkscopeContext = {
  AO: {
    arguments: {
      length: 0,
    },
    scope2: "local scope",
  },
  Scope: [AO, [[scope]]],
};

//查到scope2的值，返回后函数执行完毕，函数上下文从执行栈弹出，
ECStack = [globalContext];
