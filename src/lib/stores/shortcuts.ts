import { writable } from "svelte/store";

export interface IShortcut {
	key: string | string[];
	ctrlKey?: boolean;
	altKey?: boolean;
	metaKey?: boolean;
	shiftKey?: boolean;
	name?: string;
	description?: string;
	callback: (
		e: KeyboardEvent & {
			target: EventTarget & HTMLElement;
		}
	) => void;
}

export interface IShortcutStoreItem extends IShortcut {
	origin: string;
}

export interface IShortcutStore {
	global: IShortcutStoreItem[];
	contextual: IShortcutStoreItem[];
}

const createShortcuts = () => {
	const { subscribe, set, update } = writable<IShortcutStore>({
		global: [],
		contextual: [],
	});

	return {
		global: {
			add: (shortcuts: IShortcutStoreItem[]) =>
				update((x) => ({
					...x,
					global: [...x.global, ...shortcuts],
				})),
			remove: (origin: string) =>
				update((x) => ({
					...x,
					global: x.global.filter((y) => y.origin !== origin),
				})),
			removeAll: () => update((x) => ({ ...x, global: [] })),
		},
		contextual: {
			add: (shortcuts: IShortcutStoreItem[]) =>
				update((x) => ({
					...x,
					global: [...x.global, ...shortcuts],
				})),
			remove: (origin: string) =>
				update((x) => ({
					...x,
					global: x.global.filter((y) => y.origin !== origin),
				})),
			removeAll: () => update((x) => ({ ...x, contextual: [] })),
		},
		subscribe,
		removeAll: () => set({ global: [], contextual: [] }),
	};
};

/** All shortcuts currently available to the context */
export const shortcuts = createShortcuts();
