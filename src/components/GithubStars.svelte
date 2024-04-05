<script lang="ts">
  import { onMount } from "svelte";
  import { tweened, type Tweened } from "svelte/motion";
  import { Star } from "lucide-svelte";

  export let link: string;

  let stars: Tweened<number> = tweened(0, { duration: 2000 });

  onMount(async () => {
    const githubStars = await fetch(`https://api.github.com/repos${link}`)
      .then(res => res.json())
      .then(data => data.stargazers_count);

    stars.set(githubStars);
  });
</script>

<div
  class="border-2 border-solid border-gray-200 rounded-lg h-fit px-2 gap-1 text-xs font-semibold text-gray-600 flex flex-row items-center justify-start min-w-14"
>
  <Star class="w-3 text-primary-600" />
  <div class="flex items-center justify-center flex-1">
    <span>{Math.trunc($stars)}</span>
  </div>
</div>
