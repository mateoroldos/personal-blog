<script lang="ts">
  export let isLink: boolean;
  export let href: string;

  let className: string | undefined = undefined;

  export { className as class };
</script>

{#if isLink}
  <a class={className} {href} {...$$restProps}>
    <slot />
  </a>
{:else}
  <div class={className}>
    <slot />
  </div>
{/if}
