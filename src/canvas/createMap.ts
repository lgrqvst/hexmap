import { ctx } from '../canvas'
import { KeyPoint } from '../types'
import { drawGrid } from './drawGrid'
import { drawGuides } from './drawGuides'
import { generateMatrix } from './generateMatrix'

const { abs, floor, min, PI, sin } = Math

export const createMap = (widthMap: number, heightMap: number) => {
  const widthScreen = window.innerWidth * 2
  const heightScreen = window.innerHeight * 2

  const marginHorizontal = min(widthScreen, heightScreen) * 0.05
  const marginVertical = min(widthScreen, heightScreen) * 0.05

  const widthUsable = widthScreen - marginHorizontal * 2
  const heightUsable = heightScreen - marginVertical * 2

  const ratioWidthHeight = abs(sin(PI / 3))
  const ratioHeightWidth = 1 / ratioWidthHeight

  const dynamicHorizontalUnits =
    floor(widthMap / 2) * 3 +
    (widthMap % 2 === 0 ? 0 : 2) + // Add 2 if widthMap is odd
    (widthMap % 2 === 0 ? 0.5 : 0) // Add 0.5 if widthMap is even
  const sizeDynamicHorizontalUnits = widthUsable / dynamicHorizontalUnits

  const dynamicVerticalUnits = heightMap * 2 + (widthMap > 1 ? 1 : 0)
  const sizeDynamicVerticalUnits =
    (heightUsable / dynamicVerticalUnits) * ratioHeightWidth

  const unit = min(sizeDynamicHorizontalUnits, sizeDynamicVerticalUnits)

  const heightRow = ratioWidthHeight * unit

  const widthMapRender = unit * dynamicHorizontalUnits
  const heightMapRender = heightRow * dynamicVerticalUnits

  const offsetHorizontal = (widthUsable - widthMapRender) / 2
  const offsetVertical = (heightUsable - heightMapRender) / 2

  drawGuides(
    ctx,
    marginHorizontal,
    marginVertical,
    widthUsable,
    heightUsable,
    widthMap,
    heightMap,
    widthScreen,
    heightScreen,
    offsetHorizontal,
    offsetVertical,
    heightRow,
    unit
  )

  const matrix: KeyPoint[][] = generateMatrix(
    widthMap,
    heightMap,
    unit,
    heightRow,
    marginHorizontal,
    marginVertical,
    offsetHorizontal,
    offsetVertical
  )

  drawGrid(matrix, ctx, heightRow, unit)
}
