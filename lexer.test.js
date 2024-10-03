import { describe, it, expect } from 'bun:test';
import { Lexer, Token, TokenType } from './lexer';

describe('Lexer', () => {
    it('should tokenize a single number', () => {
        const lexer = new Lexer("42");
        const tokens = lexer.tokenize();
        const expectedTokens = [new Token(TokenType.NUMBER, 42), new Token(TokenType.EOF, null)];
        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize simple addition', () => {
        const lexer = new Lexer("3 + 5");
        const tokens = lexer.tokenize();
        const expectedTokens = [
            new Token(TokenType.NUMBER, 3),
            new Token(TokenType.PLUS, '+'),
            new Token(TokenType.NUMBER, 5),
            new Token(TokenType.EOF, null)
        ];
        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize mixed operations', () => {
        const lexer = new Lexer("7 - 2 * 3");
        const tokens = lexer.tokenize();
        const expectedTokens = [
            new Token(TokenType.NUMBER, 7),
            new Token(TokenType.MINUS, '-'),
            new Token(TokenType.NUMBER, 2),
            new Token(TokenType.TIMES, '*'),
            new Token(TokenType.NUMBER, 3),
            new Token(TokenType.EOF, null)
        ];
        expect(tokens).toEqual(expectedTokens);
    });

    it('should tokenize with parentheses', () => {
        const lexer = new Lexer("(1 + 2) * 4");
        const tokens = lexer.tokenize();
        const expectedTokens = [
            new Token(TokenType.LPAREN, '('),
            new Token(TokenType.NUMBER, 1),
            new Token(TokenType.PLUS, '+'),
            new Token(TokenType.NUMBER, 2),
            new Token(TokenType.RPAREN, ')'),
            new Token(TokenType.TIMES, '*'),
            new Token(TokenType.NUMBER, 4),
            new Token(TokenType.EOF, null)
        ];
        expect(tokens).toEqual(expectedTokens);
    });

    it('should handle whitespace', () => {
        const lexer = new Lexer("  9 + 10  ");
        const tokens = lexer.tokenize();
        const expectedTokens = [
            new Token(TokenType.NUMBER, 9),
            new Token(TokenType.PLUS, '+'),
            new Token(TokenType.NUMBER, 10),
            new Token(TokenType.EOF, null)
        ];
        expect(tokens).toEqual(expectedTokens);
    });

    it('should throw error on invalid characters', () => {
        const lexer = new Lexer("5 & 3");
        expect(() => lexer.tokenize()).toThrow();
    });

    it('should tokenize floating point numbers', () => {
        const lexer = new Lexer("3.14 + 2.71");
        const tokens = lexer.tokenize();
        const expectedTokens = [
            new Token(TokenType.NUMBER, 3.14),
            new Token(TokenType.PLUS, '+'),
            new Token(TokenType.NUMBER, 2.71),
            new Token(TokenType.EOF, null)
        ];
        expect(tokens).toEqual(expectedTokens);
    });

    it('should throw error on consecutive operators', () => {
        const lexer = new Lexer("4++5");
        expect(() => lexer.tokenize()).to.throw();
    });
});
