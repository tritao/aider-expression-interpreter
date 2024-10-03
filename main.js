import fs from "node:fs";
import { BytecodeSerializer } from "./bytecode-serializer.js";
import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";

function main() {
	const args = process.argv.slice(2);

	if (args.length === 2 && args[0] === "--emit-bytecode") {
		const inputFilePath = args[1];
		const outputFilePath = inputFilePath.replace(".txt", ".bin");

		try {
			const text = fs.readFileSync(inputFilePath, "utf-8").trim();
			const lexer = new Lexer(text);
			const tokens = lexer.tokenize();

			const parser = new Parser(tokens);
			const ast = parser.parse();

			const instructions = ast.toInstructions();
			const serializer = new BytecodeSerializer();
			const bytecode = serializer.serialize(instructions);

			fs.writeFileSync(outputFilePath, bytecode);
			console.log(`Bytecode written to ${outputFilePath}`);
		} catch (e) {
			console.error(`Error: ${e.message}`);
		}
	} else {
		const readline = require("node:readline");
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.setPrompt("calc> ");
		rl.prompt();

		rl.on("line", (line) => {
			try {
				const text = line.trim();
				if (text.toLowerCase() === "exit" || text.toLowerCase() === "quit") {
					rl.close();
					return;
				}

				const lexer = new Lexer(text);
				const tokens = lexer.tokenize();

				const parser = new Parser(tokens);
				const ast = parser.parse();

				console.log("AST:", ast.toString());

				const result = ast.evaluate();
				console.log("Result:", result);
			} catch (e) {
				console.error(`Error: ${e.message}`);
			}
			rl.prompt();
		});

		rl.on("close", () => {
			console.log("Exiting calculator.");
			process.exit(0);
		});
	}
}

main();
