import chalk from 'chalk'
import chroma from 'chroma-js'
import colors from '../colors.json'

const input = (process.argv[2] || '').trim().toLocaleLowerCase()

function getDistance(c: string) {
  if (!input)
    return 0
  const inputHue = chroma(input).hsv()[0]
  const hue = chroma(c).hsv()[0]
  let v = inputHue - hue
  if (v > 180)
    v -= 360
  if (v < -180)
    v += 360
  return v
}

const items = colors
  .filter(i => Math.abs(getDistance(i.value)) < 5)
  .sort((a, b) => getDistance(a.value) - getDistance(b.value))

items.forEach((i) => {
  console.log(
    chalk
      .bgHex(i.value)
      .hex(chroma(i.value).luminance() > 0.5 ? '#000000' : '#ffffff')(
        `  ${i.value}  ${i.romanized}  ${i.name}  `,
      ),
  )
})
