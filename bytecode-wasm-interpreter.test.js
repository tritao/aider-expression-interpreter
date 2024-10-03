import { BytecodeWasmInterpreter } from "./bytecode-wasm-interpreter.js";

describe("BytecodeWasmInterpreter", () => {
	let interpreter;

	beforeEach(() => {
		interpreter = new BytecodeWasmInterpreter();
	});

	function parseBytecode(str) {
		return new Uint8Array(str.split(",").map(Number));
	}

	test("should execute simple bytecode", async () => {
		const bytecodeStr = "1,10,1,20,2,6"; // Example bytecode: PUSH 10, PUSH 20, ADD, HALT
		const bytecode = parseBytecode(bytecodeStr);
		await interpreter.init(bytecode);
		const result = interpreter.execute(bytecode);
		expect(result).toEqual([30]); // Expect the stack to contain the result of 10 + 20
	});

	// test("should handle empty bytecode", async () => {
	// 	const bytecodeStr = "";
	// 	const bytecode = parseBytecode(bytecodeStr);
	// 	await interpreter.init(bytecode);
	// 	expect(() => interpreter.execute()).toThrow(
	// 		"Unknown instruction: undefined",
	// 	);
	// });

	// test("should throw error if WASM module not initialized", () => {
	// 	const uninitializedInterpreter = new BytecodeWasmInterpreter();
	// 	const bytecodeStr = "1,10,6"; // Example bytecode: PUSH 10, HALT
	// 	const bytecode = parseBytecode(bytecodeStr);
	// 	expect(() => uninitializedInterpreter.init(bytecode)).toThrow(
	// 		"WASM module not initialized",
	// 	);
	// });
});
