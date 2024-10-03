import { describe, expect, it } from "bun:test";
import { Lexer } from "./lexer.js";
import { Parser, ASTToBytecodeConverter } from "./parser.js";
import { Bytecode } from "./bytecode.js";

describe("ASTToBytecodeConverter", () => {
	it("should convert simple addition", () => {
		const lexer = new Lexer("3 + 5");
		const tokens = lexer.tokenize();
		const parser = new Parser(tokens);
		const ast = parser.parse();

		const converter = new ASTToBytecodeConverter();
		const bytecode = converter.convert(ast);

		const expectedBytecode = [
			Bytecode.PUSH, 3,
			Bytecode.PUSH, 5,
			Bytecode.ADD,
			Bytecode.HALT
		];
		expect(bytecode).toEqual(expectedBytecode);
	});

	it("should convert mixed operations", () => {
		const lexer = new Lexer("7 - 2 * 3");
		const tokens = lexer.tokenize();
		const parser = new Parser(tokens);
		const ast = parser.parse();

		const converter = new ASTToBytecodeConverter();
		const bytecode = converter.convert(ast);

		const expectedBytecode = [
			Bytecode.PUSH, 7,
			Bytecode.PUSH, 2,
			Bytecode.PUSH, 3,
			Bytecode.MUL,
			Bytecode.SUB,
			Bytecode.HALT
		];
		expect(bytecode).toEqual(expectedBytecode);
	});

	it("should convert division", () => {
		const lexer = new Lexer("8 / 2");
		const tokens = lexer.tokenize();
		const parser = new Parser(tokens);
		const ast = parser.parse();

		const converter = new ASTToBytecodeConverter();
		const bytecode = converter.convert(ast);

		const expectedBytecode = [
			Bytecode.PUSH, 8,
			Bytecode.PUSH, 2,
			Bytecode.DIV,
			Bytecode.HALT
		];
		expect(bytecode).toEqual(expectedBytecode);
	});

	it("should handle multiple operations", () => {
		const lexer = new Lexer("3 * (4 + 5)");
		const tokens = lexer.tokenize();
		const parser = new Parser(tokens);
		const ast = parser.parse();

		const converter = new ASTToBytecodeConverter();
		const bytecode = converter.convert(ast);

		const expectedBytecode = [
			Bytecode.PUSH, 3,
			Bytecode.PUSH, 4,
			Bytecode.PUSH, 5,
			Bytecode.ADD,
			Bytecode.MUL,
			Bytecode.HALT
		];
		expect(bytecode).toEqual(expectedBytecode);
	});
});
