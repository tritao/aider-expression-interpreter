import { Bytecode } from "./bytecode.js";

class BytecodeSerializer {
	constructor() {
		this.bytecodeMap = {
			[Bytecode.PUSH]: 0x01,
			[Bytecode.ADD]: 0x02,
			[Bytecode.SUB]: 0x03,
			[Bytecode.MUL]: 0x04,
			[Bytecode.DIV]: 0x05,
			[Bytecode.HALT]: 0x06,
		};
	}

	serialize(instructions) {
		console.debug("Serializing instructions:", instructions);
		const buffer = [];
		for (const instruction of instructions) {
			const bytecodeValue = this.bytecodeMap[instruction.type];
			if (bytecodeValue === undefined) {
				throw new Error(
					`No bytecode mapping for instruction type '${instruction.type}'`,
				);
			} else {
				buffer.push(bytecodeValue);
				if (instruction.type === Bytecode.PUSH) {
					buffer.push(instruction.value);
				}
			}
		}
		console.debug("Serialized buffer:", buffer);
		return new Uint8Array(buffer);
	}
}

export { BytecodeSerializer };
