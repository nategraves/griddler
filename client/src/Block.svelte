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
  export let onRightClick;
  export let transitionTime = 0.2;
  export let styles;

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
    height: 48px;
    justify-content: center;
    width: 48px;
  }
</style>

<div
  style="{_styles}"
  on:click={() => {
    if (onClick) {
      onClick(row, col);
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
  {hover ? 't' : 'f'}
  <slot />
</div>