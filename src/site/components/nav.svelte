<script lang="ts">
	import { LANG_MAP, LINKS } from "$site/util/constants";
	import clsx from "clsx";
	import { clickoutside, Menubar, MenuItem } from "svaria";
	import { locale, locales, t } from "svelte-intl-precompile";
	import { quadOut } from "svelte/easing";
	import { crossfade, fly } from "svelte/transition";
	import IconLanguage from "~icons/uil/language";
	import Button from "./button.svelte";

	export let height = 84;

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 500),
		easing: quadOut,
	});

	let y: number;

	let showLanguages = false;
</script>

<svelte:window bind:scrollY={y} />

<nav class="fixed bg-grey-100 w-full transition-shadow z-50" class:shadow-card={y > 10} style:height="{height / 16}rem">
	<div class="container flex justify-between items-center h-full">
		<a title="Homepage" href="/">
			<h1 class="underline-beneath font-heading text-4xl">svaria</h1>
		</a>

		<Menubar id="main-nav" label="Main Navigation" class="flex items-center">
			<MenuItem class="relative" first let:props>
				<Button
					{...props}
					aria-label={$t("nav.language_picker")}
					on:click={() => (showLanguages = true)}
					disabled={showLanguages}
					class="mr-4"
					theme="tertiary"
					iconPosition="left"
					size="md"
					let:iconClass
				>
					<IconLanguage class={iconClass} />
					{LANG_MAP[$locale]}
				</Button>
				{#if showLanguages}
					<ul
						use:clickoutside={() => (showLanguages = false)}
						class="absolute z-10 shadow-card py-4 px-1 rounded-lg min-w-44 -bottom-2 right-5 transform translate-y-full bg-white"
						transition:fly={{ y: -10, duration: 250 }}
					>
						{#each $locales as l}
							{@const selected = $locale === l}
							<li class="relative">
								{#if selected}
									<span
										class="absolute -left-1 top-0 h-full w-1 bg-red"
										in:receive={{ key: "lang-line" }}
										out:send={{ key: "lang-line" }}
									/>
								{/if}
								<Button
									class={clsx("w-full text-left", selected && "text-red")}
									theme="tertiary"
									size="sm"
									on:click={() => locale.set(l)}>{LANG_MAP[l]}</Button
								>
							</li>
						{/each}
					</ul>
				{/if}
			</MenuItem>
			<MenuItem let:props>
				<Button {...props} size="md" href={LINKS.documentation}>{$t("common.documentation")}</Button>
			</MenuItem>
		</Menubar>
	</div>
</nav>
