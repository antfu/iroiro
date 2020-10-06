<template>
  <div
    class="border-gray-200 overflow-hidden text-left rounded-full hover:rounded-sm fixed"
    :style="{background: color.value, width: size, height: size, top: y, left: x }"
  >
    <div class="px-4 py-2 text-white text-center">
      {{ color.name }}
      <br>
      {{ color.value }}
    </div>
  </div>
</template>

<script setup='props' lang='ts'>
import { Color } from 'iroiro'

declare const props: {
  color: Color
  size: string
  x: string
  y: string
}
</script>
