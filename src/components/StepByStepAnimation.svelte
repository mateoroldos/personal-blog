<script lang="ts">
  import { onMount, tick } from 'svelte';

  interface Scene {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
  }

  export let scenes: Scene[] = [];
  export let autoPlay: boolean = false;
  export let autoPlaySpeed: number = 3000;
  export let initialScene: number = 0;

  let currentScene: number = initialScene;
  let isPlaying: boolean = false;
  let playInterval: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    if (autoPlay && scenes.length > 0) {
      startAutoPlay();
    }

    return () => {
      if (playInterval) clearInterval(playInterval);
    };
  });

  function startAutoPlay(): void {
    isPlaying = true;
    playInterval = setInterval(() => {
      if (currentScene >= scenes.length - 1) {
        currentScene = 0;
      } else {
        currentScene++;
      }
    }, autoPlaySpeed);
  }

  function stopAutoPlay(): void {
    isPlaying = false;
    if (playInterval) clearInterval(playInterval);
  }

  function togglePlay(): void {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  function goToScene(index: number): void {
    if (index >= 0 && index < scenes.length) {
      currentScene = index;
      if (isPlaying) {
        stopAutoPlay();
        startAutoPlay();
      }
    }
  }

  function previousScene(): void {
    goToScene(currentScene - 1);
  }

  function nextScene(): void {
    goToScene(currentScene + 1);
  }

  async function handleSliderChange(event: Event): Promise<void> {
    const newValue = parseInt((event.target as HTMLInputElement).value);
    currentScene = newValue;
    await tick();
  }
</script>

<div class="rounded overflow-hidden bg-white border border-gray-500 relative">
  <div class="h-fit absolute top-3 z-10">
    <!-- Title and description -->
    {#if scenes.length > 0 && scenes[currentScene] && (scenes[currentScene].title || scenes[currentScene].description)}
      <div class="p-4 bg-primary-100/90 mx-3 rounded border border-gray-500 overflow-y-auto h-fit">
        <h3 class="font-medium text-gray-900 !my-0 !text-base">{scenes[currentScene].title}</h3>
        {#if scenes[currentScene].description}
            <p class="text-sm text-gray-7wp00 mt-1 !mb-0">{scenes[currentScene].description}</p>
        {/if}
      </div>
    {/if}
  </div>

  <div class="rounded-sm pt-14 relative flex flex-col">
    <!-- Controls at top right -->
    <div class="absolute bottom-2 right-2 z-10 flex gap-2">
      <button
        class="p-1.5 bg-primary-100 border border-gray-700 rounded-sm hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={previousScene}
        disabled={currentScene <= 0}
        aria-label="Previous scene"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
        </svg>
      </button>

      <button
        class="p-1.5 bg-primary-100 border border-gray-700 rounded-sm hover:bg-primary-200 transition-colors"
        on:click={togglePlay}
        aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
      >
        {#if isPlaying}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        {/if}
      </button>

      <button
        class="p-1.5 bg-primary-100 border border-gray-700 rounded-sm hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={nextScene}
        disabled={currentScene >= scenes.length - 1}
        aria-label="Next scene"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Image container -->
    {#if scenes.length > 0 && scenes[currentScene]}
        <div class="w-full h-full flex-grow flex justify-center items-center">
          <img
            src={scenes[currentScene].imageSrc}
            alt={scenes[currentScene].title}
            class="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
    {:else}
      <div class="flex items-center justify-center h-64 text-gray-500">
        No animation scenes provided
      </div>
    {/if}

    <!-- Navigation boxes -->
    <div class="absolute bottom-4 left-4 flex justify-center gap-1.5">
      {#each scenes as _, i}
        <button
          class="w-2.5 h-2.5 border border-gray-500 transition-colors {i === currentScene ? 'bg-primary-500' : 'bg-primary-50'}"
          on:click={() => goToScene(i)}
          aria-label={`Go to scene ${i+1}`}
        ></button>
      {/each}
    </div>
  </div>
</div>
