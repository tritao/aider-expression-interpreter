from lexer import TokenType

class NumberNode:
    def __init__(self, value):
        self.value = value

class BinaryOpNode:
    def __init__(self, left, op, right):
        self.left = left
        self.op = op
        self.right = right

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.current_token = self.tokens[self.pos]

    def error(self):
        raise Exception("Invalid syntax")

    def eat(self, token_type):
        if self.current_token.type == token_type:
            self.pos += 1
            if self.pos < len(self.tokens):
                self.current_token = self.tokens[self.pos]
        else:
            self.error()

    def parse(self):
        return self.expr()

    def expr(self):
        node = self.term()
        while self.current_token.type in (TokenType.PLUS, TokenType.MINUS):
            token = self.current_token
            if token.type == TokenType.PLUS:
                self.eat(TokenType.PLUS)
            elif token.type == TokenType.MINUS:
                self.eat(TokenType.MINUS)
            node = BinaryOpNode(left=node, op=token, right=self.term())
        return node

    def term(self):
        node = self.factor()
        while self.current_token.type in (TokenType.TIMES, TokenType.DIVIDE):
            token = self.current_token
            if token.type == TokenType.TIMES:
                self.eat(TokenType.TIMES)
            elif token.type == TokenType.DIVIDE:
                self.eat(TokenType.DIVIDE)
            node = BinaryOpNode(left=node, op=token, right=self.factor())
        return node

    def factor(self):
        token = self.current_token
        if token.type == TokenType.NUMBER:
            self.eat(TokenType.NUMBER)
            return NumberNode(value=token.value)
        elif token.type == TokenType.LPAREN:
            self.eat(TokenType.LPAREN)
            node = self.expr()
            self.eat(TokenType.RPAREN)
            return node
        else:
            self.error()
