const a = "asd";

console.log(a.charAt(1));

const phone = "13525890560";

const e = phone.slice(-4);
const p = phone.slice(0, 3);

const newPhone = e.padStart(phone.length, "*");

console.log(newPhone);

function Person() {
  this.a = "1";
  this.c = null;
}

Person.prototype.b = 1;

const g = new Person();

const r = new g.constructor();

console.log(r);

const arr = [1, null];
for (const key in r) {
  console.log(key);
}
