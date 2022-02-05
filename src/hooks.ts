import { dev } from "$app/env";
import { LANGS } from "$site/util/constants";
import type { GetSession } from "@sveltejs/kit";

export const getSession: GetSession = ({ url }) => {
	let i18n = "en";

	if (dev) {
		const paramLang = url.searchParams.get("lang");
		if (paramLang && LANGS.find((x) => x === paramLang)) i18n = paramLang;
	} else {
		const hostLang = LANGS.slice(1).find((x) => url.hostname.slice(0, 2) === x);
		if (hostLang) i18n = hostLang;
	}

	return {
		locale: i18n,
	};
};
