import { ASTToBytecode } from "./ast-to-bytecode.js";
import { BytecodeInterpreter } from "./bytecode-interpreter.js";
import { Lexer } from "./lexer.js";
import { BinaryOpNode, NumberNode, Parser } from "./parser.js";

function evaluateExpression(expression) {
	try {
		const lexer = new Lexer(expression);
		const tokens = lexer.tokenize();

		const parser = new Parser(tokens);
		const ast = parser.parse();

		const converter = new ASTToBytecode();
		const bytecode = converter.convert(ast);

		const interpreter = new BytecodeInterpreter();
		const result = interpreter.execute(bytecode);
		const astTree = renderAST(ast);
		const bytecodeStack = renderBytecodeStack(bytecode);
		return {
			result,
			astTree,
			bytecodeStack,
		};
	} catch (e) {
		throw new Error(`Error: ${e.message}`);
	}
}

function renderAST(node, depth = 0) {
	let result = "";
	const indent = "  ".repeat(depth);
	if (node instanceof NumberNode) {
		result += `${indent}NumberNode(${node.value})\n`;
	} else if (node instanceof BinaryOpNode) {
		result += `${indent}BinaryOpNode(\n`;
		result += renderAST(node.left, depth + 1);
		result += `${indent}  ${node.op.type}\n`;
		result += renderAST(node.right, depth + 1);
		result += `${indent})\n`;
	}
	return result;
}

function renderBytecodeStack(bytecode) {
	let stackDisplay = "";
	for (let i = 0; i < bytecode.length; i++) {
		if (bytecode[i] === "PUSH") {
			stackDisplay += `${i}: ${bytecode[i]} ${bytecode[i + 1]}\n`;
			i++; // Skip the operand as it's already included
		} else {
			stackDisplay += `${i}: ${bytecode[i]}\n`;
		}
	}
	return stackDisplay;
}

export { evaluateExpression };
