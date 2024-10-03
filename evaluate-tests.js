import fs from "node:fs";
import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";

const testFiles = [
	"test-files/test1.txt",
	"test-files/test2.txt",
	"test-files/test3.txt",
	"test-files/test4.txt",
	"test-files/test5.txt",
	"test-files/test6.txt",
	"test-files/test7.txt",
	"test-files/test8.txt",
	"test-files/test9.txt",
	"test-files/test10.txt",
];

testFiles.forEach((testFile) => {
	const expectedOutputFile = testFile.replace(".txt", ".out");
	const input = fs.readFileSync(testFile, "utf-8").trim();
	const expectedOutput = fs.readFileSync(expectedOutputFile, "utf-8").trim();

	const lexer = new Lexer(input);
	const tokens = lexer.tokenize();

	const parser = new Parser(tokens);
	const ast = parser.parse();

	const result = ast.evaluate();

	if (result.toString() === expectedOutput) {
		console.log(`${testFile}: PASS`);
	} else {
		console.error(`${testFile}: FAIL (Expected: ${expectedOutput}, Got: ${result})`);
	}
});
