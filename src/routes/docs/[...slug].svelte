<script lang="ts" context="module">
	import { page } from "$app/stores";
	import Error from "$site/components/error.svelte";
	import DocsLayout from "$site/components/layout/docs_layout.svelte";
	import type { Load } from "@sveltejs/kit";
	import { getCurrentLocale, locale, t } from "svelte-intl-precompile";

	export const load: Load = async ({ params, session }) => {
		let docs: any;
		let availableInCurrentLocale = true;

		const modules = import.meta.glob("../../docs/**/*.md");

		docs = modules[`../../docs/${getCurrentLocale()}/${params.slug}.md`];

		if (!docs) {
			docs = modules[`../../docs/en/${params.slug}.md`];
			availableInCurrentLocale = false;
		}

		if (!docs) {
			return {
				status: 404,
				error: "Page not found",
			};
		}

		const final = await docs();

		return { props: { body: final.default, metadata: final.metadata, availableInCurrentLocale } };
	};
</script>

<script lang="ts">
	import LogoLinkButton from "$site/components/logo_link_button.svelte";

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
		let inCurrent = true;
		const modules = import.meta.glob("../../docs/**/*.md");

		docs = modules[`../../docs/${locale}/${$page.params.slug}.md`];

		if (!docs) {
			docs = modules[`../../docs/en/${$page.params.slug}.md`];
			inCurrent = false;
		}

		if (!docs) {
			return {
				status: 404,
				error: "Page not found",
			};
		}

		const final = await docs();

		body = final.default;
		metadata = final.metadata;
		availableInCurrentLocale = inCurrent;
	};

	$: {
		updateDocsLocale($locale);
	}
</script>

<DocsLayout>
	{#if !availableInCurrentLocale}
		<Error>{$t("errors.language_not_available")}</Error>
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

		{#if metadata.aria || metadata.github || metadata.repl}
			<div class="mt-10 flex children:not-last:mr-4">
				{#if metadata.aria}
					<LogoLinkButton icon="w3c" text={$t("common.view_aria_spec")} subtext="W3C" href={metadata.aria} />
				{/if}
				{#if metadata.github}
					<LogoLinkButton icon="github" text={$t("common.view_source")} subtext="GitHub" href={metadata.github} />
				{/if}
				{#if metadata.repl}
					<LogoLinkButton icon="svelte" text="Svelte REPL" subtext="svelte.dev" href={metadata.repl} />
				{/if}
			</div>
		{/if}

		<div class="md">
			<svelte:component this={body} />
		</div>
	</div>
</DocsLayout>

<style lang="scss" global>
	.md {
		@apply my-16 text-grey;

		> h2,
		> h3,
		> h4,
		> h5,
		> h6 {
			@apply font-heading font-bold text-blue-900 not-first:mt-10;
			letter-spacing: -0.03em;
		}

		> p {
			@apply mt-5;
		}

		> h2 {
			@apply text-4xl;
		}

		> h3 {
			@apply text-3xl;
		}

		> h4 {
			@apply text-2xl;
		}

		> h5 {
			@apply text-xl;
		}

		> pre > code[class^="language"] {
			@apply my-10 rounded-xl;
		}

		> blockquote {
			@apply my-5 border-l-4 border-grey-300 mx-0 p-2 pl-4 italic;
		}

		a {
			@apply text-red font-bold underline hover:text-blue-900;
		}

		table {
			margin: 2rem 0;
			width: 100%;
			border: 2px solid #e9e9e9;
			border-collapse: separate;
			border-left: 0;
			border-radius: 0.5rem;
			border-spacing: 0px;
		}
		thead {
			display: table-header-group;
			vertical-align: middle;
			border-color: inherit;
			border-collapse: separate;
			@apply text-blue-900;
		}
		tr {
			display: table-row;
			vertical-align: inherit;
			border-color: inherit;
		}
		th,
		td {
			padding: 10px 20px;
			text-align: left;
			vertical-align: top;
			border-left: 2px solid #e9e9e9;
		}
		td {
			border-top: 2px solid #e9e9e9;
		}
		thead:first-child tr:first-child th:first-child,
		tbody:first-child tr:first-child td:first-child {
			border-radius: 0.5rem 0 0 0;
		}
		thead:last-child tr:last-child th:first-child,
		tbody:last-child tr:last-child td:first-child {
			border-radius: 0 0 0 0.5rem;
		}
	}
</style>
