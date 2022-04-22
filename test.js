const a1 = Symbol('aaa');
const a2 = Symbol('aaa');

const b = {
  [a1]: 666
}

console.log(b[a2]);