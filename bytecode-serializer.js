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
		for (let i = 0; i < instructions.length; i++) {
			const instruction = instructions[i];
			const bytecodeValue = this.bytecodeMap[instruction];
			if (bytecodeValue === undefined) {
				buffer.push(instruction); // Directly push the value if it's not a bytecode
			} else {
				buffer.push(bytecodeValue);
			}
		}
		console.debug("Serialized buffer:", buffer);
		return new Uint8Array(buffer);
	}
}

export { BytecodeSerializer };
