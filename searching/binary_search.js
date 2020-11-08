Array.prototype.indexOf = function (target) {
  /**
   * log(N)
   */
  function binarySearch(arr, target, start, end) {
    const mid = parseInt((end + start) / 2);
    if (start <= end) {
      if (arr[mid] === target) return mid;

      if (target < arr[mid]) return binarySearch(arr, target, start, mid);
      else if (target > arr[mid])
        return binarySearch(arr, target, mid + 1, end);
    } else return -1;
  }

  return binarySearch(this, target, 0, this.length - 1);
};

const arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf(3));

/**
 * 
 
N = 10
1,2,5,10

1 * (2 ^ k) >= 10
2^k = 10

log k,2 = 10
*/
