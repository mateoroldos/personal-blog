<script lang="ts">
  import { tweened, type Tweened } from "svelte/motion";
  import { Star } from "lucide-svelte";

  export let stars: number;

  let starsStore: Tweened<number> = tweened(0, { duration: 2000 });
  starsStore.set(stars);
</script>

<div
  class="border border-solid border-gray-200 rounded-lg h-fit px-2 gap-1 text-xs font-semibold text-gray-600 flex flex-row items-center justify-start min-w-14"
>
  <Star class="w-3 text-primary-600" />
  <div class="flex items-center justify-center flex-1">
    <span>{Math.trunc($starsStore)}</span>
  </div>
</div>
