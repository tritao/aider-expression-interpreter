import { describe, expect, it } from "bun:test";
import { Bytecode } from "./bytecode.js";
import { BytecodeInterpreter } from "./bytecode-interpreter.js";

describe("BytecodeInterpreter", () => {
	it("should execute simple addition", () => {
		const bytecode = [
			Bytecode.PUSH,
			3,
			Bytecode.PUSH,
			5,
			Bytecode.ADD,
			Bytecode.HALT,
		];
		const interpreter = new BytecodeInterpreter();
		const result = interpreter.execute(bytecode);
		expect(result).toBe(8);
	});

	it("should execute mixed operations", () => {
		const bytecode = [
			Bytecode.PUSH,
			7,
			Bytecode.PUSH,
			2,
			Bytecode.PUSH,
			3,
			Bytecode.MUL,
			Bytecode.SUB,
			Bytecode.HALT,
		];
		const interpreter = new BytecodeInterpreter();
		const result = interpreter.execute(bytecode);
		expect(result).toBe(1);
	});

	it("should execute division", () => {
		const bytecode = [
			Bytecode.PUSH,
			8,
			Bytecode.PUSH,
			2,
			Bytecode.DIV,
			Bytecode.HALT,
		];
		const interpreter = new BytecodeInterpreter();
		const result = interpreter.execute(bytecode);
		expect(result).toBe(4);
	});

	it("should handle multiple operations", () => {
		const bytecode = [
			Bytecode.PUSH,
			3,
			Bytecode.PUSH,
			4,
			Bytecode.PUSH,
			5,
			Bytecode.ADD,
			Bytecode.MUL,
			Bytecode.HALT,
		];
		const interpreter = new BytecodeInterpreter();
		const result = interpreter.execute(bytecode);
		expect(result).toBe(27);
	});
});
