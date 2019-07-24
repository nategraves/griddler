<script>
	import levels from './levels.json';
	import _ from 'lodash';
	import Griddler from './Griddler.svelte';
	import Buildler from './Buildler.svelte';

	let currentLevel = 0;

	let level = levels[currentLevel];
	let { title, colors } = level;
	let buildMode = false;
</script>

<style>
	.flex {
		display: flex;
	}

	button {
		background: #DCE;
		border: 4px;
		padding: 0.5rem 1rem;
	}

	button.active {
		border: 1px solid rgba(0, 0, 0, 0.4);
	}
</style>

<section>
	<div class="flex">
		<button
			on:click={() => buildMode = false}
			class="{!buildMode ? 'active' : ''}"
		>
			Play
		</button>
		<button
			on:click={() => buildMode = true}
			class="{buildMode ? 'active' : ''}"
		>
		</button>
	</div>
	<Griddler />
	<Buildler />
</section>