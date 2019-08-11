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
  export let mainDown;
  export let secondaryDown;

  const white = '#eee';
  const black = '#111';
  const red = '#d22';
  let hover = false;

  $: bg = state === -2 ? red : (state === -1 ? white : color);
  $: textColor = tinycolor(bg).isLight() ? black : white;
  $: _styles = `background: ${bg}; color: ${textColor}; transition: all ${transitionTime}s ease-in-out;${!!styles ? styles : ''}`;
</script>

<style>
  div {
    align-items: center;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    justify-content: center;
    height: 48px;
    width: 48px;
    position: relative;
  }

  .debug {
    font-size: 6px;
    position: absolute;
    background: #fff;
    color: #111;
    top: 0;
    left: 0;
    padding: 1px;
    height: 10px;
    width: 10px;
  }
</style>

<div
  style="{_styles}"
  on:click={() => {
    if (onClick) {
      onClick(row, col);
    }
  }}
  on:mousedown={() => {
    if (onMouseDown) {
      onMouseDown(row, col);
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
  <div class="debug">
    {state}
  </div>
  <slot />
</div>