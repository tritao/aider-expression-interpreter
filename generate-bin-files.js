import fs from "node:fs";
import path from "node:path";
import { ASTToBytecode } from "./ast-to-bytecode.js";
import { BytecodeSerializer } from "./bytecode-serializer.js";
import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";

const testFilesDir = "./test-files";

for (const file of fs.readdirSync(testFilesDir)) {
	if (file.endsWith(".txt")) {
		const inputFilePath = path.join(testFilesDir, file);
		const outputFilePath = inputFilePath.replace(".txt", ".bin");

		try {
			const text = fs.readFileSync(inputFilePath, "utf-8").trim();
			const lexer = new Lexer(text);
			const tokens = lexer.tokenize();

			const parser = new Parser(tokens);
			const ast = parser.parse();

			const astToBytecode = new ASTToBytecode();
			const instructions = astToBytecode.convert(ast);
			const serializer = new BytecodeSerializer();
			const bytecode = serializer.serialize(instructions);

			fs.writeFileSync(outputFilePath, bytecode);
			console.log(`Bytecode written to ${outputFilePath}`);
		} catch (e) {
			console.error(`Error processing ${file}: ${e.message}`);
		}
	}
}
