function fibonacci(n) {
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacci_no_recursion(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    if (i == 0) {
      arr[i] = 1;
    } else if (i == 1) {
      arr[i] = 1;
    } else {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }
  return arr[n - 1];
}

class Frame {
  constructor(n) {
    this.pc = 0;
    this.n = n;
    this.ret = 0;
  }
}

function fibonacci_stack(n) {
  // 最大栈深度64
  let MAX = 64;
  let stacks = [];
  let stacks_ret = [];
  let top = 0;

  top += 1;
  stacks[top] = new Frame(n);

  while (true) {
    if (top < 1 || top > MAX) {
      break;
    }
    let stack = stacks[top];
    let inStack = false;
    while (true) {
      if (inStack || stack.pc > 3) {
        break;
      }
      switch (stack.pc) {
        case 0:
          if (stack.n == 1 || stack.n == 2) {
            stack.pc = 2; // 这里是2而不是3是因为最后会统一+1的
            console.log("n == 1 || n == 2, top = " + top);
          }
          break;
        case 1:
          top += 1;
          inStack = true;
          stacks[top] = new Frame(stack.n - 1);
          console.log("stack in, top = " + top + ", n = " + (stack.n - 1));
          break;
        case 2:
          top += 1;
          inStack = true;
          stacks[top] = new Frame(stack.n - 2);
          console.log("stack in, top = " + top + ", n = " + (stack.n - 2));
          break;
        case 3:
          console.log("return, top = " + top);
          top -= 1;
          break;
      }
      stack.pc += 1;
    }
  }
}

console.log("recursion " + fibonacci(10));
console.log("no recursion " + fibonacci_no_recursion(10));
fibonacci_stack(10);
