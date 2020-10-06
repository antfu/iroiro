import { onMounted, reactive, unref } from 'vue'
import Matter from 'matter-js'
import type { IRenderDefinition } from 'matter-js'
import { MaybeRef } from '@vueuse/core'

const { Engine, Render, Runner } = Matter

interface MatterContext {
  engine: Matter.Engine
  render: Matter.Render
  world: Matter.World
  runner: Matter.Runner
}

export function useMatter(
  el: MaybeRef<HTMLElement>,
  options: IRenderDefinition['options'],
  fn: (context: MatterContext) => void,
) {
  const context = reactive({}) as MatterContext

  onMounted(() => {
    const engine = context.engine = Engine.create()
    context.world = engine.world
    context.runner = Runner.create()
    const render = context.render = Render.create({
      engine,
      element: unref(el),
      options,
    })

    fn(context)

    Engine.run(engine)
    Render.run(render)
  })

  return context as Partial<MatterContext>
}
