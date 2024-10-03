import { TokenType } from "./lexer.js";

class NumberNode {
	constructor(value) {
		this.value = value;
	}

	evaluate() {
		return this.value;
	}

	toString() {
		return `NumberNode(${this.value})`;
	}
}

class BinaryOpNode {
	constructor(left, op, right) {
		this.left = left;
		this.op = op;
		this.right = right;
	}

	evaluate() {
		switch (this.op.type) {
			case TokenType.PLUS:
				return this.left.evaluate() + this.right.evaluate();
			case TokenType.MINUS:
				return this.left.evaluate() - this.right.evaluate();
			case TokenType.TIMES:
				return this.left.evaluate() * this.right.evaluate();
			case TokenType.DIVIDE:
				return this.left.evaluate() / this.right.evaluate();
			default:
				throw new Error("Invalid operation");
		}
	}

	toString() {
		return `BinaryOpNode(${this.left.toString()}, ${this.op.type}, ${this.right.toString()})`;
	}
}

class Parser {
	constructor(tokens) {
		this.tokens = tokens;
		this.pos = 0;
		this.currentToken = this.tokens[this.pos];
	}

	error() {
		throw new Error("Invalid syntax");
	}

	eat(tokenType) {
		if (this.currentToken.type === tokenType) {
			this.pos += 1;
			if (this.pos < this.tokens.length) {
				this.currentToken = this.tokens[this.pos];
			}
		} else {
			this.error();
		}
	}

	parse() {
		return this.expr();
	}

	expr() {
		let node = this.term();
		while ([TokenType.PLUS, TokenType.MINUS].includes(this.currentToken.type)) {
			const token = this.currentToken;
			if (token.type === TokenType.PLUS) {
				this.eat(TokenType.PLUS);
			} else if (token.type === TokenType.MINUS) {
				this.eat(TokenType.MINUS);
			}
			node = new BinaryOpNode(node, token, this.term());
		}
		return node;
	}

	term() {
		let node = this.factor();
		while (
			[TokenType.TIMES, TokenType.DIVIDE].includes(this.currentToken.type)
		) {
			const token = this.currentToken;
			if (token.type === TokenType.TIMES) {
				this.eat(TokenType.TIMES);
			} else if (token.type === TokenType.DIVIDE) {
				this.eat(TokenType.DIVIDE);
			}
			node = new BinaryOpNode(node, token, this.factor());
		}
		return node;
	}

	factor() {
		const token = this.currentToken;
		if (token.type === TokenType.NUMBER) {
			this.eat(TokenType.NUMBER);
			return new NumberNode(token.value);
		}
		if (token.type === TokenType.LPAREN) {
			this.eat(TokenType.LPAREN);
			const node = this.expr();
			this.eat(TokenType.RPAREN);
			return node;
		}
		this.error();
	}
}

import { ASTToBytecodeConverter } from "./ast-to-bytecode-converter.js";

export { Parser, NumberNode, BinaryOpNode };
