#include "bytecode_interpreter.h"
#include <stdio.h>
#include "bytecode_values.h"

int execute_bytecode(const unsigned char *bytecode, size_t length) {
    int stack[256];
    int sp = -1; // Stack pointer

    for (size_t i = 0; i < length; ++i) {
        printf("Processing bytecode: %x\n", bytecode[i]);
        switch (bytecode[i]) {
            case BYTECODE_PUSH: // PUSH
                stack[++sp] = bytecode[++i];
                break;
            case BYTECODE_ADD: // ADD
                stack[sp - 1] = stack[sp - 1] + stack[sp];
                sp--;
                break;
            case BYTECODE_SUB: // SUB
                stack[sp - 1] = stack[sp - 1] - stack[sp];
                sp--;
                break;
            case BYTECODE_MUL: // MUL
                stack[sp - 1] = stack[sp - 1] * stack[sp];
                sp--;
                break;
            case BYTECODE_DIV: // DIV
                stack[sp - 1] = stack[sp - 1] / stack[sp];
                sp--;
                break;
            case BYTECODE_HALT: // HALT
                return stack[sp];
            default:
                fprintf(stderr, "Unknown bytecode: %x\n", bytecode[i]);
                return -1;
        }
    }
    return -1;
}
