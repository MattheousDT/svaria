// This file is really bad and shouldn't need to exist because setting global types for
// things that can only exist if the action is present, is really, really bad.

// See:
// https://github.com/sveltejs/language-tools/issues/431
// https://github.com/sveltejs/language-tools/issues/1243

declare type SvariaActionEvent<T extends EventTarget, R extends any> = (
	event: CustomEvent<R> & { target: EventTarget & T }
) => any;

declare namespace svelte.JSX {
	interface DOMAttributes<T> {
		/** Event fired from `use:clickoutside` action */
		onclickoutside?: SvariaActionEvent<T, HTMLElement>;
		/** Event fired from `use:keycombo` action */
		onkeycombo?: SvariaActionEvent<T, null>;
	}
}
