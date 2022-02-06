import { defineConfig } from "windicss/helpers";

export default defineConfig({
	theme: {
		colors: {
			orange: {
				DEFAULT: "#EF8C63",
				500: "#EF8C63",
				400: "#F2B195",
				300: "#F8D4C5",
				200: "#F8D4C5",
				100: "#FBF0EC",
			},
			red: {
				DEFAULT: "#CF445D",
				500: "#CF445D",
				400: "#F4879B",
				300: "#FBCED6",
				200: "#FFDCE2",
				100: "#FCEEF1",
			},
			blue: {
				DEFAULT: "#45A1E4",
				900: "#1D354F",
			},
			green: {
				DEFAULT: "#85C27B",
			},
			purple: {
				DEFAULT: "#9445E4",
			},
			turquoise: {
				DEFAULT: "#48D0AF",
			},
			grey: {
				DEFAULT: "#5C6A78",
				300: "#E9E9E9",
				200: "#F6F6F6",
				100: "#FCFCFC",
			},
			white: "#fff",
			transparent: "#00000000",
		},
		container: {
			padding: "1.25rem",
			center: true,
		},
		fontFamily: {
			sans: ["Lato", "Arial", "sans"],
			heading: ["Space Grotesk", "Arial", "sans"],
			mono: ["Fira Code", "Consolas", "monospace"],
		},
		backgroundImage: {
			gradient: "linear-gradient(180deg, #FBCED6 0%, #F8D4C5 100%)",
		},
		boxShadow: {
			card: "0px 8px 30px -6px rgba(29, 53, 79, 0.2)",
		},
	},
	plugins: [require("windicss/plugin/aspect-ratio")],
});
