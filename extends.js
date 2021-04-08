function Parent() {
  this.names = ["kevin", "daisy"];
}

Parent.prototype.getName = function () {
  console.log("getName!");
};

function Child() {}

Child.prototype = new Parent();

var c = new Child();
var d = new Child();
c.getName();

c.names.push("yuzelin");
console.log(c.names);
console.log(d.names);
//原型链继承    引用类型会相互影响，创建child实例时不能传参
