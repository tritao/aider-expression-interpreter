import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: "./web.js", // Specify your entry point here
		},
	},
});
