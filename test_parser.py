import unittest
from lexer import Lexer, Token, TokenType
from parser import Parser, NumberNode, BinaryOpNode

class TestParser(unittest.TestCase):
    def test_single_number(self):
        lexer = Lexer("42")
        tokens = lexer.tokenize()
        parser = Parser(tokens)
        ast = parser.parse()
        expected_ast = NumberNode(42)
        self.assertEqual(ast.value, expected_ast.value)

    def test_simple_addition(self):
        lexer = Lexer("3 + 5")
        tokens = lexer.tokenize()
        parser = Parser(tokens)
        ast = parser.parse()
        expected_ast = BinaryOpNode(
            left=NumberNode(3),
            op=Token(TokenType.PLUS, '+'),
            right=NumberNode(5)
        )
        self.assertEqual(ast.left.value, expected_ast.left.value)
        self.assertEqual(ast.op.type, expected_ast.op.type)
        self.assertEqual(ast.right.value, expected_ast.right.value)

    def test_mixed_operations(self):
        lexer = Lexer("7 - 2 * 3")
        tokens = lexer.tokenize()
        parser = Parser(tokens)
        ast = parser.parse()
        expected_ast = BinaryOpNode(
            left=NumberNode(7),
            op=Token(TokenType.MINUS, '-'),
            right=BinaryOpNode(
                left=NumberNode(2),
                op=Token(TokenType.TIMES, '*'),
                right=NumberNode(3)
            )
        )
        self.assertEqual(ast.left.value, expected_ast.left.value)
        self.assertEqual(ast.op.type, expected_ast.op.type)
        self.assertEqual(ast.right.left.value, expected_ast.right.left.value)
        self.assertEqual(ast.right.op.type, expected_ast.right.op.type)
        self.assertEqual(ast.right.right.value, expected_ast.right.right.value)

    def test_parentheses(self):
        lexer = Lexer("(1 + 2) * 4")
        tokens = lexer.tokenize()
        parser = Parser(tokens)
        ast = parser.parse()
        expected_ast = BinaryOpNode(
            left=BinaryOpNode(
                left=NumberNode(1),
                op=Token('PLUS', '+'),
                right=NumberNode(2)
            ),
            op=Token(TokenType.TIMES, '*'),
            right=NumberNode(4)
        )
        self.assertEqual(ast.left.left.value, expected_ast.left.left.value)
        self.assertEqual(ast.left.op.type, expected_ast.left.op.type)
        self.assertEqual(ast.left.right.value, expected_ast.left.right.value)
        self.assertEqual(ast.op.type, expected_ast.op.type)
        self.assertEqual(ast.right.value, expected_ast.right.value)

    def test_division(self):
        lexer = Lexer("8 / 2")
        tokens = lexer.tokenize()
        parser = Parser(tokens)
        ast = parser.parse()
        expected_ast = BinaryOpNode(
            left=NumberNode(8),
            op=Token(TokenType.DIVIDE, '/'),
            right=NumberNode(2)
        )
        self.assertEqual(ast.left.value, expected_ast.left.value)
        self.assertEqual(ast.op.type, expected_ast.op.type)
        self.assertEqual(ast.right.value, expected_ast.right.value)

    def test_nested_parentheses(self):
        lexer = Lexer("(3 + (2 * 5))")
        tokens = lexer.tokenize()
        parser = Parser(tokens)
        ast = parser.parse()
        expected_ast = BinaryOpNode(
            left=NumberNode(3),
            op=Token(TokenType.PLUS, '+'),
            right=BinaryOpNode(
                left=NumberNode(2),
                op=Token(TokenType.TIMES, '*'),
                right=NumberNode(5)
            )
        )
        self.assertEqual(ast.left.value, expected_ast.left.value)
        self.assertEqual(ast.op.type, expected_ast.op.type)
        self.assertEqual(ast.right.left.value, expected_ast.right.left.value)
        self.assertEqual(ast.right.op.type, expected_ast.right.op.type)
        self.assertEqual(ast.right.right.value, expected_ast.right.right.value)

if __name__ == '__main__':
    unittest.main()
