/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-expressions */
const LinkedList = require('./linkedList');

class StakeByArray {
  constructor(...item) {
    this.iSreverse = false;
    this.stake = [...item];
  }

  push(...item) {
    return this.iSreverse
      ? this.stake.unshift(...item)
      : this.stake.push(...item);
  }

  pop() {
    return this.iSreverse
      ? this.stake.shift()
      : this.stake.pop();
  }

  reverse() {
    this.iSreverse = !this.iSreverse;
  }
}

class StakeByLinkedList {
  constructor() {
    this.iSreverse = false;
    this.stake = new LinkedList();
  }

  push(...item) {
    item.forEach((i) => {
      this.iSreverse
        ? this.stake.addTail(i)
        : this.stake.addHead(i);
    });
    return item;
  }

  pop() {
    return this.iSreverse
      ? this.stake.removeTail()
      : this.stake.removeHead();
  }

  reverse() {
    this.iSreverse = !this.iSreverse;
  }
}

const testStake = new StakeByLinkedList();
testStake.push(1, 2, 3);
testStake.reverse();
global.console.log(testStake.pop());
