<script>
	import Button from "$site/components/button.svelte";
	import { LINKS } from "$site/util/constants";
	import { t } from "svelte-intl-precompile";
	import IconArrow from "~icons/uil/arrow-up-right";

	import IconKeyboard from "~icons/uil/keyboard";
	import IconALS from "~icons/uil/assistive-listening-systems";
	import IconWheelchair from "~icons/uil/accessible-icon-alt";
	import IconList from "~icons/uil/list-ui-alt";
	import IconMouse from "~icons/uil/mouse";
</script>

<header class="overflow-hidden my-18">
	<div class="container">
		<div class="max-w-screen-[1120px] mx-auto grid grid-cols-6 lg:grid-cols-12 gap-8 items-center">
			<!-- Main Column -->
			<div class="col-span-6">
				<h1 class="text-6xl font-heading font-bold text-blue-900 leading-[1.15]">
					{@html $t("home.heading").replace(/(<0>)(.*?)(<\/0>)/g, '<span class="underline-beneath">$2</span>')}
				</h1>
				<p class="text-lg font-medium text-grey my-8 w-full max-w-md">
					{$t("home.caption")}
				</p>
				<Button href={LINKS.getStarted} iconPosition="right" size="lg" let:iconClass>
					{$t("common.get_started")}
					<IconArrow class={iconClass} />
				</Button>
			</div>

			<!-- Image Column -->
			<div class="col-span-6 flex items-center">
				<div class="grid grid-cols-2 gap-8 w-full h-2xl relative">
					<!-- Top left -->
					<div class="flex relative z-1">
						<div class="rounded-3xl bg-gradient absolute w-full h-[calc(100%-2rem)] -left-5 top-4 -z-1" />
						<div class="rounded-3xl bg-grey-300 w-full h-full" />
					</div>
					<!-- Top right -->
					<div class="flex items-end">
						<div
							class="rounded-3xl bg-red-300 w-2/3 aspect-square flex flex-col items-center justify-center text-blue-900 text-center"
						>
							<h2 class="text-5xl font-heading">24</h2>
							<p class="font-medium">{$t("common.components")}</p>
						</div>
					</div>
					<!-- Bottom left -->
					<div class="flex items-start justify-end">
						<div
							class="rounded-3xl bg-orange-300 w-2/3 aspect-square flex flex-col items-center justify-center text-blue-900 text-center"
						>
							<h2 class="text-5xl font-heading">3kB</h2>
							<p class="font-medium">{$t("common.average_size")}</p>
						</div>
					</div>
					<!-- Bottom right -->
					<div class="flex">
						<div class="rounded-3xl bg-grey-300 w-full h-full" />
					</div>

					<!-- Background Elements -->
					<span
						class="absolute flex items-center justify-center rounded-xl w-10 h-10 text-white bg-green -left-8 bottom-1/4 transform -translate-x-full"
					>
						<IconKeyboard width="1.625rem" height="1.625rem" />
					</span>
					<span
						class="absolute flex items-center justify-center rounded-xl w-10 h-10 text-white bg-blue left-1/4 bottom-8"
					>
						<IconALS width="1.625rem" height="1.625rem" />
					</span>
					<span
						class="absolute flex items-center justify-center rounded-xl w-10 h-10 text-white bg-orange right-1/4 top-8"
					>
						<IconList width="1.625rem" height="1.625rem" />
					</span>
					<span
						class="absolute flex items-center justify-center rounded-xl w-10 h-10 text-white bg-purple -right-20 top-2/6"
					>
						<IconMouse width="1.625rem" height="1.625rem" />
					</span>
					<span
						class="absolute flex items-center justify-center rounded-xl w-16 h-16 text-white bg-red right-0 bottom-2/7 transform translate-x-1/2"
					>
						<IconWheelchair width="2.5rem" height="2.5rem" />
					</span>
				</div>
			</div>
		</div>
	</div>
</header>
