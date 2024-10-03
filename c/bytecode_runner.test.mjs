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

    const stackSizePtr = instance._malloc(4);
    const stackPtr = interpreter.getStack(stackSizePtr);
    const stackSize = instance.getValue(stackSizePtr, 'i32');
    const stack = [];
    for (let i = 0; i < stackSize; i++) {
        stack.push(instance.getValue(stackPtr + i * 4, 'i32'));
    }
    instance._free(stackSizePtr);

    console.log('Final stack:', stack);
});
