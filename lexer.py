import re
from enum import Enum

class TokenType(Enum):
    NUMBER = 'NUMBER'
    PLUS = 'PLUS'
    MINUS = 'MINUS'
    TIMES = 'TIMES'
    DIVIDE = 'DIVIDE'
    LPAREN = 'LPAREN'
    RPAREN = 'RPAREN'
    EOF = 'EOF'

class LexerError(Exception):
    """Exception raised for errors in the lexer."""
    def __init__(self, message):
        super().__init__(message)

class Token:
    def __init__(self, type_, value):
        self.type = type_
        self.value = value

    def __eq__(self, other):
        if isinstance(other, Token):
            return self.type == other.type and self.value == other.value
        return False

    def __repr__(self):
        return f"Token({self.type}, {repr(self.value)})"

class Lexer:
    def __init__(self, text):
        self.text = text
        self.pos = 0
        self.current_char = self.text[self.pos] if self.text else None

    def error(self):
        raise LexerError('Invalid character')

    def advance(self):
        """Advance the 'pos' pointer and set 'current_char'."""
        self.pos += 1
        if self.pos > len(self.text) - 1:
            self.current_char = None  # Indicates end of input
        else:
            self.current_char = self.text[self.pos]

    def skip_whitespace(self):
        while self.current_char is not None and self.current_char.isspace():
            self.advance()

    def number(self):
        """Return a (multidigit) number consumed from the input."""
        result = ''
        while self.current_char is not None and (self.current_char.isdigit() or self.current_char == '.'):
            result += self.current_char
            self.advance()
        if result.count('.') > 1:
            self.error()  # Handle invalid numbers with multiple decimal points
        return float(result) if '.' in result else int(result)

    def get_next_token(self):
        while self.current_char is not None:

            if self.current_char.isspace():
                self.skip_whitespace()
                continue

            if self.current_char.isdigit():
                return Token(TokenType.NUMBER, self.number())

            if self.current_char == '+':
                self.advance()
                if self.current_char == '+':
                    self.error()
                return Token(TokenType.PLUS, '+')

            if self.current_char == '-':
                self.advance()
                if self.current_char == '-':
                    self.error()
                return Token(TokenType.MINUS, '-')

            if self.current_char == '*':
                self.advance()
                if self.current_char == '*':
                    self.error()
                return Token(TokenType.TIMES, '*')

            if self.current_char == '/':
                self.advance()
                if self.current_char == '/':
                    self.error()
                return Token(TokenType.DIVIDE, '/')

            if self.current_char == '(':
                self.advance()
                return Token(TokenType.LPAREN, '(')

            if self.current_char == ')':
                self.advance()
                return Token(TokenType.RPAREN, ')')

            self.error()

        return Token(TokenType.EOF, None)

    def tokenize(self):
        """Tokenize the entire input text and return a list of tokens."""
        tokens = []
        token = self.get_next_token()
        while token.type != EOF:
            tokens.append(token)
            token = self.get_next_token()
        tokens.append(token)  # Append the EOF token
        return tokens
