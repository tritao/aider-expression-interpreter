import { evaluateExpression } from "../web.js";

document
	.getElementById("expressionForm")
	.addEventListener("submit", (event) => {
		event.preventDefault();
		const expression = document.getElementById("expressionInput").value;
		try {
			const { result, astTree, bytecodeStack } = evaluateExpression(expression);
			document.getElementById("result").innerHTML = `
            <h2>Result: ${result}</h2>
            <h2>Bytecode Stack:</h2>
            <pre>${bytecodeStack}</pre>
            <h2>AST:</h2>
            <pre>${astTree}</pre>
        `;
		} catch (e) {
			document.getElementById("result").innerHTML = `<h2>${e.message}</h2>`;
		}
	});

function setExpression(expression) {
	document.getElementById("expressionInput").value = expression;
}
