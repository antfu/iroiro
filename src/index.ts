import _colors from '../colors.json'

export interface Color {
  value: string
  name: string
  romanized: string
  names: string[]
  hue: number
  saturation: number
  lightness: number
}

function shuffle<T>(_arr: T[]): T[] {
  const array = Array.from(_arr)
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const colors = _colors as Color[]

export function getColors(name: string) {
  if (name === 'random')
    return shuffle(colors)
  return colors.filter(i => i.names.includes(name))
}
