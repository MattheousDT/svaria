<script lang="ts">
	import { IShortcutStoreItem, shortcuts } from "$lib/stores/shortcuts";
	import { shortcutsVisibility } from "$site/stores/prefs";
	import { backOut } from "svelte/easing";
	import { fly } from "svelte/transition";

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

	$: allShortcuts = Object.values($shortcuts).flat();
</script>

{#if $shortcutsVisibility}
	<div transition:fly={{ x: 40, easing: backOut }} class="modal__wrapper">
		<div class="modal__contents">
			<div class="container">
				<h2 class="text__h3">Keyboard Shortcuts</h2>
				<hr />
				<div class="shortcuts__list">
					{#each allShortcuts as s}
						<div>
							<h3 class="text__h5">
								<kbd>{formatShortcut(s)}</kbd>
								{s.name}
							</h3>
							{#if s.description}
								<p>{s.description}</p>
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
			right: 0;
			padding: 1rem;
			max-height: 100vh;
			overflow: auto;
			width: 100%;
			max-width: 400px;
			z-index: 150;
		}

		&__contents {
			background: darken($sand, 5);
			padding: 2rem 0;
			overflow: auto;
		}
	}

	hr {
		border: none;
		border-top: 2px solid $navy;
		margin: 1.5rem 0;
	}

	h3 {
		display: flex;
		align-items: center;
		&:not(:last-child) {
			margin-bottom: 0.5rem;
		}
	}

	kbd {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		font-size: 0.6em;
		line-height: 1.2;
		background: white;
		border: grey 1px solid;
		border-bottom-width: 2px;
		border-radius: 0.25rem;
		margin-right: 0.5rem;
	}

	.shortcuts {
		&__list {
			display: flex;
			flex-direction: column;

			> :not(:last-child) {
				padding-bottom: 1rem;
				margin-bottom: 1rem;
				border-bottom: 1px solid $navy;
			}
		}
	}
</style>
