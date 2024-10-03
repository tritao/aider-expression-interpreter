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
		for (const { type, args } of instructions) {
			const bytecodeValue = this.bytecodeMap[type];
			if (bytecodeValue === undefined) {
				throw new Error(
					`No bytecode mapping for instruction type '${type}'`,
				);
			}
			buffer.push(bytecodeValue);
			if (type === Bytecode.PUSH && args.length > 0) {
				buffer.push(args[0]);
			}
		}
		console.debug("Serialized buffer:", buffer);
		return new Uint8Array(buffer);
	}
}

export { BytecodeSerializer };
