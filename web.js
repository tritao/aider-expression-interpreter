import express from "express";
import { ASTToBytecode } from "./ast-to-bytecode.js";
import { Lexer } from "./lexer.js";
import { BinaryOpNode, NumberNode, Parser } from "./parser.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

function generateHTML(content = "", expression = "") {
	return `
    <html>
      <body>
        <h1>Expression Evaluator</h1>
        <form id="expressionForm" action="/" method="post">
          <input id="expressionInput" type="text" name="expression" placeholder="Enter expression" value="${expression}" required>
          <button type="submit">Evaluate</button>
        </form>
        <div>
          <button onclick="setExpression('3 + 5')">3 + 5</button>
          <button onclick="setExpression('7 - 2 * 3')">7 - 2 * 3</button>
          <button onclick="setExpression('(1 + 2) * 4')">(1 + 2) * 4</button>
          <button onclick="setExpression('8 / 2')">8 / 2</button>
          <button onclick="setExpression('3.14 + 2.71')">3.14 + 2.71</button>
        </div>
        ${content}
        <script>
          function setExpression(expression) {
            document.getElementById('expressionInput').value = expression;
            document.getElementById('expressionForm').submit();
          }
        </script>
      </body>
    </html>
  `;
}

app.get("/", (req, res) => {
	res.send(generateHTML());
});

app.post("/", (req, res) => {
	const expression = req.body.expression;
	try {
		const lexer = new Lexer(expression);
		const tokens = lexer.tokenize();

		const parser = new Parser(tokens);
		const ast = parser.parse();

		const converter = new ASTToBytecode();
		const bytecode = converter.convert(ast);

		const result = ast.evaluate();
		const astTree = renderAST(ast);
		const bytecodeStack = renderBytecodeStack(bytecode);
		res.send(
			generateHTML(
				`<h2>Result: ${result}</h2><h2>Bytecode Stack:</h2><pre>${bytecodeStack}</pre><h2>AST:</h2><pre>${astTree}</pre>`,
				expression,
			),
		);
	} catch (e) {
		res.send(generateHTML(`<h2>Error: ${e.message}</h2>`, expression));
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

function renderBytecodeStack(bytecode) {
    let stackDisplay = "";
    for (let i = 0; i < bytecode.length; i++) {
        stackDisplay += `${i}: ${bytecode[i]}\n`;
        if (bytecode[i] === "PUSH") {
            i++;
            stackDisplay += `${i}: ${bytecode[i]}\n`;
        }
    }
    return stackDisplay;
}

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
