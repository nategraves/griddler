<script>
  import tinycolor from 'tinycolor2';
  import { afterUpdate } from 'svelte';

  const OPEN = -1;
  const white = '#eee';
  const black = '#111';

  export let row = null;
  export let col = null;
  export let layerIndex = null;
  export let enabledState = OPEN;
  export let disabledState = OPEN;
  export let color = null;
  export let onMouseDown;
  export let onMouseMove;
  export let onMouseUp;
  export let onClick;
  export let onRightClick;
  export let transitionTime = 0.2;
  export let size = 48;

  afterUpdate(() => {
    if (row === 0 && col === 0) {
      console.log(disabledState, enabledState);
    }
  })

  $: disabled = disabledState === layerIndex;
  $: bg = enabledState === OPEN && disabledState === OPEN
    ? white
    : color;
  $: textColor = tinycolor(bg).isLight() ? black : white;
  $: bgImage = disabled 
    ? `repeating-linear-gradient(45deg,transparent,transparent 3px,${bg} 3px,${bg} 6px)`
    : 'none'
  $: style = `
    background-color: ${disabled ? white : bg};
    background-image: ${bgImage};
    color: ${textColor};
    font-size: ${size / 3}px;
    height: ${size}px;
    transition: all ${transitionTime}s ease-in-out;
    width: ${size}px;
  `;
</script>

<style>
  div {
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: relative;
  }
</style>

<div
  {style}
  on:click={(e) => {
    e.preventDefault();

    if (onClick) {
      onClick(row, col);
    }
  }}
  on:contextmenu={(e) => {
    e.preventDefault();

    if (onRightClick) {
      onRightClick(row, col);
    }
  }}
  on:mousedown={(e) => {
    e.preventDefault();

    if (onMouseDown) {
      onMouseDown(e, row, col);
    }
  }}
  on:mousemove={(e) => {
    e.preventDefault();

    if (onMouseMove) {
      onMouseMove(row, col);
    }
  }}
  on:mouseup={(e) => {
    e.preventDefault();

    if (onMouseUp) {
      onMouseUp(row, col);
    }
  }}
>
  <slot />
</div>

