import { Axes, Dimensions } from '../reducer'
import { KeyPoint, Point } from '../types'
import { rads } from '../utils'

const { floor, cos, sin } = Math

type Args = {
  mapSize: Dimensions
  unit: number
  rowHeight: number
  margins: Axes
  offsets: Axes
  isInverted: boolean
}

export const generateMatrix = ({
  mapSize,
  margins,
  offsets,
  unit,
  rowHeight,
  isInverted
}: Args): KeyPoint[][] => {
  let points: KeyPoint[][] = []

  for (let y = 0; y < mapSize.height; y++) {
    let row: KeyPoint[] = []

    for (let x = 0; x < mapSize.width; x++) {
      const px =
        margins.horizontal +
        offsets.horizontal +
        (floor(x / 2) * 3 + 1 + (x % 2) * 1.5) * unit
      const py = isInverted
        ? margins.vertical +
          offsets.vertical +
          (2 * y + (x % 2 === 0 ? 1 : 0)) * rowHeight
        : margins.vertical +
          offsets.vertical +
          (2 * y + 1 + (x % 2 === 1 ? 1 : 0)) * rowHeight

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
