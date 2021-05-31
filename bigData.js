const a = 123456789;
const b = 7894561231;

function add(a, b) {
  a = a.toString();
  b = b.toString();

  const maxLength = Math.max(a.length, b.length);
  const c = a.padStart(maxLength, "0");
  const d = b.padStart(maxLength, "0");
  let e = 0;
  let f = 0;
  let sum = '';
  for (let i = maxLength - 1; i >= 0; i--) {
    e = parseInt(c[i]) + parseInt(d[i]) + f;
    f = Math.floor(e / 10);
    sum = (e % 10) + sum;
  }

  if (f == 1) {
    sum = "1" + sum;
  }
  return sum;
}

console.log(add(a, b));
