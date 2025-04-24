<script lang="ts">
  import { Loader2 } from 'lucide-svelte';
  let responseMessage: string;
  let loading = false;
  let success = false;

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch("/api/subscribe", {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    responseMessage = data.message;
    success = data.success;
    loading = false;
  }
</script>

<div class="rounded border border-gray-500 bg-white p-6">
  <form
    id="subscribe-form"
    on:submit={submit}
    class="flex flex-col gap-4"
  >
    <div class="flex flex-col gap-2">
      <label
        for="email"
        class="text-sm font-medium text-gray-800"
      >
        Join the Local-First Software Journey
      </label>
      <p class="text-sm text-gray-500">
        Practical insights about building local-first and collaborative software. One useful email per month.
      </p>
    </div>

    <div class="flex gap-2">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="you@example.com"
        required
        class="flex-1 rounded border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        class="rounded bg-primary-400 border border-gray-500 px-4 py-2 flex items-center justify-center text-sm font-medium transition-colors hover:bg-primary-300 disabled:opacity-50 min-w-32"
      >
        {#if loading}
          <Loader2 class="animate-spin h-4 w-4" />
        {:else}
          Join Now
        {/if}
      </button>
    </div>

    {#if responseMessage}
      <p
        class={`text-sm ${
          success ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {responseMessage}
      </p>
    {/if}
  </form>
</div>
