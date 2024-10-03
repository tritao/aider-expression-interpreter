import unittest
from lexer import Lexer, Token, TokenType

class TestLexer(unittest.TestCase):
    def test_single_number(self):
        lexer = Lexer("42")
        tokens = lexer.tokenize()
        expected_tokens = [Token(TokenType.NUMBER, 42), Token(TokenType.EOF, None)]
        self.assertEqual(tokens, expected_tokens)

    def test_simple_addition(self):
        lexer = Lexer("3 + 5")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token(TokenType.NUMBER, 3),
            Token(TokenType.PLUS, '+'),
            Token(TokenType.NUMBER, 5),
            Token(TokenType.EOF, None)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_mixed_operations(self):
        lexer = Lexer("7 - 2 * 3")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token(TokenType.NUMBER, 7),
            Token(TokenType.MINUS, '-'),
            Token(TokenType.NUMBER, 2),
            Token(TokenType.TIMES, '*'),
            Token(TokenType.NUMBER, 3),
            Token(TokenType.EOF, None)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_parentheses(self):
        lexer = Lexer("(1 + 2) * 4")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token(TokenType.LPAREN, '('),
            Token(TokenType.NUMBER, 1),
            Token(TokenType.PLUS, '+'),
            Token(TokenType.NUMBER, 2),
            Token(TokenType.RPAREN, ')'),
            Token(TokenType.TIMES, '*'),
            Token(TokenType.NUMBER, 4),
            Token(TokenType.EOF, None)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_whitespace_handling(self):
        lexer = Lexer("  9 + 10  ")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token(TokenType.NUMBER, 9),
            Token(TokenType.PLUS, '+'),
            Token(TokenType.NUMBER, 10),
            Token(TokenType.EOF, None)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_invalid_characters(self):
        lexer = Lexer("5 & 3")
        with self.assertRaises(Exception):
            lexer.tokenize()

    def test_floating_point_numbers(self):
        lexer = Lexer("3.14 + 2.71")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token(TokenType.NUMBER, 3.14),
            Token(TokenType.PLUS, '+'),
            Token(TokenType.NUMBER, 2.71),
            Token(TokenType.EOF, None)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_consecutive_operators(self):
        lexer = Lexer("4++5")
        with self.assertRaises(Exception):
            lexer.tokenize()

if __name__ == '__main__':
    unittest.main()
