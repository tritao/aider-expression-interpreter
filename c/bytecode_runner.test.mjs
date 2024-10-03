import Module from './bytecode_runner.mjs';

// The Module function returns a Promise when instantiated
Module().then(instance => {
    // The instance object is the compiled WebAssembly module
    console.log('WASM Module loaded:', instance.BytecodeInterpreter);

    const bytecode = new Uint8Array([1, 10, 1, 20, 2, 0]); // Example bytecode: PUSH 10, PUSH 20, ADD, HALT
    const interpreter = new instance.BytecodeInterpreter();
    interpreter.init(bytecode, bytecode.length);

    let result;
    do {
        result = interpreter.step();
    } while (result > 0);

    const memory = new WebAssembly.Memory({ initial: 1 });
    const memoryView = new DataView(memory.buffer);

    const stackSizePtr = 0; // Use the first 4 bytes of memory for stack size
    const stackPtr = 4; // Use the next bytes for the stack

    interpreter.getStack(stackSizePtr);

    const stackSize = memoryView.getInt32(stackSizePtr, true);
    const stack = [];
    for (let i = 0; i < stackSize; i++) {
        stack.push(memoryView.getInt32(stackPtr + i * 4, true));
    }

    console.log('Final stack:', stack);
});
