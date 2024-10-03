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
    res.send(`
      <html>
        <body>
          <h1>Expression Evaluator</h1>
          <form action="/" method="post">
            <input type="text" name="expression" placeholder="Enter expression" required>
            <button type="submit">Evaluate</button>
          </form>
          <h2>Result: ${result}</h2>
          <h2>AST: ${ast.toString()}</h2>
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
