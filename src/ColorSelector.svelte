<script>
  export let level;
  export let onLayerChanged;

  let colors = level.layers.map(l => l.color);

  function layerChanged(index) {
    currentIndex = index;
    color = colors[index];
    colorSolution = colorSolutions[index];
    onLayerChanged(index);
  }
</script>

<style>
  div.container {
    display: flex;
    position: absolute;
    top: 20px;
  }

  div.color {
    cursor: pointer;
    height: 32px;
    width: 32px;
  }
</style>

<div class="container">
  {#each colors as bgColor, index}
    <div
      class="color"
      style={`background: ${bgColor}`}
      on:click={() => layerChanged(index)}
    />
  {/each}
</div>