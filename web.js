import express from "express";
import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send(`
    <html>
      <body>
        <h1>Expression Evaluator</h1>
        <form action="/" method="post">
          <input type="text" name="expression" placeholder="Enter expression" required>
          <button type="submit">Evaluate</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/", (req, res) => {
	const expression = req.body.expression;
	try {
		const lexer = new Lexer(expression);
		const tokens = lexer.tokenize();

		const parser = new Parser(tokens);
		const ast = parser.parse();

		const result = ast.evaluate();
		const astTree = renderAST(ast);
		res.send(`
      <html>
        <body>
          <h1>Expression Evaluator</h1>
          <form action="/" method="post">
            <input type="text" name="expression" placeholder="Enter expression" required>
            <button type="submit">Evaluate</button>
          </form>
          <h2>Result: ${result}</h2>
          <h2>AST:</h2>
          <pre>${astTree}</pre>
        </body>
      </html>
    `);
	} catch (e) {
		res.send(`
      <html>
        <body>
          <h1>Expression Evaluator</h1>
          <form action="/" method="post">
            <input type="text" name="expression" placeholder="Enter expression" required>
            <button type="submit">Evaluate</button>
          </form>
          <h2>Error: ${e.message}</h2>
        </body>
      </html>
    `);
	}
});

function renderAST(node, depth = 0) {
	let result = "";
	const indent = "  ".repeat(depth);
	if (node instanceof NumberNode) {
		result += `${indent}NumberNode(${node.value})\n`;
	} else if (node instanceof BinaryOpNode) {
		result += `${indent}BinaryOpNode(\n`;
		result += renderAST(node.left, depth + 1);
		result += `${indent}  ${node.op.type}\n`;
		result += renderAST(node.right, depth + 1);
		result += `${indent})\n`;
	}
	return result;
}

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
