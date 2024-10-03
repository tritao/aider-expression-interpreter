import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// describe("Node.js Emscripten Module", () => {
// 	it("should load the WebAssembly module", async () => {
		const wasmPath = join(__dirname, "../c/bytecode_runner.js");
		const Module = require(wasmPath);

		const instance = await Module();
		expect(instance).toBeDefined();
		expect(instance._init_interpreter).toBeInstanceOf(Function);
// 	});
// });
