<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { z } from "zod";
  import { slide, fade } from "svelte/transition";

  export let isOpen: boolean;
  export let isSendingMessage: boolean;
  export let messageSent: boolean;

  let responseMessage = "";

  let emailValid = false;
  const handleEmailInput = (e: Event) => {
    const email = (e.target as HTMLInputElement).value;
    const emailSchema = z.string().email();

    try {
      emailSchema.parse(email);
      emailValid = true;
    } catch (error) {
      emailValid = false;
    }
  };

  let textareaValid = false;
  const handleTextareaInput = (e: Event) => {
    const textarea = (e.target as HTMLInputElement).value;
    const textareaSchema = z.string().min(5).max(500);

    try {
      textareaSchema.parse(textarea);
      textareaValid = true;
    } catch (error) {
      textareaValid = false;
    }
  };

  async function submit(e: SubmitEvent) {
    e.preventDefault();

    isSendingMessage = true;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      let audio = new Audio("/send-message-sound.mp3");
      audio.play();

      isSendingMessage = false;
      messageSent = true;

      setTimeout(() => {
        messageSent = false;
        isOpen = false;
      }, 2000);
    } else {
      isSendingMessage = false;
      responseMessage = data.message;
    }
  }
</script>

<form
  on:submit={submit}
  in:slide={{ axis: "y", duration: 800, delay: 200, easing: quintOut }}
  out:slide={{ axis: "y", duration: 1000, easing: quintOut }}
  autocomplete="off"
  class="space-y-2 pb-4 w-full text-sm bg-primary-50 border border-gray-500 p-3 rounded-lg flex flex-col items-end text-gray-800"
>
  <input
    type="email"
    name="email"
    on:input={handleEmailInput}
    placeholder="Your email"
    disabled={isSendingMessage}
    class="flex overflow-hidden rounded-lg border border-gray-700 px-3 py-2 focus-visible:outline-none bg-transparent w-full placeholder:text-gray-500"
    class:border-gray-200={emailValid}
  />
  <textarea
    name="message"
    on:input={handleTextareaInput}
    placeholder="Type your message here"
    disabled={isSendingMessage}
    class="flex overflow-hidden resize-none flex-1 rounded-lg border border-gray-700 px-3 py-2 focus-visible:outline-none bg-transparent w-full placeholder:text-gray-500"
    class:border-gray-600={textareaValid}
  />
  <div class="flex flex-row gap-4 justify-between items-center w-full">
    <div class="px-3">
      {#if responseMessage}
        <p
          transition:fade={{ duration: 600, easing: quintOut }}
          class="text-red-300 text-xs"
        >
          {responseMessage}
        </p>
      {/if}
    </div>
    <button
      class="bg-primary-300 px-3 py-1 rounded-lg text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
      disabled={isSendingMessage || !emailValid || !textareaValid}
    >
      {#if isSendingMessage}
        Sending
      {:else}
        Send
      {/if}
    </button>
  </div>
</form>
