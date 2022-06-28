import { KeyPoint, Point } from '../types'
import { rads } from '../utils'

const { floor, cos, sin } = Math

export const generateMatrix = (
  widthMap: number,
  heightMap: number,
  unit: number,
  heightRow: number,
  marginHorizontal: number,
  marginVertical: number,
  offsetHorizontal: number,
  offsetVertical: number
): KeyPoint[][] => {
  let points: KeyPoint[][] = []
  const { floor: f } = Math

  for (let y = 0; y < heightMap; y++) {
    let row: KeyPoint[] = []

    for (let x = 0; x < widthMap; x++) {
      const px =
        marginHorizontal +
        offsetHorizontal +
        (floor(x / 2) * 3 + 1 + (x % 2) * 1.5) * unit
      const py =
        marginVertical + offsetVertical + (2 * y + 1 + (x % 2)) * heightRow

      let radialPoints: Point[] = []

      for (let d = 0; d < 360; d = d += 60) {
        let rad = rads(d)

        const rpx = cos(rad)
        const rpy = sin(rad)

        radialPoints.push({
          x: rpx,
          y: rpy
        })
      }

      const p = {
        x: px,
        y: py,
        radialPoints: radialPoints
      }

      row.push(p)
    }
    points.push(row)
  }

  return points
}
