import { Bytecode } from "./bytecode.js";

class BytecodeDisassembler {
	disassemble(bytecode) {
		const instructions = [];
		let i = 0;
		while (i < bytecode.length) {
			const opcode = bytecode[i];
			switch (opcode) {
				case Bytecode.PUSH:
					instructions.push(`PUSH ${bytecode[i + 1]}`);
					i += 2;
					break;
				case Bytecode.ADD:
					instructions.push("ADD");
					i += 1;
					break;
				case Bytecode.SUB:
					instructions.push("SUB");
					i += 1;
					break;
				case Bytecode.MUL:
					instructions.push("MUL");
					i += 1;
					break;
				case Bytecode.DIV:
					instructions.push("DIV");
					i += 1;
					break;
				case Bytecode.HALT:
					instructions.push("HALT");
					i += 1;
					break;
				default:
					throw new Error(`Unknown opcode: ${opcode}`);
			}
		}
		return instructions.join("\n");
	}
}

export { BytecodeDisassembler };
