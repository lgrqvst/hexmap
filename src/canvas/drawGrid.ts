import { KeyPoint } from '../types'

const { random } = Math

export const drawGrid = (
  matrix: KeyPoint[][],
  ctx: CanvasRenderingContext2D,
  heightRow: number,
  unit: number
) => {
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