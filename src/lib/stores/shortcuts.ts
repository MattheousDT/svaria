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

export const shortcutStore = writable<IShortcutStore>({
	global: [],
	contextual: [],
});
