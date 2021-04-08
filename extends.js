// function Parent() {
//   this.names = ["kevin", "daisy"];
// }

// Parent.prototype.getName = function () {
//   console.log("getName!");
// };

// function Child() {}

// Child.prototype = new Parent();
// Child.prototype.constructor = Child;  //原型更改时需要更改构造器指向
// var c = new Child();
// var d = new Child();
// c.getName();
// console.log("Child", Child.prototype.constructor);
// c.names.push("yuzelin");
// console.log(c.names);
// console.log(d.names);
//原型链继承    引用类型会相互影响，创建child实例时不能传参

// function Parent(name) {
//   this.name = name; //如果这里有方法，创建实例时会被多次创建
// }

// Parent.prototype.getName = function () {
//   console.log("getName!");
// };

// function Child(name) {
//   Parent.call(this, name); //call一个个传值，apply传数组
// }

// // Child.prototype = Parent.prototype;   //如果不更改原型，则为构造函数继承,直接继承会导致下面如果更改Child.prototype，则会影响Parent.prototype

// Child.prototype = new Parent();

// var c = new Child(["kevin", "daisy"]);
// var d = new Child(["kevin", "daisy"]);
// c.getName();
// c.name.push("yuzelin");
// Child.prototype.test = 1;
// console.log(c.name);
// console.log(d.name);
// console.log(c.getName === d.getName); //true
// console.log("Child.prototype", Child.prototype);
// console.log("Parent.prototype", Parent.prototype);
//组合继承 避免了引用类型影响，可以传参
//方法都在构造函数中定义，每次创建实例都会创建一遍方法。  call创建一次，new创建一次

//原型式继承
// function creatObj(o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }
// var b = {
//   name: "yuzelin",
//   age: "12",
// };
// var a = creatObj(b);
// console.log("a", a.name);
//跟原型继承一样，简单，但是引用类型会相互影响

// function Parent(name) {
//   this.name = name;
//   this.names = ["kevin", "daisy"];
//   this.getName = function () {
//     console.log("getName!");
//   };
// }

// Parent.prototype.handleAdd = function () {
//   console.log("handleAdd!");
// };

// function Child(name) {
//   Parent.call(this, name);
//   this.age = "11";
// }

// var F = function () {};

// F.prototype = Parent.prototype;

// Child.prototype = new F();

// var a = new Child("yuzelin");

// a.handleAdd();
// a.names.push("111");

// var b = new Child("taooujiang");
// console.log("a", a.names);
// console.log("b", b.names);
// console.log(a.getName === b.getName);  //false

//寄生式继承
//这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype
// 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
// 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

//封装下上面的方法
// function object(o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }

// function prototype(child, parent) {
//   var prototype = object(parent.prototype);
//   prototype.constructor = child;
//   child.prototype = prototype;  //对象的prototype指向谁，都要注意构造器也需要改变
// }

// prototype(Child, Parent);

// constructor确实不会影响原型链继承，constructor 用来指向对象关联的函数，
// 值得注意的一点就是如果用一个新对象覆盖函数的 prototype 
// 属性值，新对象没有 constructor 属性，实例不能通过 constructor 指向正确的构造函数。

function Parent(){}
function Child(){}
var obj = {}
Child.prototype = Parent.prototype

var a = new Child()
console.log(a.constructor)