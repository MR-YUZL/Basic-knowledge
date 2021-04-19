//new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

function Person(age, strength) {
  this.name = "yuzelin1";
  this.age = age;
  return {
    habit: "Games",
    strength,
  };
}

Person.prototype.age = "13";

function objectFactory() {
  const obj = new Object();
  const Constructor = [].shift.call(arguments);
  //   Object.setPrototypeOf(obj, Constructor.prototype)
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, [...arguments]);

  return obj;
}

//创建一个obj
//将构造函数从参数中分离
//将obj的原型指向构造函数，使obj能访问到构造函数原型上的数据
//将构造函数的this指向obj，obj可以拿到构造函数的属性
//返回obj

// const p = new Person();

const p = objectFactory(Person);

// function Person(age, strength) {
//   this.name = "yuzelin1";
//   this.age = age;
//   return {
//     habit: "Games",
//     strength,
//   };
// }
// const p1 = new Person("", 90);
// console.log(p1.name); // undefined
// console.log(p1.habit); // Games
// console.log(p1.strength); // 90
// console.log(p1.age); // undefined

// Object.freeze(p);

// p.name = "tao";
// console.log("p", p);

// function Otaku(age) {
//   this.strength = 60;
//   this.age = age;

//   return "handsome boy";
// }

// var person = new Otaku("18");
// console.log(person.age); // 18
// console.log(person.strength); // 60

function objectFactory() {
  const obj = new Object();
  const Constructor = [].shift.call(arguments);
  //   Object.setPrototypeOf(obj, Constructor.prototype)
  obj.__proto__ = Constructor.prototype;

  //var obj = Object.create(Constructor.prototype)
  const ret = Constructor.apply(obj, [...arguments]);

  return typeof obj === "object" ? ret || obj : obj;
}

// __proto__ ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，
// 实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，
// 可以理解成返回了 Object.getPrototypeOf(obj)。

function Foo() {
  console.log("this", this);
  this.name = "yuzelin";
}

const obj2 = new Object();
Foo.apply(obj2);

console.log("obj2", obj2);
