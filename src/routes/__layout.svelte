<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";
	import { init, register, waitLocale } from "svelte-intl-precompile";

	// @ts-expect-error
	register("en", () => import("$locales/en"));
	// @ts-expect-error
	register("es", () => import("$locales/es"));
	// @ts-expect-error
	register("ko", () => import("$locales/ko"));

	export const load: Load = async ({ session }) => {
		init({
			fallbackLocale: "en",
			initialLocale: session["locale"],
		});
		await waitLocale();
		return {};
	};
</script>

<script lang="ts">
	import "virtual:windi.css";
	import shortcut from "$lib/actions/shortcut";
	import type { IShortcut } from "svaria";
	import Nav from "$site/components/nav.svelte";
	// import Shortcuts from "$site/components/shortcuts.svelte";
	import { shortcutsVisibility } from "$site/stores/prefs";

	let navHeight: number;

	let globalShortcuts: IShortcut[] = [
		{
			name: "Toggle shortcuts",
			description: "Show/hide the shortcuts list",
			key: "/",
			callback: () => shortcutsVisibility.update((x) => (x = !x)),
		},
	];
</script>

<svelte:body use:shortcut={globalShortcuts} />

<div class="bg-grey-100 flex flex-col min-h-screen">
	<Nav bind:height={navHeight} />
	<main class="flex-1" style:padding-top="{navHeight / 16}rem">
		<slot />
	</main>
	<footer class="flex items-center justify-center text-center text-grey p-8 z-10 bg-grey-200">
		Made with ❤ in Belfast
	</footer>
</div>

<!-- <Shortcuts /> -->
<style lang="scss" global>
	@import url("https://fonts.googleapis.com/css?family=Lato:400+500+700|Space+Grotesk:700|Fira+Code");

	.font-heading {
		letter-spacing: -0.03em;
	}

	.underline-beneath {
		position: relative;
		z-index: 0;

		&::before {
			content: "";
			width: 102%;
			height: 0.25em;
			background: linear-gradient(180deg, #fbced6 0%, #f8d4c5 100%);
			position: absolute;
			z-index: -1;
			bottom: 0.15em;
			left: -1%;
			border-radius: 4px;
		}
	}

	code {
		font-family: "Fira Code", "Consolas", monospace;
	}

	code:not([class^="language"]) {
		padding: 4px 8px;
		border-radius: 6px;
		background: #e9e9e9;
		display: inline-block;
	}

	code[class^="language"] {
		display: block;
		padding: 2rem;
		background-color: #292d3e;
		color: #bfc7d5;
		overflow-x: auto;
		font-size: 1rem;

		.token {
			&.punctuation {
				color: #bfc7d5;
			}
			&.keyword,
			&.namespace {
				color: #c792ea;
			}
			&.function {
				color: #82aaff;
			}
			&.tag,
			&.interpolation-punctuation {
				color: #ff5572;
			}
			&.attr-name,
			&.class-name {
				color: #ffcb6b;
			}
			&.attr-value,
			&.string {
				color: #c3e88d;
			}
			&.operator {
				color: #89ddff;
			}
			&.number {
				color: #f78c6c;
			}
		}
	}
</style>
