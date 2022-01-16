<script lang="ts">
	import { shortcutStore } from "$lib/stores";
	import type { IShortcutStoreItem } from "$lib/stores/shortcuts";
	import { fly } from "svelte/transition";
	import { backOut } from "svelte/easing";

	let formatKey = (key: string) => {
		switch (key) {
			case "ArrowUp":
				return "🡹";
			case "ArrowDown":
				return "🡻";
			case "ArrowLeft":
				return "🡸";
			case "ArrowRight":
				return "🡺";
			case " ":
				return "Space";
			default:
				return key;
		}
	};

	let formatShortcut = (shortcut: IShortcutStoreItem) => {
		const modifiers = {
			CTRL: shortcut.ctrlKey,
			ALT: shortcut.altKey,
			SHIFT: shortcut.shiftKey,
			META: shortcut.metaKey,
		};

		return [
			...Object.entries(modifiers)
				.filter((x) => x[1])
				.map((x) => x[0]),
			formatKey(typeof shortcut.key === "string" ? shortcut.key : shortcut.key[0]),
		].join(" + ");
	};

	$: shortcuts = Object.values($shortcutStore.contextual).flat();
</script>

{#if shortcuts.length > 0}
	<div transition:fly={{ y: 10, easing: backOut }} class="modal__wrapper">
		<div class="modal__contents">
			<div class="container">
				<h2>Keyboard Shortcuts</h2>
				<hr />
				<div class="shortcuts__grid">
					{#each shortcuts as shortcut}
						<div>
							<kbd>{formatShortcut(shortcut)}</kbd>
							<h3 class="text__h4">
								{shortcut.name}
							</h3>
							{#if shortcut.description}
								<p>{shortcut.description}</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import "variables";

	.modal {
		&__wrapper {
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 1rem;
			max-height: 100vh;
			width: 100%;
		}

		&__contents {
			background: darken($sand, 5);
			padding: 2rem 0;
		}
	}

	hr {
		border: none;
		border-top: 2px solid $navy;
		margin: 1.5rem 0;
	}

	kbd {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		line-height: 1.2;
		background: white;
		border: grey 1px solid;
		border-bottom-width: 2px;
		border-radius: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.shortcuts {
		&__grid {
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 2rem;
		}
	}
</style>
