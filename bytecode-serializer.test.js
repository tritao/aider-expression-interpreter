import { BytecodeSerializer } from "./bytecode-serializer.js";
import { Bytecode } from "./bytecode.js";

test("serialize PUSH instruction", () => {
	const serializer = new BytecodeSerializer();
	const instructions = [{ type: Bytecode.PUSH, args: 10 }];
	const expected = new Uint8Array([0x01, 10]);
	expect(serializer.serialize(instructions)).toEqual(expected);
});

test("serialize ADD instruction", () => {
	const serializer = new BytecodeSerializer();
	const instructions = [{ type: Bytecode.ADD, args: [] }];
	const expected = new Uint8Array([0x02]);
	expect(serializer.serialize(instructions)).toEqual(expected);
});

test("serialize complex instruction set", () => {
	const serializer = new BytecodeSerializer();
	const instructions = [
		{ type: Bytecode.PUSH, args: 10 },
		{ type: Bytecode.PUSH, args: 20 },
		{ type: Bytecode.ADD, args: [] },
		{ type: Bytecode.HALT, args: [] },
	];
	const expected = new Uint8Array([0x01, 10, 0x01, 20, 0x02, 0x06]);
	expect(serializer.serialize(instructions)).toEqual(expected);
});
