class Stack {
  stack: unknown[];
  maxSize: number;

  constructor(maxSize: number) {
    this.stack = [];
    this.maxSize = maxSize;
  }
  pushing(item: unknown) {
    if (this.#isFull()) {
      return -1;
    }
    return this.stack.push(item);
  }
  #isEmpty() {
    return this.stack.length <= 0;
  }
  #isFull() {
    return this.stack.length >= this.maxSize;
  }
  peek() {
    return this.stack[this.stack.length - 1];
  }
  poping() {
    if (this.#isEmpty()) {
      return -1;
    }
    return this.stack.pop();
  }
}
