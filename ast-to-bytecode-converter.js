import { Bytecode } from "./bytecode.js";
import { TokenType } from "./lexer.js";
import { BinaryOpNode, NumberNode } from "./parser.js";

class ASTToBytecodeConverter {
	convert(node) {
		const bytecode = [];
		this._convertNode(node, bytecode);
		bytecode.push(Bytecode.HALT);
		return bytecode;
	}

	_convertNode(node, bytecode) {
		if (node instanceof NumberNode) {
			bytecode.push(Bytecode.PUSH, node.value);
		} else if (node instanceof BinaryOpNode) {
			this._convertNode(node.left, bytecode);
			this._convertNode(node.right, bytecode);
			switch (node.op.type) {
				case TokenType.PLUS:
					bytecode.push(Bytecode.ADD);
					break;
				case TokenType.MINUS:
					bytecode.push(Bytecode.SUB);
					break;
				case TokenType.TIMES:
					bytecode.push(Bytecode.MUL);
					break;
				case TokenType.DIVIDE:
					bytecode.push(Bytecode.DIV);
					break;
				default:
					throw new Error("Invalid operation");
			}
		} else {
			throw new Error("Unknown node type");
		}
	}
}

export { ASTToBytecodeConverter };
