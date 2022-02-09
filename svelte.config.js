import adapter from "@sveltejs/adapter-vercel";
import { mdsvex } from "mdsvex";
import path from "path";
import preprocess from "svelte-preprocess";
import Icons from "unplugin-icons/vite";
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin.js";
import WindiCSS from "vite-plugin-windicss";
import { readFileSync } from "fs";
import shiki from "shiki";

const palenightTheme = JSON.parse(readFileSync(path.join(process.cwd(), "./bin/palenight.json")));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [
		mdsvex({
			extensions: [".md"],
			highlight: {
				highlighter: async (code, lang) => {
					const html = (
						await shiki.getHighlighter({
							theme: palenightTheme,
						})
					)
						.codeToHtml(code, { lang })
						.replace(/[{}`]/g, (c) => ({ "{": "&#123;", "}": "&#125;", "`": "&#96;" }[c]))
						.replace(/\\([trn])/g, "&#92;$1");

					return `{@html \`${html}\` }`;
				},
			},
		}),
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
					$examples: path.resolve("./src/examples"),
					svaria: path.resolve("./src/lib"),
				},
			},
		},
	},
};

export default config;
