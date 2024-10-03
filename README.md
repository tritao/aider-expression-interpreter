# calculator-parser

This project is a demonstration of using AI-assisted coding to rapidly develop and test new approaches in software development. The project was created in a couple of hours using Aider, an AI tool designed to assist developers in writing and refactoring code efficiently.

## Overview

The project includes several components that work together to interpret and execute bytecode. It features a lexer, parser, and interpreters for both JavaScript and WebAssembly environments. The goal is to provide a flexible and efficient way to evaluate expressions and execute bytecode.

## Features

- **Lexer and Parser**: Convert source code into tokens and parse them into an abstract syntax tree (AST).
- **Bytecode Interpreter**: Execute bytecode instructions using different interpreters.
- **WebAssembly Support**: Leverage WebAssembly for executing bytecode in a performant manner.
- **AI-Assisted Development**: Utilized Aider to streamline the development process and implement features quickly.

## Getting Started

To install dependencies:

```bash
bun install
```

## Usage

To run the non-browser CLI tool:

```bash
bun run main.js
```

To run the browser part with Vite:

```bash
bun run dev
```

```bash
bun run main.js
```

## Screenshot

![Screenshot of the application](screenshot.png)

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to Aider for providing the AI tools that made this rapid development possible.
