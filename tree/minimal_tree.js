/**
 * Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height.
 */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
Array.prototype.createMinimalBST = function () {
  let root = null;
  function makeTree(arr, nextRoot, whichChild) {
    let currentNode = nextRoot;
    if (arr.length === 0) {
      return;
    }
    if (currentNode === null) {
      currentNode = findRoot(arr);
      root = currentNode;
    } else {
      if (whichChild === "left") {
        currentNode.left = findRoot(arr);
        currentNode = currentNode.left;
      } else {
        currentNode.right = findRoot(arr);
        currentNode = currentNode.right;
      }
    }
    makeTree(arr.slice(0, arr.length / 2), currentNode, "left");
    makeTree(arr.slice(arr.length / 2 + 1), currentNode, "right");
  }

  function findRoot(arr) {
    return new TreeNode(arr[parseInt(arr.length / 2)]);
  }
  makeTree(this, root);
  return root;
};

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.createMinimalBST());
