from lexer import Lexer
from parser import Parser

def main():
    while True:
        try:
            # Read input from the user
            text = input('calc> ')
            if text.strip().lower() in {'exit', 'quit'}:
                break

            # Tokenize the input
            lexer = Lexer(text)
            tokens = lexer.tokenize()

            # Parse the tokens
            parser = Parser(tokens)
            ast = parser.parse()

            # Print the AST
            print("AST:", ast)

            # Evaluate the AST and print the result
            result = ast.evaluate()
            print("Result:", result)

        except Exception as e:
            print(f"Error: {e}")

if __name__ == '__main__':
    main()
