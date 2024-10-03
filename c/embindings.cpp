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
        .function("getStack", optional_override([](BytecodeInterpreter& self) {
            int stackSize;
            const int* stack = get_stack(&self, &stackSize);
            return val::array(stack, stack + stackSize);
        }))
        .function("getIP", optional_override([](BytecodeInterpreter& self) {
            return self.ip;
        }));

}
