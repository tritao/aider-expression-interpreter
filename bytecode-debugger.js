import { Bytecode } from "./bytecode.js";

class BytecodeDebugger {
	constructor(bytecode) {
		this.bytecode = bytecode;
		this.stack = [];
		this.pc = 0;
	}

	step() {
		if (this.pc >= this.bytecode.length) {
			throw new Error("End of bytecode reached");
		}

		const instruction = this.bytecode[this.pc];
		switch (instruction) {
			case Bytecode.PUSH:
				this.pc++;
				this.stack.push(this.bytecode[this.pc]);
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
		this.pc++;
	}

	binaryOp(operation) {
		const b = this.stack.pop();
		const a = this.stack.pop();
		this.stack.push(operation(a, b));
	}

	getStack() {
		return [...this.stack];
	}

	getPC() {
		return this.pc;
	}
}

export { BytecodeDebugger };
