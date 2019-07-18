<script>
	import levels from './levels.json';
	import _ from 'lodash';
	import Griddler from './Griddler.svelte';
	import ColorSelector from './ColorSelector.svelte';

	let currentLevel = 0;
	let success = false;

	let level = levels[currentLevel];
	let { title, layers } = level;

	function changeLevel(level) {
		level = levels[level];
	}

  function toggleEnabled(row, col) {
    if (board[row][col] === -1 ) {
			return;
		}

    let _board = [...board];
    if (!!_board[row][col]) {
      _board[row][col] = 0;
    } else {
      _board[row][col] = 1;
    }
		board = [..._board];
		success = checkSolution();
	}

  function toggleDisabled(row, col) {
		let _board = [...board];
		if (_board[row][col] !== -1) {
			_board[row][col] = -1;
		} else {
			_board[row][col] = 0;
		}
		board = [..._board];
	}

	function determineColor(blockValue) {
		switch(blockValue) {
			case -1:
				return '#f00';
			case 0:
				return '#fff';
			case 1:
				return color;
		}
	}
	
	function checkSolution() {
		let same = true;

		colorSolution.forEach(
			(solutionRow, rowIndex) => {
				solutionRow.forEach(
					(solutionColumn, columnIndex) => {
						let guess = Math.max(board[rowIndex][columnIndex], 0);
						if (solutionColumn !== guess) {
							same = false;
						}
					}
				)
			}
		)

		return same;
	}
</script>

<style>
	section.main {
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	section.board-layout {
		position: relative;
    width: auto;
    height: auto;
	}

	section.column-hints {
		position: absolute;
		top: -36px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
		width: 100%;
    grid-gap: 4px;
	}

	section.column-hints.bottom {
		top: unset;
		bottom: -36px;
	}

	section.row-hints {
		position: absolute;
		left: -36px;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-gap: 4px;
	}

	section.row-hints.right {
		left: unset;
		right: -36px;
	}

  section.board {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-gap: 4px;
  }

	section.success {
		color: rgb(7, 219, 0);
		text-align: center;
		margin-top: 1rem;
		text-transform: uppercase;
		font-size: 12px;
		position: absolute;
		bottom: -72px;
		width: 100%;
	}

  div.block {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    border: 2px solid black;
    background: white;
		transition: all 0.2s ease-in-out;
  }

	div.hint {
		display: flex;
		justify-content: center;
		align-items: center;
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    background: black;
		color: white;
		font-size: 10px;
	}
</style>

<section class="main">
	{#if colors.length > 1}
		<ColorSelector
			colors={colors}
			layerChanged={layerChanged}
		/>
	{/if}
	<section class="board-layout">
		<section class="column-hints">
			{#each colTotals as hint}
				<div
					class="hint"
					style={``}
				>
					{hint}
				</div>
			{/each}
		</section>
		<section class="column-hints bottom">
			{#each colTotals as hint}
				<div class="hint">{hint}</div>
			{/each}
		</section>
		<section class="row-hints">
			{#each rowTotals as hint}
				<div class="hint">{hint}</div>
			{/each}
		</section>
		<section class="row-hints right">
			{#each rowTotals as hint}
				<div class="hint">{hint}</div>
			{/each}
		</section>
		<section class="board">
			{#each board as row, rowIndex}
				{#each row as item, colIndex}
					<div
						class="block"
						style={`background: ${determineColor(item)};`}
						on:click={() => toggleEnabled(rowIndex, colIndex)}
						on:contextmenu={(e) => {
							e.preventDefault();
							toggleDisabled(rowIndex, colIndex)
						}}
					></div>
				{/each}
			{/each}
		</section>
		{#if success}
			<section class="success">You win</section>
		{/if}
	</section>
</section>