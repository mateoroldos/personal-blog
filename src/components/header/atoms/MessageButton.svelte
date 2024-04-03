<script lang="ts">
  import { fly } from "svelte/transition";
  import { Mail, ArrowUp, Loader2 } from "lucide-svelte";

  export let isOpen: boolean;
  export let isSendingMessage: boolean;
</script>

<button
  on:click={() => (isOpen = !isOpen)}
  class="bg-primary-500 text-primary-50 rounded-full w-9 h-9 flex items-center justify-center font-medium hover:bg-primary-600 transition-colors ease-in-out duration-500"
>
  {#if isSendingMessage}
    <div class="animate-spin absolute" in:fly={{ x: 20, duration: 700 }}>
      <Loader2 class="size-4" />
    </div>
  {:else if isOpen}
    <div class="absolute" transition:fly={{ y: 20, duration: 700 }}>
      <ArrowUp class="size-4" />
    </div>
  {:else}
    <div class="absolute" transition:fly={{ x: 20, duration: 700 }}>
      <Mail class="size-4" />
    </div>
  {/if}
</button>
