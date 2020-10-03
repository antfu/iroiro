<template>
  <div class="text-xl mt-6">
    <div class="icon-btn mx-2" @click="isDark = !isDark">
      <Icon :icon="isDark ? 'carbon:moon' : 'carbon:sun'" class="inline-block" />
    </div>
  </div>
</template>

<script setup lang='ts'>
export { isDark } from '/~/utils'
</script>
