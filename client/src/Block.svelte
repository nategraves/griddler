<script>
  import tinycolor from 'tinycolor2';

  export let row;
  export let col;
  export let state = -1;
  export let color;
  export let onClick;
  export let onMouseEnter;
  export let onMouseOver;
  export let onMouseLeave;
  export let onMouseDown;
  export let onMouseUp;
  export let onRightClick;
  export let transitionTime = 0.2;
  export let styles;
  export let buttonDown;

  const debug = false;
  const white = '#eee';
  const black = '#111';
  const red = '#d22';
  let hover = false;

  $: disabled = state === -2;
  $: bg = state > -1 ? color : white;
  $: textColor = tinycolor(bg).isLight() ? black : white;
  $: _styles = `
    background-color: ${bg};
    color: ${textColor};
    transition: all ${transitionTime}s ease-in-out;
    ${!!styles ? styles : ''}
  `;
</script>

<style>
  div {
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    height: 48px;
    justify-content: center;
    position: relative;
    width: 48px;
  }

  div.disabled {
    background-color: #eee;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.15) 3px,
      rgba(0, 0, 0, 0.25) 6px
    );
  }
</style>

<div
  class:disabled
  style="{_styles}"
  on:click={() => {
    if (onClick) {
      onClick(row, col);
    }
  }}
  on:mousedown={(e) => {
    if (onMouseDown) {
      onMouseDown(e, row, col);
    }
  }}
  on:mouseup={() => {
    if (onMouseUp) {
      onMouseUp(row, col);
    }
  }}
  on:mouseenter={() => {
    hover = true;
    if (onMouseEnter) {
      onMouseEnter(row, col);
    }
  }}
  on:mouseover={() => {
    if (onMouseOver) {
      onMouseOver(row, col);
    }
  }}
  on:mouseleave={() => {
    hover = false;
    if (onMouseLeave) {
      onMouseLeave(row, col);
    }
  }}
  on:contextmenu={(e) => {
    if (onRightClick) {
      e.preventDefault();
      onRightClick(row, col);
    }
  }}
>
  {#if debug}
    <div style="position: absolute; top: 0; left: 0; font-size: 8px; height: 12px; width: 12px; display: flex: justifiy-content: center; align-content: center;">
      {state}
    </div>
  {/if}
  <slot />
</div>

