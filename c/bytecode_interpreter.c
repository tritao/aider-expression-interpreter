#include "bytecode_interpreter.h"
#include <stdio.h>
#include "bytecode_values.h"

void init_interpreter(BytecodeInterpreter *interpreter, const unsigned char *bytecode, size_t length) {
    interpreter->bytecode = bytecode;
    interpreter->length = length;
    interpreter->sp = -1;
    interpreter->ip = 0;
}

int step(BytecodeInterpreter *interpreter) {
    if (interpreter->ip >= interpreter->length) {
        return -1; // No more instructions
    }

    switch (interpreter->bytecode[interpreter->ip]) {
        case BYTECODE_PUSH: // PUSH
            interpreter->stack[++interpreter->sp] = interpreter->bytecode[++interpreter->ip];
            break;
        case BYTECODE_ADD: // ADD
            interpreter->stack[interpreter->sp - 1] = interpreter->stack[interpreter->sp - 1] + interpreter->stack[interpreter->sp];
            interpreter->sp--;
            break;
        case BYTECODE_SUB: // SUB
            interpreter->stack[interpreter->sp - 1] = interpreter->stack[interpreter->sp - 1] - interpreter->stack[interpreter->sp];
            interpreter->sp--;
            break;
        case BYTECODE_MUL: // MUL
            interpreter->stack[interpreter->sp - 1] = interpreter->stack[interpreter->sp - 1] * interpreter->stack[interpreter->sp];
            interpreter->sp--;
            break;
        case BYTECODE_DIV: // DIV
            interpreter->stack[interpreter->sp - 1] = interpreter->stack[interpreter->sp - 1] / interpreter->stack[interpreter->sp];
            interpreter->sp--;
            break;
        case BYTECODE_HALT: // HALT
            return 0; // Indicate halt
        default:
            fprintf(stderr, "Unknown bytecode: %x\n", interpreter->bytecode[interpreter->ip]);
            return -1;
    }
    interpreter->ip++;
    return 1; // Indicate successful step
}

const int* get_stack(const BytecodeInterpreter *interpreter, int *stack_size) {
    *stack_size = interpreter->sp + 1;
    return interpreter->stack;
}
