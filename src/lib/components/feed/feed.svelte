<script lang="ts">
	export let feedLabelId: string;
	export let isLoading: boolean;
</script>

<div {...$$restProps} role="feed" aria-busy={isLoading} aria-labelledby={feedLabelId}>
	<slot />
</div>
