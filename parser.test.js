import { describe, it, expect } from 'bun:test';
import { Lexer, Token, TokenType } from './lexer';
import { Parser, NumberNode, BinaryOpNode } from './parser';

describe('Parser', () => {
    it('should parse a single number', () => {
        const lexer = new Lexer("42");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expectedAst = new NumberNode(42);
        expect(ast.value).toBe(expectedAst.value);
    });

    it('should parse simple addition', () => {
        const lexer = new Lexer("3 + 5");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expectedAst = new BinaryOpNode(
            new NumberNode(3),
            new Token(TokenType.PLUS, '+'),
            new NumberNode(5)
        );
        expect(ast.left.value).toBe(expectedAst.left.value);
        expect(ast.op.type).toBe(expectedAst.op.type);
        expect(ast.right.value).toBe(expectedAst.right.value);
    });

    it('should parse mixed operations', () => {
        const lexer = new Lexer("7 - 2 * 3");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expectedAst = new BinaryOpNode(
            new NumberNode(7),
            new Token(TokenType.MINUS, '-'),
            new BinaryOpNode(
                new NumberNode(2),
                new Token(TokenType.TIMES, '*'),
                new NumberNode(3)
            )
        );
        expect(ast.left.value).toBe(expectedAst.left.value);
        expect(ast.op.type).toBe(expectedAst.op.type);
        expect(ast.right.left.value).toBe(expectedAst.right.left.value);
        expect(ast.right.op.type).toBe(expectedAst.right.op.type);
        expect(ast.right.right.value).toBe(expectedAst.right.right.value);
    });

    it('should parse expressions with parentheses', () => {
        const lexer = new Lexer("(1 + 2) * 4");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expectedAst = new BinaryOpNode(
            new BinaryOpNode(
                new NumberNode(1),
                new Token(TokenType.PLUS, '+'),
                new NumberNode(2)
            ),
            new Token(TokenType.TIMES, '*'),
            new NumberNode(4)
        );
        expect(ast.left.left.value).toBe(expectedAst.left.left.value);
        expect(ast.left.op.type).toBe(expectedAst.left.op.type);
        expect(ast.left.right.value).toBe(expectedAst.left.right.value);
        expect(ast.op.type).toBe(expectedAst.op.type);
        expect(ast.right.value).toBe(expectedAst.right.value);
    });

    it('should parse division', () => {
        const lexer = new Lexer("8 / 2");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expectedAst = new BinaryOpNode(
            new NumberNode(8),
            new Token(TokenType.DIVIDE, '/'),
            new NumberNode(2)
        );
        expect(ast.left.value).to.equal(expectedAst.left.value);
        expect(ast.op.type).to.equal(expectedAst.op.type);
        expect(ast.right.value).to.equal(expectedAst.right.value);
    });

    it('should parse nested parentheses', () => {
        const lexer = new Lexer("(3 + (2 * 5))");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const expectedAst = new BinaryOpNode(
            new NumberNode(3),
            new Token(TokenType.PLUS, '+'),
            new BinaryOpNode(
                new NumberNode(2),
                new Token(TokenType.TIMES, '*'),
                new NumberNode(5)
            )
        );
        expect(ast.left.value).to.equal(expectedAst.left.value);
        expect(ast.op.type).to.equal(expectedAst.op.type);
        expect(ast.right.left.value).to.equal(expectedAst.right.left.value);
        expect(ast.right.op.type).to.equal(expectedAst.right.op.type);
        expect(ast.right.right.value).to.equal(expectedAst.right.right.value);
    });
});
