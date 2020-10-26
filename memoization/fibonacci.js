const cluster = require("cluster");

const n = Number(process.argv[2]);

/**
 * O(2 ^ n)
 */
function fibo(n) {
  if (n === 0 || n === 1) return n;
  return fibo(n - 2) + fibo(n - 1);
}

/**
 * O(n)
 */
function fiboEnhanced(n) {
  const memo = [];

  function fibo(n, memo) {
    if (n === 0 || n === 1) return n;
    else if (memo[n] !== void 0) return memo[n];

    memo[n] = fibo(n - 2, memo) + fibo(n - 1, memo);
    return memo[n];
  }

  return fibo(n, memo);
}

if (cluster.isMaster) {
  cluster.fork();

  const startTime = Date.now();
  console.log(`Nth fibonacci numer where N = ${n} is: ${fibo(n)}`);
  const endTime = Date.now();
  console.log(`O(2^N) took ${endTime - startTime}ms to complete`);
} else {
  const startTime = Date.now();
  console.log(`Nth fibonacci numer where N = ${n} is: ${fiboEnhanced(n)}`);
  const endTime = Date.now();
  console.log(`O(N) took ${endTime - startTime}ms to complete\n`);

  process.exit();
}
