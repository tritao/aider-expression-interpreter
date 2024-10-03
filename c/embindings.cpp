#include <emscripten/bind.h>
#include "bytecode_interpreter.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(bytecode_interpreter) {
    class_<BytecodeInterpreter>("BytecodeInterpreter")
        .constructor<>()
        .function("init", &init_interpreter, allow_raw_pointers())
        .function("step", &step)
        .function("getStack", &get_stack, allow_raw_pointers());

    register_vector<int>("IntVector");
}
