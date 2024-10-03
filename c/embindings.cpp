#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include "bytecode_interpreter.h"


using namespace emscripten;

EMSCRIPTEN_BINDINGS(bytecode_interpreter) {
    class_<BytecodeInterpreter>("BytecodeInterpreter")
        .constructor<>()
        .function("init", optional_override([](BytecodeInterpreter& self, const val& bytecode) {
            std::vector<unsigned char> bytecodeVec = vecFromJSArray<unsigned char>(bytecode);
            init_interpreter(&self, bytecodeVec.data(), bytecodeVec.size());
        }))
        .function("step", &step, allow_raw_pointers())
        .function("getStack", &get_stack, allow_raw_pointers());

    register_vector<int>("IntVector");
}
