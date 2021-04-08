//谈谈你对 JS 原型和原型链的理解？
//候选人：JS 原型是指为其它对象提供共享属性访问的对象。在创建对象时，每个对象都包含一个隐式引用指向它的原型对象或者 null。每一个对象都会从原型"继承"属性。
//原型也是对象，因此它也有自己的原型。这样构成一个原型链。
//原型链有什么作用？
//在访问一个对象的属性时，实际上是在查询原型链。这个对象是原型链的第一个元素，
//先检查它是否包含属性名，如果包含则返回属性值，否则检查原型链上的第二个元素，以此类推。
// 那如何实现原型继承呢？
// 有两种方式。一种是通过 Object.create 或者 Object.setPrototypeOf 显式继承另一个对象，将它设置为原型。

// 另一种是通过 constructor 构造函数，在使用 new 关键字实例化时，会自动继承 constructor 的 prototype 对象，作为实例的原型。

// 在 ES2015 中提供了 class 的风格，背后跟 constructor 工作方式一样，写起来更内聚一些。
//ConstructorB 如何继承 ConstructorA ？
//JS 里的继承，是对象跟对象之间的继承。constructor 的主要用途是初始化对象的属性。

// 因此，两个 Constructor 之间的继承，需要分开两个步骤。

// 第一步是，编写新的 constructor，将两个 constructor 通过 call/apply 的方式，合并它们的属性初始化。按照超类优先的顺序进行。

// 第二步是，取出超类和子类的原型对象，通过 Object.create/Object.setPrototypeOf 显式原型继承的方式，设置子类的原型为超类原型。

// 整个过程手动编写起来比较繁琐，因此建议通过 ES2015 提供的 class 和 extends 关键字去完成继承，它们内置了上述两个步骤。

function Person() {
  this.name = "余泽霖";
  this.age = "15";
}
let p = new Person();
Person.prototype.name = "高拖小";
p.name = "淘瓯江";
delete p.name;

console.log("p", p.name); //如果仅仅是打印p，拿不到name值
console.log("p", Person.__proto__);
console.log(p.__proto__ === Person.prototype);
//每个原型都有一个 constructor 属性指向关联的构造函数。
console.log(Person === Person.prototype.constructor);
console.log(p.constructor === Person.prototype.constructor);
console.log(Object.getPrototypeOf(p) === Person.prototype);

var obj = new Object();
obj.name = "鲍玉";

//原型也是对象，原型的原型可以在往上推，是Object.prototype,Object()为构造函数

console.log(Object.prototype.__proto__ === null);

//__proto__
//其次是 __proto__ ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，
// 实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，
// 当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)。

//Function__proto__===Function.prototype  Function本身就是一个内置对象，所以是自己生成了自己
