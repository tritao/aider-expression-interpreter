#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include "bytecode_interpreter.h"


using namespace emscripten;

EMSCRIPTEN_BINDINGS(bytecode_interpreter) {
    class_<BytecodeInterpreter>("BytecodeInterpreter")
        .constructor<>()
        .function("init", optional_override([](BytecodeInterpreter& self, uintptr_t bytecodePtr, size_t length) {
            init_interpreter(&self, reinterpret_cast<const unsigned char*>(bytecodePtr), length);
        }))
        .function("step", &step, allow_raw_pointers())
        .function("getStack", &get_stack, allow_raw_pointers());

    register_vector<int>("IntVector");
}
