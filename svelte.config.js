import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			includePaths: ["src/scss"],
		},
	}),
	kit: {
		adapter: adapter(),
		target: "#svelte",
		vite: {
			resolve: {
				alias: {
					$site: path.resolve("./src/site"),
				},
			},
		},
	},
};

export default config;
