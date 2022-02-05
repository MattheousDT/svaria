<script lang="ts">
	import IconError from "~icons/la/exclamation-circle";
</script>

<div class="offset {$$props.class}">
	<IconError />
	<slot />
</div>

<style lang="scss">
	@import "variables";

	div {
		display: flex;
		align-items: center;
		padding: 0.875rem 2rem;
		font-family: $sans-primary;
		font-weight: 500;
		font-size: 1.25rem;
		background: transparent;
		color: #a71515;
		margin: 2rem 0;

		:global(svg) {
			margin-right: 0.5rem;
		}

		&::before {
			background: #fccdcd;
		}

		&::after {
			content: "";
			position: absolute;
			pointer-events: none;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			border: 2px solid $navy;
		}
	}
</style>
