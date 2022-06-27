import { useEffect } from 'react'
import './App.css'
import { canvas, ctx } from './canvas'

const widthMap = 10
const heightMap = 10

const { abs, cos, floor, min, PI, sin, random } = Math

const rads = (degs: number) => (degs * Math.PI) / 180

const degs = (rads: number) => (rads * 180) / Math.PI

export const App = () => {
  const createMap = () => {
    const widthScreen = window.innerWidth * 2
    const heightScreen = window.innerHeight * 2

    const marginHorizontal = min(widthScreen, heightScreen) * 0.05
    const marginVertical = min(widthScreen, heightScreen) * 0.05

    const widthUsable = widthScreen - marginHorizontal * 2
    const heightUsable = heightScreen - marginVertical * 2

    const ratioWidthHeight = abs(sin(PI / 3))
    const ratioHeightWidth = 1 / ratioWidthHeight

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.strokeRect(marginHorizontal, marginVertical, widthUsable, heightUsable)

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

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'

    for (let x = 0; x < widthMap; x++) {
      ctx.beginPath()
      ctx.moveTo(
        marginHorizontal +
          offsetHorizontal +
          unit * (floor(x / 2) * 3 + 1 + (x % 2) * 1.5),
        0
      )
      ctx.lineTo(
        marginHorizontal +
          offsetHorizontal +
          unit * (floor(x / 2) * 3 + 1 + (x % 2) * 1.5),
        heightScreen
      )
      ctx.stroke()
      ctx.closePath()
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'

    for (let y = 0; y < heightMap * 2; y++) {
      ctx.beginPath()
      ctx.moveTo(0, marginVertical + offsetVertical + heightRow * (y + 1))
      ctx.lineTo(
        widthScreen,
        marginVertical + offsetVertical + heightRow * (y + 1)
      )
      ctx.stroke()
      ctx.closePath()
    }

    type Point = {
      x: number
      y: number
    }

    type KeyPoint = Point & {
      radialPoints: Point[]
    }

    const generateMatrix = (
      widthMap: number,
      heightMap: number,
      unit: number,
      heightRow: number,
      marginHorizontal: number,
      marginVertical: number
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

    const matrix: KeyPoint[][] = generateMatrix(
      widthMap,
      heightMap,
      unit,
      heightRow,
      marginHorizontal,
      marginVertical
    )

    matrix.forEach((row) => {
      // const radius = unit * 0.9
      const radius = heightRow

      row.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(p.x, p.y, 10, 0, 2 * Math.PI)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(p.x, p.y, heightRow, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(p.x, p.y, unit, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.stroke()
        ctx.closePath()

        // First hex at size unit
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.beginPath()
        ctx.moveTo(p.radialPoints[5].x * unit, p.radialPoints[5].y * unit)
        p.radialPoints.forEach((rp) => {
          ctx.lineTo(rp.x * unit, rp.y * unit)
        })
        // ctx.strokeStyle = 'rgba(255, 0, 0, 1)'
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.lineWidth = 3
        ctx.stroke()
        // ctx.fillStyle = `rgba(255, 0, 0, ${random() * 0.1})`
        ctx.fillStyle = `rgba(255, 0, 0, 0.05)`
        ctx.fill()
        ctx.closePath()
        ctx.restore()

        // Second hex at size radius
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.beginPath()
        ctx.moveTo(p.radialPoints[5].x * radius, p.radialPoints[5].y * radius)
        p.radialPoints.forEach((rp) => {
          ctx.lineTo(rp.x * radius, rp.y * radius)
        })
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.75)'
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.fillStyle = `rgba(255, 0, 0, ${random() * 0.25})`
        ctx.fill()
        ctx.closePath()
        ctx.restore()

        // Hex spokes
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.beginPath()
        p.radialPoints.forEach((rp) => {
          ctx.moveTo(rp.x * unit, rp.y * unit)
          ctx.lineTo(rp.x * radius, rp.y * radius)
        })
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.restore()
        ctx.closePath()
      })
    })
  }

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    createMap()
  }

  const initialize = () => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
  }

  const deinitialize = () => {
    window.removeEventListener('resize', resizeCanvas)
  }

  useEffect(() => {
    initialize()

    return deinitialize
  }, [])

  return <div />
}
