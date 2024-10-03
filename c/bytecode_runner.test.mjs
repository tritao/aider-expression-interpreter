import Module from './bytecode_runner.mjs';

Module().then(instance => {
    const bytecode = new Uint8Array([1, 10, 1, 20, 2, 6]); // Example bytecode: PUSH 10, PUSH 20, ADD, HALT
    const interpreter = new instance.BytecodeInterpreter();
    interpreter.init(bytecode);

    let result;
    do {
        result = interpreter.step();
    } while (result > 0);

    const memory = new WebAssembly.Memory({ initial: 1 });
    const memoryView = new DataView(memory.buffer);

    const stackSizePtr = 0; // Use the first 4 bytes of memory for stack size
    const stackPtr = 4; // Use the next bytes for the stack

    const stack = interpreter.getStack();

    console.log('Final stack:', stack);
});
