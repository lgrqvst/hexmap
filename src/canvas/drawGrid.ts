import { State } from '../reducer'
import { KeyPoint } from '../types'

const { random } = Math

export const drawGrid = (
  state: State,
  ctx: CanvasRenderingContext2D,
  matrix: KeyPoint[][]
) => {
  matrix.forEach((row) => {
    const { unit, radiusFactor } = state
    const radius = unit * radiusFactor

    row.forEach((p) => {
      // // Center dot
      // ctx.beginPath()
      // ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI)
      // ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      // ctx.fill()
      // ctx.closePath()

      // // Center small circle
      // ctx.beginPath()
      // ctx.arc(p.x, p.y, 10, 0, 2 * Math.PI)
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      // ctx.stroke()
      // ctx.closePath()

      // // heightRow circle
      // ctx.beginPath()
      // ctx.arc(p.x, p.y, heightRow, 0, Math.PI * 2)
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      // ctx.stroke()
      // ctx.closePath()

      // // unit circle
      // ctx.beginPath()
      // ctx.arc(p.x, p.y, unit, 0, Math.PI * 2)
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
      // ctx.stroke()
      // ctx.closePath()

      // // First hex at size unit
      // ctx.save()
      // ctx.translate(p.x, p.y)
      // ctx.beginPath()
      // ctx.moveTo(p.radialPoints[5].x * unit, p.radialPoints[5].y * unit)
      // p.radialPoints.forEach((rp) => {
      //   ctx.lineTo(rp.x * unit, rp.y * unit)
      // })
      // // ctx.strokeStyle = 'rgba(255, 0, 0, 1)'
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
      // ctx.lineWidth = 3
      // ctx.stroke()
      // // ctx.fillStyle = `rgba(255, 0, 0, ${random() * 0.1})`
      // ctx.fillStyle = `rgba(255, 0, 0, 0.05)`
      // ctx.fill()
      // ctx.closePath()
      // ctx.restore()

      // Second hex at size radius
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.beginPath()
      ctx.moveTo(p.radialPoints[5].x * radius, p.radialPoints[5].y * radius)
      p.radialPoints.forEach((rp) => {
        ctx.lineTo(rp.x * radius, rp.y * radius)
      })
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.fillStyle = `rgba(255, 0, 0, 0.05)`
      ctx.fill()
      ctx.closePath()
      ctx.restore()

      // // Hex spokes
      // ctx.save()
      // ctx.translate(p.x, p.y)
      // ctx.beginPath()
      // p.radialPoints.forEach((rp) => {
      //   ctx.moveTo(rp.x * unit, rp.y * unit)
      //   ctx.lineTo(rp.x * radius, rp.y * radius)
      // })
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
      // ctx.lineWidth = 3
      // ctx.stroke()
      // ctx.restore()
      // ctx.closePath()
    })
  })
}
