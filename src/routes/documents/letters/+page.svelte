<script>
	let scrollY;
</script>

<svelte:window bind:scrollY />
<div class="fixed">
	<input type="number" bind:value={scrollY} />
</div>
<div class="for-scroll"></div>

<style>
	.fixed {
		position: fixed;
		top: 100px;
		right: 50px;
	}
	.for-scroll {
		height: 2000px;
	}
</style>
