<script lang="ts">
	import Github from "~icons/uil/github";
	import IconSvelte from "./icons/icon_svelte.svelte";
	import W3c from "./icons/icon_w3c.svelte";

	export let icon: string;
	export let text: string;
	export let subtext: string;
	export let href: string;

	let logos = {
		github: Github,
		svelte: IconSvelte,
		w3c: W3c,
	};
</script>

<a {href} class="inline-flex items-center w-full md:w-auto p-3 pr-8 rounded-lg bg-grey-200 hover:bg-grey-300">
	<div class="flex items-center justify-center w-12 h-12">
		<svelte:component this={logos[icon]} class="max-w-full h-8 w-full max-w-10 text-blue-900" />
	</div>
	<div class="flex flex-col text-left ml-3">
		<p class="font-bold leading-none text-blue-900">{text}</p>
		<small class="text-sub text-grey">{subtext}</small>
	</div>
</a>
