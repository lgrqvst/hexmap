export * from './createMap'
export * from './drawGrid'
export * from './drawGuides'
export * from './generateMatrix'

export const canvas: HTMLCanvasElement = document.getElementById(
  'canvas'
) as HTMLCanvasElement
export const ctx = canvas.getContext('2d')!
