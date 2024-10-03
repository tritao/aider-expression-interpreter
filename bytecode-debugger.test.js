import { describe, expect, it } from "bun:test";
import { BytecodeDebugger } from "./bytecode-debugger.js";
import { Bytecode } from "./bytecode.js";

describe("BytecodeDebugger", () => {
	it("should step through simple addition", () => {
		const bytecode = [
			Bytecode.PUSH,
			3,
			Bytecode.PUSH,
			5,
			Bytecode.ADD,
			Bytecode.HALT,
		];
		const debuggerInstance = new BytecodeDebugger(bytecode);

		debuggerInstance.step(); // PUSH 3
		expect(debuggerInstance.getStack()).toEqual([3]);

		debuggerInstance.step(); // PUSH 5
		expect(debuggerInstance.getStack()).toEqual([3, 5]);

		debuggerInstance.step(); // ADD
		expect(debuggerInstance.getStack()).toEqual([8]);

		const result = debuggerInstance.step(); // HALT
		expect(result).toBe(8);
	});

	it("should step through mixed operations", () => {
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
		const debuggerInstance = new BytecodeDebugger(bytecode);

		debuggerInstance.step(); // PUSH 7
		expect(debuggerInstance.getStack()).toEqual([7]);

		debuggerInstance.step(); // PUSH 2
		expect(debuggerInstance.getStack()).toEqual([7, 2]);

		debuggerInstance.step(); // PUSH 3
		expect(debuggerInstance.getStack()).toEqual([7, 2, 3]);

		debuggerInstance.step(); // MUL
		expect(debuggerInstance.getStack()).toEqual([7, 6]);

		debuggerInstance.step(); // SUB
		expect(debuggerInstance.getStack()).toEqual([1]);

		const result = debuggerInstance.step(); // HALT
		expect(result).toBe(1);
	});
});
