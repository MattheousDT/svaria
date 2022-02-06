<script lang="ts">
	import clsx from "clsx";

	import IconError from "~icons/uil/exclamation-circle";
</script>

<div class={clsx("flex items-center py-3 px-4 font-medium  text-red bg-red-100 rounded-lg mb-8 not-first:mt-8")}>
	<IconError class="mr-2" />
	<slot />
</div>
