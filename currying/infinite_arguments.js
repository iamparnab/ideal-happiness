/**
 * Infinite Currying
 */

/**
 * Method 1: Use Closures
 */
function add(x) {
  let runningSum = x;
  function adder(y) {
    if (y === undefined) {
      return runningSum;
    } else {
      runningSum += y;
      return adder;
    }
  }
  return adder;
}

/**
 * Method 2: Functions are objects too.
 */
function add2(x) {
  if (x === undefined) {
    return add2.numbers.reduce((acc, elem) => acc + elem, 0);
  } else {
    if (add2.numbers) {
      add2.numbers.push(x);
    } else {
      add2.numbers = [x];
    }
  }
  return add2;
}

console.log(add(10)(20)(40)(-50)());
console.log(add2(10)(20)(40)(-50)());
