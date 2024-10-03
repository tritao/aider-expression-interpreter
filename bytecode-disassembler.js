import { Bytecode } from "./bytecode.js";

class BytecodeDisassembler {
	disassemble(bytecode) {
		const instructions = [];
		let i = 0;
		while (i < bytecode.length) {
			const opcode = bytecode[i];
			switch (opcode) {
				case 0x01:
					instructions.push(`PUSH ${bytecode[i + 1]}`);
					i += 2;
					break;
				case 0x02:
					instructions.push("ADD");
					i += 1;
					break;
				case 0x03:
					instructions.push("SUB");
					i += 1;
					break;
				case 0x04:
					instructions.push("MUL");
					i += 1;
					break;
				case 0x05:
					instructions.push("DIV");
					i += 1;
					break;
				case 0x06:
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
