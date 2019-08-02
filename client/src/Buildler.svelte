<script>
  import { zeros } from 'mathjs';
	import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import { hexColors } from './colors';
  import { client, AddLevel } from './gql';
  import BuildlerBlock from './BuildlerBlock.svelte';

  const MIN_SIZE = 2;
  const MAX_SIZE = 24;

  let title = '';
  let width = 8;
  let height = 8;
  let colors = [];
  let colorIndex = -1;
  let showColorPicker;
  $: solution = resetSolution(width, height);

  const resetSolution = (width, height) => {
    const _solution = Array(width).fill().map(() => Array(height).fill(-1))
    console.log(_solution);
    return _solution;;
  }

  const reset = (row, col) => {
    solution[row][col] = -1
  };

  const toggleEnabled = (row, col) => solution[row][col] = solution[row][col] === -1
    ? colorIndex
    : -1;

  const selectColor = index => colorIndex = index;
  const deleteColor = index => colors.slice(index, 1);
  const toggleShowColorPicker = () => showColorPicker = true;

  const valueToHex = (v, short = true) => {
    const hex = v.toString(16);
    hex = hex.length == 1 ? "0" + hex : hex;
    return short ? hex[0] : hex;
  }

  const addColor = (hex) => {
    colors = [...colors, `#${hex}`];
    colorIndex = colors.length - 1;
    showColorPicker = false;
  }

  const addLevel = async () => {
    if (!title || !colors.length) {
      return null;
    }
    const level = { title, colors, solution };
    const resp = await client.mutate({
      mutation: AddLevel,
      variables: { level }
    });
    debugger;
  }
</script>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  input[type="number"] {
    margin: 2rem auto 1rem;
    width: 50px;
  }

  .board {
    display: grid;
    grid-gap: 0px;
  }

  .color-selector-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.6);
    content: '';
    z-index: 0;
  }

  .color-selector {
    display: grid;
    grid-gap: 0px;
    grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
    width: 512px;
    height: 80vh;
    overflow-y: scroll;
    z-index: 1;
  }

  .color-option {
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin: 2px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease-in-out;
  }

  .color-option:hover {
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.2);
  }

  .colors {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    margin-bottom: 1rem;
  }

  .color {
    align-items: center;
    display: flex;
    height: 32px;
    justify-content: center;
    width: 32px;
    color: #eee;
    font-size: 12px;
    cursor: pointer;
    margin: 2px;
    transition: all 0.2s ease-in-out;
    border-radius: 4px;
  }

  .color.active {
    padding: 2px;
    border: 2px solid black;
  }

  .color.add {
    background: #ddd;
    color: #333;
  }
</style>

<div>
  <section>
    <div>
      <input
        bind:value={title}
        type="text"
        placeholder="Griddler Title"
      />
      <input
        bind:value={width}
        type=number
        min=0
        max={MAX_SIZE}
      />
      <input
        bind:value={height}
        type=number
        min=0
        max={MAX_SIZE}
      />
    </div>
  </section>

  {#if showColorPicker}
    <div
      class="color-selector-container"
      on:click={() => showColorPicker = false}
    >
      <section
        class="color-selector"
        on:click={() => showColorPicker = false}
      >
        {#each hexColors as color}
          <div
            on:click={() => addColor(color)}
            class="color-option"
            style="background: #{color};"
          />
        {/each}
      </section>
    </div>
  {/if}

  <section>
    <div class="colors">
      {#if !colors.length}
        <span>No colors added</span>
      {/if}
      {#each colors as color, index}
        <div
          class="color {index === colorIndex && 'active'}"
          style="background: {color}"
          on:click={() => selectColor(index)}
          on:contextmenu={(e) => {
            e.preventDefault();
            reset(index)
          }}
        >
          {color}
        </div>
      {/each}
      <div class="color add" on:click={() => toggleShowColorPicker()}>
        +
      </div>
    </div>
  </section>
  <section>
    <div
      class="board"
      style="grid-template-columns: repeat({width}, 1fr); grid-template-rows: repeat({height}, 1fr);"
    >
      {#each solution as row, rowIndex}
        {#each row as col, colIndex}
          <BuildlerBlock
            row={rowIndex}
            col={colIndex}
            state={col}
            color={colors[col]}
            onClick={() => toggleEnabled(rowIndex, colIndex)}
            on:contextmenu={() => reset(rowIndex, colIndex)}
            transitionTime={0.05}
          />
        {/each}
      {/each}
    </div>
  </section>

  <div style="display: flex; justify-content: center; margin-top: 2rem;">
    <button
      on:click={() => addLevel()}
    >
      Save
    </button>
  </div>
</div>
