const Bytecode = {
  PUSH: "PUSH",
  ADD: "ADD",
  SUB: "SUB",
  MUL: "MUL",
  DIV: "DIV",
  HALT: "HALT",
};

class BytecodeInterpreter {
  constructor() {
    this.stack = [];
  }

  execute(bytecode) {
    let pc = 0;
    while (pc < bytecode.length) {
      const instruction = bytecode[pc];
      switch (instruction) {
        case Bytecode.PUSH:
          pc++;
          this.stack.push(bytecode[pc]);
          break;
        case Bytecode.ADD:
          this.binaryOp((a, b) => a + b);
          break;
        case Bytecode.SUB:
          this.binaryOp((a, b) => a - b);
          break;
        case Bytecode.MUL:
          this.binaryOp((a, b) => a * b);
          break;
        case Bytecode.DIV:
          this.binaryOp((a, b) => a / b);
          break;
        case Bytecode.HALT:
          return this.stack.pop();
        default:
          throw new Error(`Unknown instruction: ${instruction}`);
      }
      pc++;
    }
  }

  binaryOp(operation) {
    const b = this.stack.pop();
    const a = this.stack.pop();
    this.stack.push(operation(a, b));
  }
}

export { Bytecode, BytecodeInterpreter };
