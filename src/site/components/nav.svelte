<script lang="ts">
	import { Menubar, MenuItem } from "svaria";
	import { LANG_MAP, LINKS } from "$site/util/constants";
	import Button from "./button.svelte";
	import { locale, locales, t } from "svelte-intl-precompile";
	import IconLanguage from "~icons/la/language";
	import IconAngleDown from "~icons/la/angle-down";

	export let height = "5rem";

	let showLanguages = false;
</script>

<nav style:height>
	<div class="nav-container">
		<a title="Homepage" href="/">
			<h1>svaria</h1>
		</a>

		<Menubar id="main-nav" label="Main Navigation">
			<MenuItem first let:props>
				<Button
					{...props}
					aria-label={$t("nav.language_picker")}
					on:click={() => (showLanguages = !showLanguages)}
					theme="secondary"
					iconPosition="both"
					size="md"
				>
					<IconLanguage />
					{LANG_MAP[$locale]}
					<IconAngleDown />
				</Button>
				{#if showLanguages}
					<ul class="languages">
						{#each $locales as l}
							<li>
								<button on:click={() => locale.set(l)}>{LANG_MAP[l]}</button>
							</li>
						{/each}
					</ul>
				{/if}
			</MenuItem>
			<MenuItem let:props>
				<Button {...props} href={LINKS.documentation} size="md">{$t("common.documentation")}</Button>
			</MenuItem>
		</Menubar>
	</div>
</nav>

<style lang="scss">
	@import "variables";

	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		border-bottom: 2px solid $navy;
		background-color: $sand;
		z-index: 100;
	}

	h1 {
		margin: 0 !important;
		font-size: 3rem;
	}

	a {
		text-decoration: none;
	}

	.languages {
		position: absolute;
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		max-width: 1920px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	:global(.svaria__menubar) {
		display: flex;
		align-items: center;
		height: 100%;
	}

	:global(.svaria__menuitem) {
		&:not(:last-child) {
			margin-right: 1rem;
		}
	}
</style>
