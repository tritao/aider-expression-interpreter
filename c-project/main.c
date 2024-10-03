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

    fread(bytecode, 1, length, file);
    fclose(file);

    int result = execute_bytecode(bytecode, length);
    printf("Result: %d\n", result);

    free(bytecode);
    return 0;
}