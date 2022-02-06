<script lang="ts">
	import { page } from "$app/stores";
	import clsx from "clsx";
	import { locale, t } from "svelte-intl-precompile";
	import { quadOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import IconKeyboard from "~icons/uil/keyboard";
	import IconALS from "~icons/uil/assistive-listening-systems";
	import IconWheelchair from "~icons/uil/accessible-icon-alt";
	import IconList from "~icons/uil/list-ui-alt";
	import IconBooks from "~icons/uil/books";
	import Button from "./button.svelte";
	import SidebarTopLink from "./sidebar/sidebar_top_link.svelte";

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 500),
		easing: quadOut,
	});

	$: topItems = [
		{
			text: $t("section.getting_started"),
			icon: IconKeyboard,
			link: "/docs/getting-started",
			color: "red",
		},
		{
			text: $t("section.what_is_a11y"),
			icon: IconWheelchair,
			link: "/docs/what-is-a11y",
			color: "orange",
		},
		{
			text: $t("section.release_notes"),
			icon: IconBooks,
			link: "/docs/release-notes",
			color: "purple",
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

<aside
	class="hidden lg:block sticky top-[5.25rem] h-[calc(100vh-5.25rem)] w-full max-w-[300px] px-4 overflow-y-auto shadow-card"
>
	<ul class="my-8">
		{#each topItems as item}
			<li class="relative">
				<SidebarTopLink {...item} />
			</li>
		{/each}
	</ul>

	<span class="block h-0.5 rounded bg-grey-300 mx-4" />

	{#each Object.entries(bottomItems) as [section, items]}
		<div class="my-8">
			<h4 id={section} class="uppercase font-bold text-sm px-4 mb-4 text-blue-900">{section}</h4>
			<ul aria-labelledby={section}>
				{#each Object.entries(items).sort((a, b) => a[0].localeCompare(b[0], $locale)) as [item, link]}
					{@const selected = $page.url.pathname === link}

					<li class="relative">
						{#if selected}
							<span class="absolute -left-4 top-0 h-full w-1 bg-red" />
						{/if}
						<Button href={link} class={clsx("w-full text-left", selected && "text-red")} theme="tertiary" size="md">
							{item}
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</aside>
