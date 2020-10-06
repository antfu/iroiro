<template>
  <div>
    <div ref="container" class="flex flex-wrap">
      <!-- <Palettle
        v-for="c in colors"
        :key="c.value"
        :color="c"
        :size="c.size"
        :x="c.x"
        :y="c.y"
      /> -->
    </div>
  </div>
</template>

<script setup='props' lang='ts'>
import { getColors } from 'iroiro'
import Matter from 'matter-js'
import { computed, ref, Ref } from 'vue'
import { useMatter } from '../utils/matter'

const { Bodies, Events, Mouse, MouseConstraint, World } = Matter

declare const props: {
  color: string
}

export const colors = computed(() => {
  const colors = getColors(props.color)
    .map((color) => {
      return {
        ...color,
        size: `${100 + Math.random() * 200}px`,
        x: `${Math.random() * 100 - 5}%`,
        y: `${Math.random() * 100 - 5}%`,
      }
    })

  if (colors.length) {
    colors[0].x = '-50vw'
    colors[0].y = '-50vh'
    colors[0].size = '200vw'
  }

  return colors
})

export const container: Ref<HTMLElement> = ref(null) as any as Ref<HTMLElement>
useMatter(container, {
  width: 800,
  height: 600,
  wireframes: true,
}, ({ engine, render, world }) => {
  const ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 })
  const ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 })
  World.add(engine.world, [
    // walls
    Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
    Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
    Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
  ])

  World.add(engine.world, [ballA, ballB])

  // add mouse control
  const mouse = Mouse.create(render.canvas)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    // @ts-ignore
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  })

  World.add(engine.world, mouseConstraint)

  Events.on(mouseConstraint, 'mousedown', (event) => {
    World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }))
  })
})
</script>
