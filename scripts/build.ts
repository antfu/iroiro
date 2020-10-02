import fs from 'fs/promises'
import chroma from 'chroma-js'
import namer from 'color-namer'
import colors from '../src/colors.json'

async function start() {
  const items = colors
    .map((i) => {
      const c = chroma(i.value)
      const [hue, saturation, lightness] = c.hsl()
      // @ts-ignore
      const nameSets = namer(i.value, { distance: 'deltaE' })

      const names = Array.from(
        new Set(
          Object.entries(nameSets)
            .flatMap(([key, list]) => {
              return list
                .filter(i => i.distance < 10)
                .map(i => i.name.toLowerCase().split(' ').slice(-1)[0])
                .filter(i => i.length > 2)
            }),
        ),
      )

      return {
        ...i,
        hue,
        saturation,
        lightness,
        names,
      }
    })

  await fs.writeFile('./colors.json', `${JSON.stringify(items, null, 2)}\n`, 'utf-8')
}

start()
