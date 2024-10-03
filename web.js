import { ASTToBytecode } from "./ast-to-bytecode.js";
import { BytecodeDebugger } from "./bytecode-debugger.js";
import { BytecodeInterpreter } from "./bytecode-interpreter.js";
import { Lexer } from "./lexer.js";
import { BinaryOpNode, NumberNode, Parser } from "./parser.js";

document
	.getElementById("expressionForm")
	.addEventListener("submit", (event) => {
		event.preventDefault();
		const expression = document.getElementById("expressionInput").value;
		try {
			const { result, astTree, bytecodeStack, bytecode } =
				evaluateExpression(expression);
			document.getElementById("resultValue").innerText = result;
			document.getElementById("bytecodeStack").innerHTML = bytecodeStack;
			document.getElementById("astTree").innerText = astTree;
			initializeDebugger(bytecode);
		} catch (e) {
			document.getElementById("result").innerHTML = `<h2>${e.message}</h2>`;
		}
	});

window.setExpression = function setExpression(expression) {
	document.getElementById("expressionInput").value = expression;
	document.getElementById("expressionForm").requestSubmit();
};

function evaluateExpression(expression) {
	try {
		const lexer = new Lexer(expression);
		const tokens = lexer.tokenize();

		const parser = new Parser(tokens);
		const ast = parser.parse();

		const converter = new ASTToBytecode();
		const bytecode = converter.convert(ast);

		const interpreter = new BytecodeInterpreter();
		const result = interpreter.execute(bytecode);
		const astTree = renderAST(ast);
		const bytecodeStack = renderBytecodeStack(bytecode);
		return {
			result,
			astTree,
			bytecodeStack,
			bytecode,
		};
	} catch (e) {
		throw new Error(`Error: ${e.message}`);
	}
}

document.getElementById("resetButton").onclick = () => {
	const expression = document.getElementById("expressionInput").value;
	try {
		const { bytecode } = evaluateExpression(expression);
		initializeDebugger(bytecode);
	} catch (e) {
		alert(e.message);
	}
};

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
		if (bytecode[i] === "PUSH") {
			stackDisplay += `<div id="bytecode-${i}">${i}: ${bytecode[i]} ${bytecode[i + 1]}</div>\n`;
			i++; // Skip the operand as it's already included
		} else {
			stackDisplay += `<div id="bytecode-${i}">${i}: ${bytecode[i]}</div>\n`;
		}
	}
	return stackDisplay;
}

function initializeDebugger(bytecode) {
	if (!bytecode || bytecode.length === 0) {
		alert("No bytecode to debug.");
		return;
	}
	const debuggerInstance = new BytecodeDebugger(bytecode);
	updateDebuggerUI(debuggerInstance);

	const stepButton = document.getElementById("stepButton");
	stepButton.onclick = () => {
		try {
			debuggerInstance.step();
			updateDebuggerUI(debuggerInstance);
	    // Disable the step button if there are no more bytecodes to step through
	    stepButton.disabled = debuggerInstance.pc >= debuggerInstance.bytecode.length;
    } catch (e) {
			alert(e.message);
		}
  };
}

function updateDebuggerUI(debuggerInstance) {
	const stackList = debuggerInstance.stack
		.map((value) => `<li>${value}</li>`)
		.join("");
	document.getElementById("debuggerStack").innerHTML =
		`<span>Stack:</span> <ul class="inline">${stackList}</ul>`;
	for (const el of document.querySelectorAll('[id^="bytecode-"]')) {
		el.classList.remove("bg-yellow-200");
	}
	const currentLine = document.getElementById(
		`bytecode-${debuggerInstance.pc}`,
	);
	if (currentLine) {
		currentLine.classList.add("bg-yellow-200");
	}
	document.getElementById("debuggerPC").innerText =
		`Program Counter: ${debuggerInstance.pc}`;
}

export { evaluateExpression };
