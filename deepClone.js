const a = "asd";

console.log(a.charAt(1));

const phone = "13525890560";

const e = phone.slice(-4);
const p = phone.slice(0, 3);

const newPhone = e.padStart(phone.length, "*");

console.log(newPhone);
