#include "bytecode_interpreter.h"
#include <stdio.h>

int execute_bytecode(const unsigned char *bytecode, size_t length) {
    int stack[256];
    int sp = -1; // Stack pointer

    for (size_t i = 0; i < length; ++i) {
        switch (bytecode[i]) {
            case 0x01: // PUSH
                stack[++sp] = bytecode[++i];
                break;
            case 0x02: // ADD
                stack[sp - 1] = stack[sp - 1] + stack[sp];
                sp--;
                break;
            case 0x03: // SUB
                stack[sp - 1] = stack[sp - 1] - stack[sp];
                sp--;
                break;
            case 0x04: // MUL
                stack[sp - 1] = stack[sp - 1] * stack[sp];
                sp--;
                break;
            case 0x05: // DIV
                stack[sp - 1] = stack[sp - 1] / stack[sp];
                sp--;
                break;
            case 0x06: // HALT
                return stack[sp];
            default:
                fprintf(stderr, "Unknown bytecode: %x\n", bytecode[i]);
                return -1;
        }
    }
    return -1;
}
