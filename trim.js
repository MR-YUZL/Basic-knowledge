// String.prototype.trim = function () {
//   return this.substring(
//     Math.max(this.search(/\S/), 0),
//     this.search(/\S\s*$/) + 1
//   );
// };

String.prototype.trim = function () {
  var str = this;
  for (var i = 0; i < str.length; i++) {
    var index = str.indexOf(" ");
    if (index === -1) {
      str = str.substring(i);
      break;
    }
  }

  for (var i = str.length - 1; i >= 0; i--) {
    var index = str.indexOf(" ");
    if (index === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return str || "";
};

let s = "   a sd   ";

var index = s.indexOf(" ");
console.log(index);
console.log(String.prototype.trim.call(s));

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
target.target = target;
console.log(target)