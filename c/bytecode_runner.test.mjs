import Module from './bytecode_runner.mjs';

Module().then(instance => {
    const bytecode = new Uint8Array([1, 10, 1, 20, 2, 6]); // Example bytecode: PUSH 10, PUSH 20, ADD, HALT
    const interpreter = new instance.BytecodeInterpreter();
    interpreter.init(bytecode);

    let result;
    do {
        result = interpreter.step();
        const stack = interpreter.getStack();
        console.log('Intermediate stack:', stack);
    } while (result > 0);

    const finalStack = interpreter.getStack();
    console.log('Final stack:', finalStack);

    const stack = interpreter.getStack();
    console.log('Final stack:', stack);
});
