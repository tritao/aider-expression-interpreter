#ifndef BYTECODE_INTERPRETER_H
#define BYTECODE_INTERPRETER_H

#include <stddef.h>

int execute_bytecode(const unsigned char *bytecode, size_t length);

#endif // BYTECODE_INTERPRETER_H
