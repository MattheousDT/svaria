import adapter from "@sveltejs/adapter-vercel";
import { mdsvex } from "mdsvex";
import path from "path";
import preprocess from "svelte-preprocess";
import Icons from "unplugin-icons/vite";
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin.js";
import WindiCSS from "vite-plugin-windicss";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [
		mdsvex({ extensions: [".md"] }),
		preprocess({
			scss: {
				includePaths: ["src/site/scss"],
			},
		}),
	],
	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				Icons({
					compiler: "svelte",
				}),
				WindiCSS(),
				precompileIntl("locales"),
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
