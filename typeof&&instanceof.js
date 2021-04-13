// typeof 一般被用于判断一个变量的类型，我们可以利用 typeof 来判断number,  string,  object,  boolean,  function, undefined,  symbol 这七种类型，这种判断能帮助我们搞定一些问题，比如在判断不是 object 类型的数据的时候，typeof能比较清楚的告诉我们具体是哪一类的类型。但是，很遗憾的一点是，typeof 在判断一个 object的数据的时候只能告诉我们这个数据是 object, 而不能细致的具体到是哪一种 object, 比如👉

let s = new String('abc');
typeof s === 'object'// true
s instanceof String // true

// js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息
// 000：对象
// 010：浮点数
// 100：字符串
// 110：布尔
// 1：整数

// null：所有机器码均为0

// undefined：用 −2^30 整数来表示

typeof null === 'object'// true
null instanceof null // TypeError: Right-hand side of 'instanceof' is not an object
// null 直接被判断为不是 object，这也是 JavaScript 的历史遗留bug
// Object.prototype.toString.call

Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
