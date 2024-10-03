// import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// describe("Emscripten Module", () => {
// 	it("should load the WebAssembly module", async () => {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = dirname(__filename);
		const wasmPath = join(__dirname, "../c/bytecode_runner.js");
		const Module = import.meta.require(wasmPath);

		const instance = await Module();
// 		expect(instance).toBeDefined();
// 		expect(instance._init_interpreter).toBeInstanceOf(Function);
// 	});
// });
