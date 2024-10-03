#include "bytecode_interpreter.h"
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <bytecode-file>\n", argv[0]);
        return 1;
    }

    const char *filename = argv[1];
    FILE *file = fopen(filename, "rb");
    if (!file) {
        perror("Failed to open file");
        return 1;
    }

    fseek(file, 0, SEEK_END);
    long length = ftell(file);
    fseek(file, 0, SEEK_SET);

    unsigned char *bytecode = malloc(length);
    if (!bytecode) {
        perror("Failed to allocate memory");
        fclose(file);
        return 1;
    }

    if (fread(bytecode, 1, length, file) != (size_t)length) {
        perror("Failed to read bytecode");
        free(bytecode);
        return 1;
    }
    fclose(file);

    if (length == 0) {
        fprintf(stderr, "Bytecode file is empty\n");
        free(bytecode);
        return 1;
    }

    BytecodeInterpreter interpreter;
    init_interpreter(&interpreter, bytecode, length);

    int step_result;
    while ((step_result = step(&interpreter)) > 0) {
        // Continue stepping through the bytecode
    }

    if (step_result == 0) {
        int stack_size;
        const int *stack = get_stack(&interpreter, &stack_size);
        printf("Execution finished. Stack size: %d\n", stack_size);
        for (int i = 0; i < stack_size; i++) {
            printf("Stack[%d]: %d\n", i, stack[i]);
        }
    } else {
        fprintf(stderr, "Error during bytecode execution\n");
    }

    free(bytecode);
    return 0;
}
