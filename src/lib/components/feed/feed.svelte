<script lang="ts">
	/** An element ID selector that points to a piece of text which gives an appropriate label to the feed */
	export let feedLabelId: string;
	/** Set to true if new elements are about to be loaded */
	export let isLoading: boolean;
</script>

<div {...$$restProps} role="feed" aria-busy={isLoading} aria-labelledby={feedLabelId}>
	<slot />
</div>
