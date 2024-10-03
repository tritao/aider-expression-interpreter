// import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// describe("Emscripten Module", () => {
// 	it("should load the WebAssembly module", async () => {
		const wasmPath = join(__dirname, "../c/bytecode_runner.js");
		const Module = import.meta.require(wasmPath);

		const instance = await Module();
// 		expect(instance).toBeDefined();
// 		expect(instance._init_interpreter).toBeInstanceOf(Function);
// 	});
// });
