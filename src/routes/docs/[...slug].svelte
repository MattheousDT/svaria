<script lang="ts" context="module">
	import { page } from "$app/stores";
	import Error from "$site/components/error.svelte";
	import DocsLayout from "$site/components/layout/docs_layout.svelte";
	import type { Load } from "@sveltejs/kit";
	import { getCurrentLocale, locale } from "svelte-intl-precompile";

	export const load: Load = async ({ params, session }) => {
		let docs: any;
		let availableInCurrentLocale: boolean;

		try {
			docs = await import(`../../docs/${getCurrentLocale()}/${params.slug}.md`);
			availableInCurrentLocale = true;
		} catch {
			try {
				docs = await import(`../../docs/en/${params.slug}.md`);
				availableInCurrentLocale = false;
			} catch {
				docs = null;
			}
		}

		if (!docs) {
			return {
				status: 404,
				error: "Page not found",
			};
		}

		return { props: { body: docs.default, metadata: docs.metadata, availableInCurrentLocale } };
	};
</script>

<script lang="ts">
	export let availableInCurrentLocale: boolean;
	export let body: any;
	export let metadata: {
		pretitle: string;
		title: string;
		description: string;
		slug: string;
		aria: string;
		github: string;
		repl: string;
	};

	let updateDocsLocale = async (locale: string) => {
		let docs: any;
		try {
			docs = await import(`../../docs/${locale}/${$page.params.slug}.md`);
			availableInCurrentLocale = true;
		} catch {
			try {
				docs = await import(`../../docs/en/${$page.params.slug}.md`);
				availableInCurrentLocale = false;
			} catch {
				docs = null;
			}
		}

		if (docs) {
			body = docs.default;
			metadata = docs.metadata;
		}
	};

	$: {
		updateDocsLocale($locale);
	}
</script>

<DocsLayout>
	{#if !availableInCurrentLocale}
		<Error>This page is not available in your current language.</Error>
	{/if}
	<div class="content">
		<h1 class="font-heading text-7xl mb-4 font-bold text-blue-900">
			{#if metadata.pretitle}
				<p class="text-2xl">{metadata.pretitle}</p>
			{/if}
			{metadata.title}
		</h1>
		{#if metadata.description}
			<big class="mb-2 text-grey font-medium">{metadata.description}</big>
		{/if}
		<div class="md">
			<svelte:component this={body} />
		</div>
	</div>
</DocsLayout>

<style lang="scss">
	.md {
		margin: 3.75rem 0;

		:global(table) {
			width: 100%;
			text-align: left;
			border-collapse: collapse;
			margin: 2rem 0;
		}
		:global(td),
		:global(th) {
			// border: 2px solid $navy;
			padding: 10px 20px;
		}

		:global(th) {
			font-size: 18px;
			// font-family: $sans-primary;
			font-weight: 700;
		}
	}
</style>
