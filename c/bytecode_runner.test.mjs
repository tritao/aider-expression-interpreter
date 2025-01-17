import Module from './bytecode_runner.node.mjs';

Module().then(instance => {
    const bytecode = new Uint8Array([1, 10, 1, 20, 2, 6]); // Example bytecode: PUSH 10, PUSH 20, ADD, HALT
    const interpreter = new instance.BytecodeInterpreter();
    interpreter.init(bytecode);

    let result;
    do {
        result = interpreter.step();
        const ip = interpreter.getIP();
        const stack = interpreter.getStack();
        console.log(`IP: ${ip}, Intermediate stack:`, stack);
    } while (result > 0);

    const stack = interpreter.getStack();
    console.log('Final stack:', stack);
});
