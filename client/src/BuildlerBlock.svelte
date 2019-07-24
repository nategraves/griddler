<script>
  export let row;
  export let col;
  export let state = 0;
  export let enabledColor;
  export let onClick;
  export let onRightClick;
  export let transitionTime = 0.2;

  const white = '#eee';
  const black = '#111';
  const red = '#d22';

  console.log(enabledColor);
  $: bg = state < 0 ? red : (state > 0 ? enabledColor : white);
  $: textColor = bg === white ? black : white;

</script>

<style>
  div {
    align-items: center;
    background: white;
    border: 2px solid rgba(0, 0, 0, 0.4);
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
  style="background: {bg}; color: {textColor}; transition: all {transitionTime}s ease-in-out;"
  on:click={() => {
    if (onClick) {
      onClick(row, col);
    }
  }}
  on:contextmenu={(e) => {
    if (onRightClick) {
      e.preventDefault();
      onRightClick(row, col);
    }
  }}
>
  <slot />
</div>