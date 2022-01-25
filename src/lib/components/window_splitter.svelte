<script lang="ts">
	import type { IShortcut } from "$lib/@types/shortcuts";
	import contextual from "$lib/actions/contextual";
	import { createEventDispatcher } from "svelte";

	export let primaryPaneId: string;
	export let label: string = null;
	export let labelId: string = null;
	export let direction: "horizontal" | "vertical" = "vertical";
	export let value: number;
	export let minValue: number = 0;
	export let maxValue: number = 100;
	export let containerEl: HTMLElement;

	let splitterEl: HTMLSpanElement;
	let dispatch = createEventDispatcher();

	$: if (!label && !labelId)
		throw Error("A label or label element id reference must be passed to the WindowSplitter component");

	$: if (value > maxValue) value = maxValue;
	$: if (value < minValue) value = minValue;

	function handleMousemove(e: MouseEvent) {
		if (!(e.buttons & 1)) return; // mouse not down

		const { left, top, width, height } = containerEl.getBoundingClientRect();

		if (direction === "vertical") {
			const percent = ((e.clientX - splitterEl.getBoundingClientRect().width / 2 - left) / width) * 100;
			value = Math.min(Math.max(percent, minValue), maxValue);
		} else {
			const percent = ((e.clientY - splitterEl.getBoundingClientRect().height / 2 - top) / height) * 100;
			value = Math.min(Math.max(percent, minValue), maxValue);
		}
	}

	function handleMousedown(e: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement }) {
		e.preventDefault();
		e.currentTarget.focus();

		function handleMouseup() {
			document.removeEventListener("mouseup", handleMouseup);
			document.removeEventListener("mousemove", handleMousemove);
		}

		document.addEventListener("mouseup", handleMouseup);
		document.addEventListener("mousemove", handleMousemove);
	}

	let shortcuts: IShortcut[] = [
		...(direction === "vertical"
			? [
					{
						name: "Move left",
						description: "Moves the vertical splitter to the left.",
						key: "ArrowLeft",
						callback: () => {
							if (value > minValue) value--;
							dispatch("move_left");
						},
					},
					{
						name: "Move right",
						description: "Moves the vertical splitter to the right.",
						key: "ArrowRight",
						callback: () => {
							if (value < maxValue) value++;
							dispatch("move_right");
						},
					},
			  ]
			: [
					{
						name: "Move up",
						description: "Moves the horizontal splitter up.",
						key: "ArrowUp",
						callback: () => {
							if (value > minValue) value--;
							dispatch("move_up");
						},
					},
					{
						name: "Move down",
						description: "Moves the horizontal splitter down.",
						key: "ArrowDown",
						callback: () => {
							if (value < maxValue) value++;
							dispatch("move_down");
						},
					},
			  ]),
		{
			name: "Minimize primary window",
			description: "Moves splitter to the position that gives the primary pane its smallest allowed size.",
			key: "Home",
			callback: () => {
				value = minValue;
				dispatch("minimize");
			},
		},
		{
			name: "Maximize primary window",
			description: "Moves splitter to the position that gives the primary pane its largest allowed size.",
			key: "End",
			callback: () => {
				value = maxValue;
				dispatch("maximize");
			},
		},
		// ...(panes.length > 0
		// 	? [
		// 			{
		// 				name: "Cycle panes",
		// 				description: "Cycle through window panes",
		// 				key: "F6",
		// 				callback: () => {
		// 					let indexToFocus: number;

		// 					for (let i = 0; i < panes.length; i++) {
		// 						if (document.activeElement === panes[i]) {
		// 							indexToFocus = i + 1;
		// 							break;
		// 						}
		// 					}

		// 					panes[!indexToFocus || indexToFocus > panes.length - 1 ? 0 : indexToFocus].focus();

		// 					dispatch("cycle_panes");
		// 				},
		// 			},
		// 	  ]
		// 	: []),
	];
</script>

<span
	{...$$restProps}
	use:contextual={{ id: primaryPaneId, shortcuts }}
	bind:this={splitterEl}
	on:mousedown={handleMousedown}
	class={["svaria__window-splitter", $$props.class].filter((x) => !!x).join(" ")}
	role="separator"
	aria-controls={primaryPaneId}
	aria-label={label}
	aria-labelledby={labelId}
	aria-valuenow={value}
	aria-valuemin={minValue}
	aria-valuemax={maxValue}
	tabindex={0}
>
	<slot />
</span>
