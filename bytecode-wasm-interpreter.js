const isNode =
	typeof process !== "undefined" &&
	process.versions != null &&
	process.versions.node != null;
const ModulePromise = isNode
	? import("./c/bytecode_runner.node.mjs")
	: import("./c/bytecode_runner.browser.mjs");

class BytecodeWasmInterpreter {
	static moduleInstance = null;

	constructor() {
		this.interpreter = null;
	}

	async init(bytecode) {
		if (!bytecode) {
			throw new Error("Bytecode must be provided for initialization");
		}
		if (!BytecodeWasmInterpreter.moduleInstance) {
			BytecodeWasmInterpreter.moduleInstance = await ModulePromise;
		}
		this.instance = BytecodeWasmInterpreter.moduleInstance;
		this.interpreter = new this.instance.BytecodeInterpreter();
		this.interpreter.init(bytecode);
	}

	execute(bytecode) {
		if (!this.instance) {
			throw new Error("WASM module not initialized");
		}

		if (!this.interpreter) {
			throw new Error("WASM bytecode interpreter not initialized");
		}

		let result;
		do {
			result = this.interpreter.step();
			const ip = this.interpreter.getIP();
			const stack = this.interpreter.getStack();
			console.log(`IP: ${ip}, Intermediate stack:`, stack);
		} while (result > 0);

		const stack = this.interpreter.getStack();
		console.log("Final stack:", stack);
		return stack;
	}
}

export { BytecodeWasmInterpreter };
