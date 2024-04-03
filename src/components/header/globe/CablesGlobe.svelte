<script lang="ts">
  import { isOpen } from "./../isOpen.ts";
  import { fade } from "svelte/transition";
  import { cablesPaths } from "./cablesPaths";
  import type { Action } from "svelte/action";
  import Globe from "globe.gl";
  import type { Writable } from "svelte/store";
  import colors from "tailwindcss/colors";
  import { isSendingMessage } from "../isSendingMessage";

  const cableGlobe: Action<HTMLDivElement, Writable<boolean>> = (
    node,
    sendingMessage
  ) => {
    const globe = Globe({
      animateIn: false,
    })
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundColor("rgba(0,0,0,0)")
      .atmosphereColor(colors.orange[700])(node);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.4;
    globe.controls().enableZoom = false;
    globe.controls().enablePan = false;

    // setTimeout(() => {
    //   globe
    //     .pathsData(cablesPaths)
    //     .pathPoints("coords")
    //     .pathPointLat(p => p[1])
    //     .pathPointLng(p => p[0])
    //     .pathColor(() => colors.gray[700])
    //     .pathDashLength(0.1)
    //     .pathDashGap(0.008)
    //     .pathDashAnimateTime(22000)
    //     .pathTransitionDuration(7000);
    // }, 1000);

    sendingMessage.subscribe(isSending => {
      if (isSending) {
        globe.controls().autoRotateSpeed = 10;
      } else {
        globe.controls().autoRotateSpeed = 0.4;
      }
    });

    return {
      destroy() {
        globe._destructor();
      },
    };
  };
</script>

{#if $isOpen}
  <div
    in:fade={{ delay: 1000, duration: 1000 }}
    use:cableGlobe={isSendingMessage}
    class="absolute w-[100vw] top-10 left-0"
  />
{/if}
