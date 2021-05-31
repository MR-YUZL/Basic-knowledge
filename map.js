const a = [1, 2, 3];
const b = a.map(JSON.stringify);

console.log(b);

const c = false || 2;
console.log(c);

console.log(1 / Infinity);
console.log(1 % Infinity);
console.log(Number(null));

let d = 1;

while (++d < 2) {
  console.log("a");
}

do {
  console.log("b");
} while (++d < 2);
