const assert = require("assert");

class Node {
  constructor(next, key, value) {
    this.next = next;
    this.key = key;
    this.value = value;
  }
}

class GoodMap {
  constructor() {
    /**
     * This will keep track of Head nodes of each LinkedList.
     */
    this.referenceArraySize = 20;
    this.referenceArray = new Array(this.referenceArraySize).fill(null);
  }

  set(key, value) {
    const index = this.computeHash(key);

    if (this.referenceArray[index] !== null) {
      /**
       * Hash collision
       */
      console.warn(
        "\x1b[31m", // Red font color
        "Hash collision for key " + key + " at index " + index,
        "\x1b[0m"
      );

      for (let ptr = this.referenceArray[index]; ptr !== null; ptr = ptr.next) {
        if (ptr.key === key) {
          ptr.value = value;
          break;
        } else if (ptr.next === null) {
          ptr.next = new Node(null, key, value);
          break;
        } else if (ptr.next.key === key) {
          ptr.next.value = value;
          break;
        }
      }
    } else {
      this.referenceArray[index] = new Node(null, key, value);
    }
  }

  get(key) {
    const index = this.computeHash(key);
    const head = this.referenceArray[index];
    if (head === null) {
      return null;
    } else {
      let value = null;
      for (let ptr = head; ptr !== null; ptr = ptr.next) {
        if (ptr.key === key) {
          value = ptr.value;
          break;
        }
      }
      return value;
    }
  }

  delete(key) {
    const index = this.computeHash(key);
    const head = this.referenceArray[index];
    if (head !== null) {
      /**
       * Check if head matches with the key
       */
      if (head.key === key) {
        this.referenceArray[index] = head.next;
        return head.value;
      } else {
        for (let ptr = head; ptr.next !== null; ptr = ptr.next) {
          if (ptr.next.key === key) {
            const value = ptr.next.value;
            ptr.next = ptr.next.next;
            return value;
          }
        }
      }
      return null;
    } else {
      return null;
    }
  }

  /**
   * Not the best hash function
   */
  computeHash(key) {
    const keyStr = key.toString();
    return (
      (keyStr[0].charCodeAt(0) +
        keyStr[keyStr.length - 1].charCodeAt(0) +
        keyStr.length) %
      this.referenceArraySize
    );
  }
}

const gmp = new GoodMap();

gmp.set("Apple", "Steve Wozniak");
gmp.set("Microsoft", "Paul Allen");
gmp.set("Oscar 2017, Best Movie", "La la land"); // Oops
gmp.set("Oscar 2017, Best Movie", "Moonlight");

const result1 = gmp.get("Apple");
assert.deepStrictEqual(
  result1,
  "Steve Wozniak",
  "Apple's co-founder was Steve Wozniak"
);

const result2 = gmp.get("Microsoft");
assert.deepStrictEqual(
  result2,
  "Paul Allen",
  "Microsoft's co-founder was Paul Allen"
);

const result3 = gmp.get("Oscar 2017, Best Movie");
assert.deepStrictEqual(
  result3,
  "Moonlight",
  "Best movie of 2017 was Moonlight"
);

// Let's remove awkwardness

const result4 = gmp.delete("Oscar 2017, Best Movie");
assert.deepStrictEqual(result4, "Moonlight", "That moment!");

// It is removed. Right?

const result5 = gmp.get("Oscar 2017, Best Movie");
assert.deepStrictEqual(result5, null, "Phew!");
