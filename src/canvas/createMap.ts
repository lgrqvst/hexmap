import { State } from '../reducer'
import { KeyPoint } from '../types'
import { ctx } from './'
import { drawGrid } from './drawGrid'
import { drawGuides } from './drawGuides'
import { generateMatrix } from './generateMatrix'

export const createMap = (state: State) => {
  const { mapSize, margins, offsets, unit, rowHeight, isInverted } = state

  drawGuides(ctx, state)

  const matrix: KeyPoint[][] = generateMatrix({
    mapSize,
    margins,
    offsets,
    unit,
    rowHeight,
    isInverted
  })

  drawGrid(state, ctx, matrix)
}
