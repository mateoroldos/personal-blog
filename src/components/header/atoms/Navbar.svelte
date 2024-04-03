<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
</script>

<div
  class="flex gap-x-3 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  transition:fly={{ y: -500, duration: 600, easing: quintOut }}
>
  <a
    href="/blog"
    target="_self"
    class="transition ease-in-out hover:text-gray-100">blog</a
  >
  <a
    href="/tags"
    target="_self"
    class="transition ease-in-out hover:text-gray-100">tags</a
  >
</div>
