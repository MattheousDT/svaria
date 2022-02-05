<script lang="ts">
	import { page, url } from "$app/stores";
	import { locale, t } from "svelte-intl-precompile";
	import ParallaxButton from "./parallax_button.svelte";
	import IconArrow from "~icons/la/arrow-right";

	$: topItems = [
		{
			text: $t("section.getting_started"),
			// icon: Animation,
			link: "/docs/getting-started",
			color: "teal",
		},
		{
			text: $t("section.what_is_a11y"),
			// icon: Accessibility,
			link: "/docs/what-is-a11y",
			color: "pink",
		},
		{
			text: $t("section.release_notes"),
			// icon: Book,
			link: "/docs/release-notes",
			color: "yellow",
		},
	];

	$: bottomItems = {
		[$t("common.actions")]: {
			"use:arrowkeys": "/docs/actions/arrowkeys",
			"use:contextual": "/docs/actions/contextual",
			"use:clickOutside": "/docs/actions/clickOutside",
			"use:longpress": "/docs/actions/longpress",
			"use:shortcut": "/docs/actions/shortcut",
			"use:table": "/docs/actions/table",
		},
		[$t("common.components")]: {
			[$t("components.accordion")]: "/docs/components/accordion",
			[$t("components.alert")]: "/docs/components/alert",
			[$t("components.announcer")]: "/docs/components/announcer",
			[$t("components.autocomplete")]: "/docs/components/autocomplete",
			[$t("components.breadcrumbs")]: "/docs/components/breadcrumbs",
			[$t("components.button")]: "/docs/components/button",
			[$t("components.carousel")]: "/docs/components/carousel",
			[$t("components.checkbox")]: "/docs/components/checkbox",
			[$t("components.dialog")]: "/docs/components/dialog",
			[$t("components.disclosure")]: "/docs/components/disclosure",
			[$t("components.dropdown")]: "/docs/components/dropdown",
			[$t("components.dropdown_menu")]: "/docs/components/dropdown-menu",
			[$t("components.feed")]: "/docs/components/feed",
			[$t("components.link")]: "/docs/components/link",
			[$t("components.listbox")]: "/docs/components/listbox",
			[$t("components.menubar")]: "/docs/components/menubar",
			[$t("components.radio_group")]: "/docs/components/radio-group",
			[$t("components.slider")]: "/docs/components/slider",
			[$t("components.spin_button")]: "/docs/components/spin_button",
			[$t("components.tabs")]: "/docs/components/tabs",
			[$t("components.tooltip")]: "/docs/components/tooltip",
			[$t("components.treegrid")]: "/docs/components/treegrid",
			[$t("components.window_splitter")]: "/docs/components/window-splitter",
		},
		[$t("common.stores")]: {
			$announcer: "/docs/stores/announcer",
			$shortcuts: "/docs/stores/shortcuts",
			$usingKeyboard: "/docs/stores/usingKeyboard",
		},
	};
</script>

<aside class="hidden lg:block w-full max-w-[300px] px-5 lg:px-8 bg-700">
	{#each Object.entries(bottomItems) as [section, items]}
		<section>
			<h4 id={section} class="text__h6">{section}</h4>
			<ul aria-labelledby={section}>
				{#each Object.entries(items).sort((a, b) => a[0].localeCompare(b[0], $locale)) as [item, link]}
					<li>
						<a class="menu-item" class:menu-item--active={$page.url.pathname === link} href={link}>
							{item}
							{#if $page.url.pathname === link}
								<IconArrow />
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</aside>

<style lang="scss">
	@import "variables";

	aside {
		position: sticky;
		height: calc(100vh - 5rem);
		top: 5rem;
		border-right: 2px solid $navy;
		padding: 0 1rem;
		overflow-y: hidden;
		width: 100%;
		max-width: 18.75rem;
	}

	section {
		margin: 3.75rem 0;
	}

	ul {
		list-style-type: none;
	}

	h4 {
		padding: 0.5rem 1rem;
	}

	.menu-item {
		position: relative;
		padding: 0.5rem 1rem;
		font-weight: 500;
		color: $navy-light;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid transparent;
		background: transparent;
		text-decoration: none;
		transition: transform 150ms cubic-bezier(0, 0, 0.27, 2.54), background 150ms ease;

		&:hover {
			background: darken($sand, 5);
		}

		&:active {
			transform: scale(0.95);
		}

		&--active {
			border-color: $navy;
			color: $navy;

			&:hover {
				background: transparent;
			}

			&::after {
				content: "";
				z-index: -1;
				position: absolute;
				pointer-events: none;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				transform: translate(0.25rem, 0.25rem);
				background-color: $rose;
				transition: transform 150ms cubic-bezier(0, 0, 0.27, 2.54);
			}
		}
	}
</style>
