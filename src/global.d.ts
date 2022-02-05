/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="unplugin-icons/types/svelte" />

type SvariaSession = {
	locale: string;
};

declare module "$app/stores" {
	const session: MySessionType;
	export = session;
}
