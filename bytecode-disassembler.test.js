import { describe, expect, it } from "bun:test";
import { BytecodeDisassembler } from "./bytecode-disassembler.js";

describe("BytecodeDisassembler", () => {
	it("should disassemble PUSH instruction", () => {
		const disassembler = new BytecodeDisassembler();
		const bytecode = new Uint8Array([0x01, 10]);
		const expected = "PUSH 10";
		expect(disassembler.disassemble(bytecode)).toEqual(expected);
	});

	it("should disassemble ADD instruction", () => {
		const disassembler = new BytecodeDisassembler();
		const bytecode = new Uint8Array([0x02]);
		const expected = "ADD";
		expect(disassembler.disassemble(bytecode)).toEqual(expected);
	});

	it("should disassemble complex instruction set", () => {
		const disassembler = new BytecodeDisassembler();
		const bytecode = new Uint8Array([0x01, 10, 0x01, 20, 0x02, 0x06]);
		const expected = "PUSH 10\nPUSH 20\nADD\nHALT";
		expect(disassembler.disassemble(bytecode)).toEqual(expected);
	});
});
