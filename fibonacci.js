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

function fibonacci_new_recursion() {
  if (n == 1 || n == 2) {
    return 1;
  } // 0
  let value = 0;
  let ret1 = fibonacci(n - 1); // 1
  value += ret1; // 2
  let ret2 = fibonacci(n - 2); // 3
  value += ret2; // 4
  return value; // 5
}

class Frame {
  constructor(n) {
    this.pc = 0;
    this.n = n;
    this.value = 0;
  }
}

function fibonacci_stack(n) {
  let MAX = 64; // 最大栈深度64
  let stacks = []; // 栈
  let stack_ret = 0; // 上一个栈出栈的返回值
  let top = 0; // 栈指针

  top += 1;
  stacks[top] = new Frame(n);

  while (true) {
    if (top < 1 || top > MAX) {
      break;
    }
    let stack = stacks[top];
    let inStack = false;
    while (true) {
      if (inStack || stack.pc > 5) {
        break;
      }
      switch (stack.pc) {
        case 0:
          if (stack.n == 1 || stack.n == 2) {
            stack.value = 1;
            stack.pc = 4; // 这里是4而不是5是因为最后会统一+1的
            console.log("n == 1, top = " + top);
          }
          break;
        case 1:
          top += 1;
          inStack = true;
          stacks[top] = new Frame(stack.n - 1);
          console.log("[n - 1] stack in, top = " + top + ", n = " + (stack.n - 1));
          break;
        case 2:
          stack.value += stack_ret;
          break;
        case 3:
          top += 1;
          inStack = true;
          stacks[top] = new Frame(stack.n - 2);
          console.log(
            "[n - 2] stack in, top = " + top + ", n = " + (stack.n - 2)
          );
          break;
        case 4:
          stack.value += stack_ret;
          break;
        case 5:
          stack_ret = stack.value;
          console.log("return value = " + stack_ret + " , top = " + top);
          top -= 1;
          break;
      }
      print_stacks(stacks, MAX);
      stack.pc += 1;
    }
  }
  return stack_ret;
}

function print_stacks(stacks, MAX) {
  console.log("====== stack start =====");
  for (let i = 1; i < MAX; i++) {
    if (stacks[i] != null) {
      console.log(
        "[" +
          i +
          "]" +
          "stack: { pc: " +
          stacks[i].pc +
          ", n: " +
          stacks[i].n +
          ", value: " +
          stacks[i].value +
          " }"
      );
    }
  }
  console.log("====== stack end =====");
}

console.log("recursion " + fibonacci(10));
console.log("no recursion " + fibonacci_no_recursion(10));
console.log("stack " + fibonacci_stack(10));
