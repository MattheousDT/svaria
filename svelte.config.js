import adapter from "@sveltejs/adapter-vercel";
import path from "path";
import preprocess from "svelte-preprocess";
import Icons from "unplugin-icons/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			includePaths: ["src/site/scss"],
		},
	}),
	kit: {
		adapter: adapter(),
		target: "#svelte",
		vite: {
			plugins: [
				Icons({
					compiler: "svelte",
				}),
			],
			resolve: {
				alias: {
					$site: path.resolve("./src/site"),
					svaria: path.resolve("./src/lib"),
				},
			},
		},
	},
};

export default config;
