<script>
	import levels from './levels.json';
	import _ from 'lodash';
	import Griddler from './Griddler.svelte';

	let currentLevel = 0;

	let level = levels[currentLevel];
	let { title, colors } = level;
</script>

<style>
</style>

<section>
	<Griddler {level} />
</section>