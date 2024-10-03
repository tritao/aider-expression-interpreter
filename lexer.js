class TokenType {
    static NUMBER = 'NUMBER';
    static PLUS = 'PLUS';
    static MINUS = 'MINUS';
    static TIMES = 'TIMES';
    static DIVIDE = 'DIVIDE';
    static LPAREN = 'LPAREN';
    static RPAREN = 'RPAREN';
    static EOF = 'EOF';
}

class LexerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LexerError';
    }
}

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    toString() {
        return `Token(${this.type}, ${JSON.stringify(this.value)})`;
    }
}

class Lexer {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text[this.pos] || null;
    }

    error() {
        throw new LexerError('Invalid character');
    }

    advance() {
        this.pos += 1;
        this.currentChar = this.pos < this.text.length ? this.text[this.pos] : null;
    }

    skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    number() {
        let result = '';
        while (this.currentChar !== null && (/\d/.test(this.currentChar) || this.currentChar === '.')) {
            result += this.currentChar;
            this.advance();
        }
        if ((result.match(/\./g) || []).length > 1) {
            this.error();
        }
        return result.includes('.') ? parseFloat(result) : parseInt(result, 10);
    }

    getNextToken() {
        while (this.currentChar !== null) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (/\d/.test(this.currentChar)) {
                return new Token(TokenType.NUMBER, this.number());
            }

            if (this.currentChar === '+') {
                this.advance();
                if (this.currentChar === '+') this.error();
                return new Token(TokenType.PLUS, '+');
            }

            if (this.currentChar === '-') {
                this.advance();
                if (this.currentChar === '-') this.error();
                return new Token(TokenType.MINUS, '-');
            }

            if (this.currentChar === '*') {
                this.advance();
                if (this.currentChar === '*') this.error();
                return new Token(TokenType.TIMES, '*');
            }

            if (this.currentChar === '/') {
                this.advance();
                if (this.currentChar === '/') this.error();
                return new Token(TokenType.DIVIDE, '/');
            }

            if (this.currentChar === '(') {
                this.advance();
                return new Token(TokenType.LPAREN, '(');
            }

            if (this.currentChar === ')') {
                this.advance();
                return new Token(TokenType.RPAREN, ')');
            }

            this.error();
        }

        return new Token(TokenType.EOF, null);
    }

    tokenize() {
        const tokens = [];
        let token = this.getNextToken();
        while (token.type !== TokenType.EOF) {
            tokens.push(token);
            token = this.getNextToken();
        }
        tokens.push(token); // Append the EOF token
        return tokens;
    }
}

export { Lexer, Token, TokenType, LexerError };
