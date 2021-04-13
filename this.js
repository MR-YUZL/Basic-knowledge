function Foo() {
    this.getTime = function () {
      console.log("1");
    };
  return this;
}

Foo.prototype.getTime = function () {
  console.log("2");
};

new Foo().getTime();
let a = new Foo();
console.log("a", a);
console.log(this); //在浏览器的环境下全局this = window
// a.getTime();

function func() {
  c = "c"; //浏览器下，c会被添加到window对象下
}
func();

// Reference 类型就是用来解释诸如 delete、typeof 以及赋值等操作行为的。 “只存在于规范里的抽象类型”。
// 它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。


