import { BytecodeSerializer } from "./bytecode-serializer.js";
import { Bytecode } from "./bytecode.js";

test("serialize PUSH instruction", () => {
	const serializer = new BytecodeSerializer();
	const instructions = [Bytecode.PUSH, 10];
	const expected = new Uint8Array([0x01, 10]);
	expect(serializer.serialize(instructions)).toEqual(expected);
});

test("serialize ADD instruction", () => {
	const serializer = new BytecodeSerializer();
	const instructions = [Bytecode.ADD];
	const expected = new Uint8Array([0x02]);
	expect(serializer.serialize(instructions)).toEqual(expected);
});

test("serialize complex instruction set", () => {
	const serializer = new BytecodeSerializer();
	const instructions = [
		Bytecode.PUSH,
		10,
		Bytecode.PUSH,
		20,
		Bytecode.ADD,
		Bytecode.HALT,
	];
	const expected = new Uint8Array([0x01, 10, 0x01, 20, 0x02, 0x06]);
	expect(serializer.serialize(instructions)).toEqual(expected);
});
