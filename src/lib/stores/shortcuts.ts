import { writable } from "svelte/store";

export interface IShortcut {
	key: string | string[];
	ctrlKey?: boolean;
	altKey?: boolean;
	metaKey?: boolean;
	shiftKey?: boolean;
	name?: string;
	description?: string;
	callback: (e: KeyboardEvent) => void;
}

export interface IShortcutStore {
	global: IShortcut[];
	contextual: ({ contextId: string } & IShortcut)[];
}

export const shortcutStore = writable<IShortcutStore>({
	global: [],
	contextual: [],
});
