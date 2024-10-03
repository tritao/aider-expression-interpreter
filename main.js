const { Lexer } = require('./lexer');
const { Parser } = require('./parser');

function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt('calc> ');
    rl.prompt();

    rl.on('line', (line) => {
        try {
            const text = line.trim();
            if (text.toLowerCase() === 'exit' || text.toLowerCase() === 'quit') {
                rl.close();
                return;
            }

            const lexer = new Lexer(text);
            const tokens = lexer.tokenize();

            const parser = new Parser(tokens);
            const ast = parser.parse();

            console.log('AST:', ast.toString());

            const result = ast.evaluate();
            console.log('Result:', result);
        } catch (e) {
            console.error(`Error: ${e.message}`);
        }
        rl.prompt();
    });

    rl.on('close', () => {
        console.log('Exiting calculator.');
        process.exit(0);
    });
}

main();
