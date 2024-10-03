#ifndef BYTECODE_INTERPRETER_H
#define BYTECODE_INTERPRETER_H

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>

typedef struct {
    const unsigned char *bytecode;
    size_t length;
    int stack[256];
    int sp; // Stack pointer
    size_t ip; // Instruction pointer
} BytecodeInterpreter;

void init_interpreter(BytecodeInterpreter *interpreter, const unsigned char *bytecode, size_t length);
int step(BytecodeInterpreter *interpreter);
const int* get_stack(const BytecodeInterpreter *interpreter, int *stack_size);

#ifdef __cplusplus
}
#endif

#endif // BYTECODE_INTERPRETER_H
