import { describe, it, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

describe("Emscripten Module", () => {
  it("should load the WebAssembly module", async () => {
    const wasmPath = join(__dirname, "../c/bytecode_runner.js");
    const Module = require(wasmPath);

    const instance = await Module();
    expect(instance).toBeDefined();
    expect(instance._init_interpreter).toBeInstanceOf(Function);
  });
});
