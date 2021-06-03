var a = 1234567894532;
var b = 673439.4542;

function numFormat(num) {
  let arr = num.toString().split("").reverse();
  let res = [];
  for (let i = arr.length; i > 0; i--) {
    if (i % 3 === 0 && i !== arr.length) {
      res.unshift(",");
    }
    res.unshift(arr[i - 1]);
  }

  return res.reverse().join("");
}

console.log("numFormat", numFormat(a));
