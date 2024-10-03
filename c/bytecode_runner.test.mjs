
import Module from './bytecode_runner.mjs';

// The Module function returns a Promise when instantiated
Module().then(instance => {
    // The instance object is the compiled WebAssembly module
    console.log('WASM Module loaded:', instance.BytecodeInterpreter);

    // add core here
});
