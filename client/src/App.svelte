<script>
  import _ from 'lodash';
  import { Router, Route } from 'svero';

  import Aare from './patterns/Aare.svelte';
  import Clarence from './patterns/Clarence.svelte';
  import Doubs from './patterns/Doubs.svelte';
  import Hinterrhein from './patterns/Hinterrhein.svelte';
  import Inn from './patterns/Inn.svelte';
  import Kander from './patterns/Kander.svelte';
  import Linth from './patterns/Linth.svelte';
  import Mataura from './patterns/Mataura.svelte';

  import Griddler from './Griddler.svelte';

  const bgs = [Aare, Clarence, Doubs, Hinterrhein, Inn, Kander, Linth];
</script>

<svelte:component
  this={bgs[5]}
  colors={['#3ab', '#aa2', '#cf1', '#52a', '#3a1', '#52a', '#3a1', '#aa2', '#cf1']}
  styles="position: absolute; z-index: -1; top: 0; bottom: 0; left: 0; right: 0;"
/>
<section>
  <Griddler />
</section>
