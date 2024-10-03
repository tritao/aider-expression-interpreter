import { describe, expect, it } from "bun:test";
import { spawn } from "node:child_process";

describe("REPL", () => {
	it("should evaluate simple expressions", (done) => {
		const repl = spawn("bun", ["main.js"], { stdio: "pipe" });

		repl.stdout.on("data", (data) => {
			const output = data.toString();
			if (output.includes("Result:")) {
				expect(output).toContain("Result: 8");
				repl.kill();
				done();
			}
		});

		repl.stdin.write("3 + 5\n");
	});

	it("should handle invalid input gracefully", (done) => {
		const repl = spawn("bun", ["main.js"]);

		repl.stderr.on("data", (data) => {
			const output = data.toString();
			if (output.includes("Error:")) {
				expect(output).toContain("Error: Invalid character");
				repl.kill();
				done();
			}
		});

		repl.stdin.write("3 & 5\n");
	});

	it('should exit on "exit" command', (done) => {
		const repl = spawn("bun", ["main.js"], { stdio: "pipe" });

		repl.on("close", (code) => {
			expect(code).toBe(0);
			done();
		});

		repl.stdin.write("exit\n");
	});
});
