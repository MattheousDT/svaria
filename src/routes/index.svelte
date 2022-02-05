<script>
	import ParallaxButton from "$site/components/parallax_button.svelte";
	import { LINKS } from "$site/util/constants";
	import { t } from "svelte-intl-precompile";
	import IconArrowRight from "~icons/la/arrow-right";
	import IconBook from "~icons/la/book";

	$: headerImages = [
		{ title: $t("components.accordion"), href: "/docs/components/accordion", image: "accordion" },
		{ title: $t("components.carousel"), href: "/docs/components/carousel", image: "carousel" },
		{ title: $t("components.modal"), href: "/docs/components/modal", image: "modal" },
		{ title: $t("components.radio_checkbox"), href: "/docs/components/radio-checkbox", image: "radio-buttons" },
		{ title: $t("components.window_splitter"), href: "/docs/components/window", image: "window-splitter" },
		{ title: $t("components.accordion"), href: "/docs/components/accordion", image: "accordion" },
		{ title: $t("components.carousel"), href: "/docs/components/carousel", image: "carousel" },
		{ title: $t("components.modal"), href: "/docs/components/modal", image: "modal" },
		{ title: $t("components.radio_checkbox"), href: "/docs/components/radio-checkbox", image: "radio-buttons" },
		{ title: $t("components.window_splitter"), href: "/docs/components/window", image: "window-splitter" },
		{ title: $t("components.accordion"), href: "/docs/components/accordion", image: "accordion" },
		{ title: $t("components.carousel"), href: "/docs/components/carousel", image: "carousel" },
		{ title: $t("components.modal"), href: "/docs/components/modal", image: "modal" },
		{ title: $t("components.radio_checkbox"), href: "/docs/components/radio-checkbox", image: "radio-buttons" },
		{ title: $t("components.window_splitter"), href: "/docs/components/window", image: "window-splitter" },
		{ title: $t("components.accordion"), href: "/docs/components/accordion", image: "accordion" },
		{ title: $t("components.carousel"), href: "/docs/components/carousel", image: "carousel" },
		{ title: $t("components.modal"), href: "/docs/components/modal", image: "modal" },
	];
</script>

<header>
	<div class="container">
		<h1>{$t("home.heading")}</h1>
		<p class="text__h4">
			{$t("home.caption")}
		</p>
		<div class="buttons">
			<ParallaxButton href={LINKS.documentation} color="lavendar">
				<IconBook />
				{$t("common.documentation")}
			</ParallaxButton>
			<ParallaxButton href={LINKS.getStarted} iconPosition="right" color="rose">
				{$t("common.get_started")}
				<IconArrowRight />
			</ParallaxButton>
		</div>
	</div>
	<div class="decoration-grid">
		{#each headerImages as { title, href, image }}
			<a {href}>
				<img src="/img/header/{image}.svg" alt="" />
				<p>{title}</p>
			</a>
		{/each}
	</div>
</header>

<style lang="scss">
	@import "variables";

	$header-height: 44rem;

	header {
		display: flex;
		align-items: center;
		height: $header-height;
		position: relative;
		overflow: hidden;
		border-bottom: 2px solid $navy;

		h1 {
			max-width: 48.5rem;
		}

		p {
			max-width: 37.5rem;
		}

		.buttons {
			display: flex;
			margin-top: 3.25rem;
			& > :global(*):not(:last-child) {
				margin-right: 1.5rem;
			}
		}

		.decoration-grid {
			position: absolute;
			top: 0;
			left: calc(50% + 1920px / 2);
			transform: translateX(-50%);
			display: grid;
			height: 100%;
			width: $header-height * 2;
			grid-template-rows: repeat(3, minmax(0, 1fr));
			grid-auto-flow: column;
			gap: 2px;

			p {
				margin: 0;
			}

			> a {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 1.5rem;
				box-shadow: 0 0 0 2px $navy;
				border-collapse: collapse;
				height: 100%;
				transition: background-color 150ms ease;

				&:hover,
				&:focus {
					background-color: darken($sand, 5);
					outline: none;

					p {
						opacity: 1;
						transform: translateY(0);
						transition: transform 150ms cubic-bezier(0, 0, 0.27, 2.54), opacity 150ms ease;
					}
				}

				p {
					position: absolute;
					color: $navy;
					font-family: $sans-primary;
					font-weight: 500;
					bottom: 0.5rem;
					opacity: 0;
					width: 100%;
					text-align: center;
					transform: translateY(0.5rem);
					transition: transform 150ms ease, opacity 150ms ease;
				}

				img {
					user-select: none;
					-webkit-user-drag: none;
				}
			}
		}
	}
</style>
