<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import { onMount, tick } from 'svelte';

	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let initialValue = 0;
	export let id = null;
	export let value = typeof initialValue === 'string' ? parseInt(initialValue) : initialValue;

	let initialized = false;
	let container = null;
	let thumb = null;
	let progressBar = null;
	let element = null;

	let elementX = null;
	let currentThumb = null;
	let holding = false;
	let keydownAcceleration = 0;
	let accelerationTimer = null;

	const dispatch = createEventDispatcher();

	function resizeWindow() {
		elementX = element.getBoundingClientRect().left;
	}

	function setValue(val) {
		value = val;
		dispatch('change', { value });
	}

	function onTrackEvent(e) {
		updateValueOnEvent(e);
		onDragStart(e);
	}

	function onDragStart(e) {
		currentThumb = thumb;
	}

	function onDragEnd(e) {
		currentThumb = null;
	}

	function onKeyPress(e) {
		if (keydownAcceleration < 50) keydownAcceleration++;
		let throttled = Math.ceil(keydownAcceleration / 5);

		if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
			if (value + throttled > max || value >= max) {
				setValue(max);
			} else {
				setValue(value + throttled);
			}
		}
		if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
			if (value - throttled < min || value <= min) {
				setValue(min);
			} else {
				setValue(value - throttled);
			}
		}

		clearTimeout(accelerationTimer);
		accelerationTimer = setTimeout(() => (keydownAcceleration = 1), 100);
	}

	function calculateNewValue(clientX) {
		let delta = clientX - (elementX + 10);
		let percent = (delta * 100) / (container.clientWidth - 10);
		percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

		let newValue = Math.round(((percent * (max - min)) / 100 + min) / step) * step; // Snap to step
		newValue = Math.max(min, Math.min(newValue, max)); // Ensure within range

		setValue(newValue);
	}

	function updateValueOnEvent(e) {
		if (!currentThumb && e.type !== 'touchstart' && e.type !== 'mousedown') return false;
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();

		onFirstInteraction();

		const clientX =
			e.type === 'touchmove' || e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
		calculateNewValue(clientX);
	}

	$: if (element) elementX = element.getBoundingClientRect().left;
	$: holding = Boolean(currentThumb);

	$: if (progressBar && thumb) {
		value = value > min ? value : min;
		value = value < max ? value : max;

		let percent = ((value - min) * 100) / (max - min);
		let offsetLeft = (container.clientWidth - 10) * (percent / 100) + 5;

		thumb.style.left = `${offsetLeft}px`;
		progressBar.style.width = `${offsetLeft}px`;
	}

	function onFirstInteraction() {
		if (!initialized) {
			resizeWindow();
			initialized = true;
		}
	}
</script>

<svelte:window
	on:touchmove|nonpassive={updateValueOnEvent}
	on:touchcancel={onDragEnd}
	on:touchend={onDragEnd}
	on:mousemove={updateValueOnEvent}
	on:mouseup={onDragEnd}
	on:resize={resizeWindow}
/>
<div class="range">
	<div
		class="range__wrapper"
		tabindex="0"
		on:keydown={onKeyPress}
		bind:this={element}
		role="slider"
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={value}
		{id}
		on:mousedown={onTrackEvent}
		on:touchstart={onTrackEvent}
	>
		<div class="range__track" bind:this={container}>
			<div class="range__track--highlighted" bind:this={progressBar} />
			<div
				tabindex="0"
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-label="Value thumb"
				class="range__thumb"
				class:range__thumb--holding={holding}
				bind:this={thumb}
				on:touchstart={onDragStart}
				on:mousedown={onDragStart}
			/>
		</div>
	</div>
</div>

<style>
	.range {
		position: relative;
		flex: 1;
	}

	.range__wrapper {
		min-width: 100%;
		position: relative;
		padding: 0.5rem 0;
		box-sizing: border-box;
		outline: none;
	}

	.range__wrapper:focus-visible > .range__track {
		box-shadow: 0 0 0 2px white, 0 0 0 3px var(--track-focus, #006747);
	}

	.range__track {
		height: 6px;
		background-color: var(--track-bgcolor, #dfdfdf);
		border-radius: 999px;
	}

	.range__track--highlighted {
		background-color: var(--track-highlight-bgcolor, #6185ff);
		background: var(--track-highlight-bg, linear-gradient(90deg, #0c8861, #006747));
		width: 0;
		height: 6px;
		position: absolute;
		border-radius: 999px;
	}

	.range__thumb {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: var(--thumb-bgcolor, #33856c);
		cursor: pointer;
		border-radius: 999px;
		margin-top: -8px;
		margin-left: -13px;
		transition: box-shadow 100ms;
		user-select: none;
		box-shadow: var(
			--thumb-boxshadow,
			0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 0px 2px 1px rgba(0, 0, 0, 0.2)
		);
	}

	.range__thumb--holding {
		box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 2px 1px rgba(0, 0, 0, 0.2),
			0 0 0 6px var(--thumb-holding-outline, #0067461f);
	}
</style>
