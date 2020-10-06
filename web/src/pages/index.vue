<template>
  <div>
    <p class="text-4xl">
      <Icon class="iconify inline-block" icon="carbon:carousel-horizontal" />
    </p>
    <p>
      <a href="https://github.com/antfu/vitesse" target="_blank">
        iroiro
      </a>
      <br>

      <input
        v-model="input"
        class="px-4 py-2 border border-gray-200 rounded text-center text-sm outline-none active:outline-none bg-transparent dark:border-gray-700"
        style="width: 250px"
        @keydown.enter="go()"
      >
    </p>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export const input = ref('')

export const go = (v = input.value) => {
  if (v)
    router.push(`/${v}`)
}
</script>
