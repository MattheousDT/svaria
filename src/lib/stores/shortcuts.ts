import type { IShortcut, IShortcutStore } from "$lib/@types/shortcuts";
import { writable } from "svelte/store";

const createShortcuts = () => {
	const { subscribe, set, update } = writable<IShortcutStore>({
		global: [],
		contextual: [],
	});

	return {
		global: {
			add: (id: string, shortcuts: IShortcut[]) =>
				update((x) => ({
					...x,
					global: [...x.global, ...shortcuts.map((y) => ({ ...y, origin: id }))],
				})),
			remove: (origin: string) =>
				update((x) => ({
					...x,
					global: x.global.filter((y) => y.origin !== origin),
				})),
			removeAll: () => update((x) => ({ ...x, global: [] })),
		},
		contextual: {
			add: (id: string, shortcuts: IShortcut[]) =>
				update((x) => ({
					...x,
					contextual: [...x.contextual, ...shortcuts.map((y) => ({ ...y, origin: id }))],
				})),
			remove: (origin: string) =>
				update((x) => ({
					...x,
					contextual: x.contextual.filter((y) => y.origin !== origin),
				})),
			removeAll: () => update((x) => ({ ...x, contextual: [] })),
		},
		subscribe,
		removeAll: () => set({ global: [], contextual: [] }),
	};
};

/** All shortcuts currently available to the context */
const shortcuts = createShortcuts();

export default shortcuts;
