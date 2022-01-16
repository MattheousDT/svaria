<script lang="ts">
	import contextual from "$lib/actions/contextual";
	import type { IShortcut } from "$lib/stores/shortcuts";

	let props = {
		role: "menuitem",
		tabindex: 0,
	};
</script>

<li role="none" class="svaria__menuitem" {...$$restProps}>
	<slot {props} />
</li>
