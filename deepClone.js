const a1 = [1, 2, 3, [3]];
const a2 = [].concat(a1);

a2[3].push(3);
// console.log(a1, a2);

const a3 = [1, 3, 4, null, undefined, { a: 1 }, { a: 1 }, 1, ,];

// const a4 = { a: 1, b: 2 };
// const a5 = { b: 2, a: 1 };

const a4 = {A:() => {
  return 1;
}}

const map = new Map();

console.log(map);

const arr = [];
for (const [key, value] of map) {
  arr.push(key);
}
console.log(arr);

// Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

function unique(arr) {
  const unique = {};

  arr.forEach((item) => {
    unique[JSON.stringify(item)] = item;
  });

  return Object.keys(unique).map((v) => {
    return v === "undefined" ? undefined : JSON.parse(v);
  });
}

// console.log(unique(a3));

// 赋值与拷贝
// 存放在栈中的数据具有数据大小确定，内存空间大小可以分配、直接按值存放的特点。所以存放在栈中的数据可以直接访问，我们在修改字符串或其他基本数据类型变量时，实际上是返回了一个新的值，而不是【改变】原始值。

// 引用数据类型的变量并不是存放的实际值，而是一个存放在栈内存的指针，该指针指向堆内存中的某个地址。每个数据所占的空间大小不一致，需要根据情况进行特定的分配。与基本数据类型不同，引用类型的值是可以改变的。

let a = 5;
let b = a;

a = 3;
console.log(b);

// 浅拷贝与赋值是有所区别的，赋值时与原数据指向同一对象，而浅拷贝则指向了不同对象。

function deep(obj) {
  const o = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      o[key] = obj[key];
    }
  }

  return o;
}

// 浅拷贝  创建一个新对象，这个对象对原始对象的属性值有一份精确拷贝 如果属性值是基本类型，拷贝的就是基本类型的值，如果是引用类型，拷贝的是地址  所以如果属性值的对象改变就会影响另一个

function deep2(obj, hash = new WeakMap()) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  if (hash.get(obj)) {
    return obj;
  }
  const dist = new obj.constructor();

  hash.set(obj, dist);
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (obj[key] && typeof obj[key] === "object") {
        dist[key] = deep2(obj[key]);
      } else {
        dist[key] = obj[key];
      }
    }
  }

  return dist;
}

//深拷贝 将对象从内存中完整的拷贝出来，在堆内存中开辟新区域存放新对象

const d = {
  a: "1",
  b: {
    c: 1,
  },
};

const e = deep2(d);

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
target.target = target;

// const target2 = deep2(target);

// JSON.parse(JSON.stringify())

function deepClone(obj, hash = new WeakMap()) {
  //深拷贝
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  if (hash.get(obj)) return hash.get(obj); //避免循环引用
  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

const q = {
  c: {
    d: 1,
    e: function () {
      return 3;
    },
    f: /^[1]([3-9])[0-9]{9}$/,
  },
  a: function () {
    return 1;
  },
  b: /^[1]([3-9])[0-9]{9}$/,
};

const f = deep2(q);

q.c.f = 1;
const target3 = deepClone(target);
const hash = new WeakMap();

console.log(f);
// hash.set({ a: 1 }, { a: 1 });
const obj = [];
const obj2 = obj.constructor;
// 因为我们还使用了原对象的构造方法，所以它可以保留对象原型上的数据，如果直接使用普通的 {}，那么原型必然是丢失了的。
console.log(new obj2());
