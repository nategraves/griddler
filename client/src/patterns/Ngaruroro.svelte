<script>
  const defaultColors = ["#5359A6", "#37ABB7", "#F05D42", "#C4DD76"];
  const colorsNeeded = defaultColors.length;

  export let colors = defaultColors;
  export let styles;

  import { fillColors } from '../utils';

  if (colors.length < colorsNeeded) {
    fillColors(colors, colorsNeeded);
  }
</script>

<style></style>

<svg viewBox="0 0 1600 1200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="{styles}">
  <defs>
    <rect id="path-1" x="0" y="0" width="1600" height="1200"></rect>
  </defs>
  <g id="Patterns" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="Ngaruroro">
      <g>
        <mask id="mask-2" fill="white">
          <use xlink:href="#path-1"></use>
        </mask>
        <use id="Background" fill="{colors[0]}" xlink:href="#path-1"></use>
        <g id="Opacity-70" opacity="0.7" mask="url(#mask-2)" fill="{colors[1]}" fill-rule="nonzero">
          <g transform="translate(0.000000, -40.000000)" id="Shape">
            <rect x="0" y="0" width="160" height="160"></rect>
            <rect x="800" y="0" width="160" height="160"></rect>
            <rect x="320" y="160" width="160" height="160"></rect>
            <rect x="960" y="320" width="160" height="160"></rect>
            <rect x="1440" y="480" width="160" height="160"></rect>
            <rect x="0" y="640" width="160" height="160"></rect>
            <rect x="640" y="800" width="160" height="160"></rect>
            <rect x="640" y="960" width="160" height="160"></rect>
            <rect x="160" y="1120" width="160" height="160"></rect>
            <rect x="1440" y="1120" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Opacity-60" opacity="0.6" mask="url(#mask-2)" fill="{colors[1]}" fill-rule="nonzero">
          <g transform="translate(0.000000, -40.000000)" id="Shape">
            <rect x="960" y="0" width="160" height="160"></rect>
            <rect x="1440" y="0" width="160" height="160"></rect>
            <rect x="0" y="160" width="160" height="160"></rect>
            <rect x="0" y="480" width="160" height="160"></rect>
            <rect x="1280" y="800" width="160" height="160"></rect>
            <rect x="0" y="960" width="160" height="160"></rect>
            <rect x="1280" y="960" width="160" height="160"></rect>
            <rect x="800" y="1120" width="160" height="160"></rect>
            <rect x="480" y="480" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Opacity-50" opacity="0.5" mask="url(#mask-2)" fill="{colors[1]}" fill-rule="nonzero">
          <g transform="translate(0.000000, 120.000000)" id="Shape">
            <rect x="160" y="0" width="160" height="160"></rect>
            <rect x="0" y="160" width="160" height="160"></rect>
            <rect x="800" y="160" width="160" height="160"></rect>
            <rect x="1440" y="160" width="160" height="160"></rect>
            <rect x="1280" y="320" width="160" height="160"></rect>
            <rect x="480" y="480" width="160" height="160"></rect>
            <rect x="640" y="480" width="160" height="160"></rect>
            <rect x="320" y="640" width="160" height="160"></rect>
            <rect x="480" y="640" width="160" height="160"></rect>
            <rect x="1440" y="800" width="160" height="160"></rect>
            <rect x="480" y="960" width="160" height="160"></rect>
            <rect x="1120" y="960" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Opacity-40" opacity="0.4" mask="url(#mask-2)" fill="{colors[1]}" fill-rule="nonzero">
          <g transform="translate(160.000000, -40.000000)" id="Shape">
            <rect x="480" y="0" width="160" height="160"></rect>
            <rect x="960" y="0" width="160" height="160"></rect>
            <rect x="320" y="320" width="160" height="160"></rect>
            <rect x="0" y="480" width="160" height="160"></rect>
            <rect x="960" y="480" width="160" height="160"></rect>
            <rect x="640" y="640" width="160" height="160"></rect>
            <rect x="800" y="640" width="160" height="160"></rect>
            <rect x="1280" y="800" width="160" height="160"></rect>
            <rect x="0" y="960" width="160" height="160"></rect>
            <rect x="640" y="960" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Opacity-30" opacity="0.3" mask="url(#mask-2)" fill="{colors[1]}" fill-rule="nonzero">
          <g transform="translate(160.000000, -40.000000)" id="Shape">
            <rect x="1120" y="0" width="160" height="160"></rect>
            <rect x="480" y="160" width="160" height="160"></rect>
            <rect x="800" y="160" width="160" height="160"></rect>
            <rect x="960" y="320" width="160" height="160"></rect>
            <rect x="160" y="480" width="160" height="160"></rect>
            <rect x="480" y="480" width="160" height="160"></rect>
            <rect x="160" y="640" width="160" height="160"></rect>
            <rect x="960" y="640" width="160" height="160"></rect>
            <rect x="0" y="800" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Opacity-20" opacity="0.2" style="mix-blend-mode: multiply;" mask="url(#mask-2)" fill="{colors[1]}" fill-rule="nonzero">
          <g transform="translate(160.000000, -40.000000)" id="Shape">
            <rect x="160" y="0" width="160" height="160"></rect>
            <rect x="320" y="160" width="160" height="160"></rect>
            <rect x="1120" y="160" width="160" height="160"></rect>
            <rect x="160" y="320" width="160" height="160"></rect>
            <rect x="480" y="320" width="160" height="160"></rect>
            <rect x="800" y="480" width="160" height="160"></rect>
            <rect x="0" y="640" width="160" height="160"></rect>
            <rect x="800" y="960" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Color-3" mask="url(#mask-2)" fill-rule="nonzero">
          <g transform="translate(160.000000, -40.000000)" id="Shape">
            <rect fill="{colors[1]}" x="0" y="0" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="320" y="0" width="160" height="160"></rect>
            <rect fill="{colors[2]}" x="640" y="160" width="160" height="160"></rect>
            <rect fill="{colors[2]}" x="1120" y="320" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="640" y="480" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="1120" y="640" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="640" y="800" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="320" y="960" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Color-2" mask="url(#mask-2)" fill-rule="nonzero">
          <g transform="translate(0.000000, 920.000000)" id="Shape">
            <rect fill="{colors[2]}" x="320" y="0" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="1120" y="0" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="0" y="160" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="320" y="160" width="160" height="160"></rect>
            <rect fill="{colors[1]}" x="640" y="160" width="160" height="160"></rect>
          </g>
        </g>
        <g id="Color-1" mask="url(#mask-2)" fill="{colors[3]}" fill-rule="nonzero">
          <g transform="translate(0.000000, 120.000000)" id="Shape">
            <rect x="1120" y="0" width="160" height="160"></rect>
            <rect x="1440" y="0" width="160" height="160"></rect>
            <rect x="160" y="160" width="160" height="160"></rect>
            <rect x="1440" y="480" width="160" height="160"></rect>
            <rect x="0" y="640" width="160" height="160"></rect>
            <rect x="960" y="640" width="160" height="160"></rect>
            <rect x="1120" y="640" width="160" height="160"></rect>
            <rect x="960" y="960" width="160" height="160"></rect>
            <rect x="1280" y="960" width="160" height="160"></rect>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>