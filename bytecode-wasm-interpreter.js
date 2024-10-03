import Module from "./c/bytecode_runner.mjs";

class BytecodeWasmInterpreter {
	constructor() {
		this.instance = null;
		this.interpreter = null;
	}

	async init(bytecode) {
		if (!bytecode) {
			throw new Error("Bytecode must be provided for initialization");
		}
		this.instance = await Module();
		this.interpreter = new this.instance.BytecodeInterpreter();

	async init(bytecode) {
		if (!bytecode) {
			throw new Error("Bytecode must be provided for initialization");
		}
		this.instance = await Module();
	}

	execute(bytecode) {
		if (!this.instance) {
			throw new Error("WASM module not initialized");
		}

		const memory = new Uint8Array(this.instance.memory.buffer);
		memory.set(bytecode, 0);

		let result;
		do {
			result = this.instance.step();
			const ip = this.instance.getIP();
			const stack = this.instance.getStack();
			console.log(`IP: ${ip}, Intermediate stack:`, stack);
		} while (result > 0);

		const stack = this.instance.getStack();
		console.log("Final stack:", stack);
		return stack;
	}
}

export { BytecodeWasmInterpreter };
