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

export const colors = _colors as Color[]

export function getColors(name: string) {
  return colors.filter(i => i.names.includes(name))
}
