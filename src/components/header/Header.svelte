<script lang="ts">
  import { isOpen } from "./isOpen.ts";
  import { isSendingMessage } from "./isSendingMessage";
  import ContactForm from "./atoms/ContactForm.svelte";
  import MessageButton from "./atoms/MessageButton.svelte";
  import OpenToWorkLabel from "./atoms/OpenToWorkLabel.svelte";
  import { quintOut } from "svelte/easing";
  import { fly, slide, scale, fade } from "svelte/transition";
  import LocaleTime from "./atoms/LocaleTime.svelte";
  import { Check, Copy } from "lucide-svelte";
  import OptionalLink from "./atoms/OptionalLink.svelte";

  let messageSent = false;
  let isEmailCopied = false;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mateor@emestudio.xyz");
    isEmailCopied = true;

    setTimeout(() => {
      isEmailCopied = false;
    }, 2000);
  };

  const updateOverflow = (node: HTMLElement) => {
    isOpen.subscribe(value => {
      if (value) {
        node.style.overflow = "hidden";
      } else {
        node.style.overflow = "auto";
      }
    });
  };
</script>

{#if !messageSent}
  <header
    class="z-50 w-[370px] border border-solid border-gray-700/50 flex flex-col align-start justify-start space-y-4 overflow-hidden shadow-sm inset-x-0 bg-primary-100 left-[50vw] -translate-x-1/2 p-[6px] rounded-xl text-gray-200 fixed top-5 transition-[max-height,_transform,_opacity] ease-in-out duration-700"
    class:translate-y-[100px]={$isOpen}
    use:updateOverflow
    out:scale|local={{ duration: 1200, easing: quintOut }}
  >
    <div
      class="flex flex-row justify-between items-center md:gap-14 gap-6 flex-1 overflow-hidden relative"
    >
      <OptionalLink
        isLink={!$isOpen}
        href="/"
        class="flex flex-row items-center overflow-hidden"
      >
        <slot name="avatar" />
        <h1 class="hidden sm:block font-normal ml-2">mateor</h1>
        {#if $isOpen}
          <div
            in:fade={{ delay: 600 }}
            class="flex flex-row gap-2 items-center"
          >
            <span class="text-gray-900 font-normal">@emestudio.xyz</span>

            <button
              on:click|preventDefault={handleCopyEmail}
              class="border border-solid border-gray-300/70 ml-1 mt-1 relative rounded size-5 transition-colors duration-300"
            >
              {#if isEmailCopied}
                <div
                  in:fly={{
                    y: -10,
                    duration: 200,
                  }}
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <Check class="text-green-500 size-3" />
                </div>
              {:else}
                <div
                  in:fly={{
                    y: -10,
                    duration: 200,
                  }}
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <Copy
                    class="text-gray-600 size-3 transition-colors ease-in-out duration-300"
                  />
                </div>
              {/if}
            </button>
          </div>
        {/if}
      </OptionalLink>

      <!-- {#if !$isOpen}
        <Navbar />
      {/if} -->

      <MessageButton
        bind:isOpen={$isOpen}
        isSendingMessage={$isSendingMessage}
      />
    </div>

    {#if $isOpen}
      <ContactForm
        bind:isOpen={$isOpen}
        bind:isSendingMessage={$isSendingMessage}
        bind:messageSent
      />
    {/if}
  </header>
{/if}

{#if $isOpen}
  <div
    in:slide={{
      axis: "y",
      duration: 1600,
      delay: 100,
      easing: quintOut,
    }}
    out:slide={{
      axis: "y",
      duration: 1600,
      easing: quintOut,
    }}
    class="fixed inset-0 z-40 bg-primary-200 p-6"
  >
    <slot name="globe" />
    <div
      class="flex flex-row gap-6 justify-between items-start"
      in:fade={{ delay: 300 }}
      out:fade
    >
      <OpenToWorkLabel />
      <LocaleTime />
    </div>
  </div>
{/if}
