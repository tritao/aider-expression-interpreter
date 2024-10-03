import unittest
from lexer import Lexer, Token

class TestLexer(unittest.TestCase):
    def test_single_number(self):
        lexer = Lexer("42")
        tokens = lexer.tokenize()
        expected_tokens = [Token('NUMBER', 42)]
        self.assertEqual(tokens, expected_tokens)

    def test_simple_addition(self):
        lexer = Lexer("3 + 5")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token('NUMBER', 3),
            Token('PLUS', '+'),
            Token('NUMBER', 5)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_mixed_operations(self):
        lexer = Lexer("7 - 2 * 3")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token('NUMBER', 7),
            Token('MINUS', '-'),
            Token('NUMBER', 2),
            Token('MUL', '*'),
            Token('NUMBER', 3)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_parentheses(self):
        lexer = Lexer("(1 + 2) * 4")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token('LPAREN', '('),
            Token('NUMBER', 1),
            Token('PLUS', '+'),
            Token('NUMBER', 2),
            Token('RPAREN', ')'),
            Token('MUL', '*'),
            Token('NUMBER', 4)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_whitespace_handling(self):
        lexer = Lexer("  9 + 10  ")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token('NUMBER', 9),
            Token('PLUS', '+'),
            Token('NUMBER', 10)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_invalid_characters(self):
        lexer = Lexer("5 & 3")
        with self.assertRaises(Exception):  # Adjust the exception type based on your implementation
            lexer.tokenize()

    def test_floating_point_numbers(self):
        lexer = Lexer("3.14 + 2.71")
        tokens = lexer.tokenize()
        expected_tokens = [
            Token('NUMBER', 3.14),
            Token('PLUS', '+'),
            Token('NUMBER', 2.71)
        ]
        self.assertEqual(tokens, expected_tokens)

    def test_consecutive_operators(self):
        lexer = Lexer("4++5")
        with self.assertRaises(Exception):  # Adjust the exception type based on your implementation
            lexer.tokenize()

if __name__ == '__main__':
    unittest.main()
