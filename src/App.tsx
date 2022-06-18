import { useEffect } from 'react'
import './App.css'
import { canvas, ctx } from './canvas'

const mapWidth = 20
const mapHeight = 10

export const App = () => {
  const createMap = () => {
    const fullWidth = window.innerWidth * 2
    const fullHeight = window.innerHeight * 2

    const margin = 50

    const width = fullWidth - margin * 2
    const height = fullHeight - margin * 2

    const unit =
      width / (Math.floor(mapWidth / 2) * 3 + 0.5 + (mapWidth % 2) * 2)
    const rowHeight = Math.abs(Math.cos(60) * unit)

    type Point = {
      x: number
      y: number
    }

    const generateMatrix = (): Point[][] => {
      let points: Point[][] = []

      const numRows = mapHeight * 2 + 2
      // const numCols = (Math.floor(mapWidth / 2) * 3 + (mapWidth % 2) * 2)

      for (let y = 0; y < numRows; y++) {
        points[y] = []

        // First row
        if (y === 0) {
          for (let x = 0; x < mapWidth; x++) {
            let point = {
              y: margin,
              x: (Math.floor(x / 2) * 3 + 0.5 + (x % 2)) * unit + margin
            }
            points[y].push(point)
          }
          continue
        }

        // Final row
        if (y === numRows - 1) {
          for (let x = 0; x < mapWidth; x++) {
            let point = {
              y: margin + rowHeight * (numRows - 1),
              x: (Math.floor(x / 2) * 3 + 2 + (x % 2)) * unit + margin
            }
            points[y].push(point)
          }
          continue
        }

        // Odd rows (y =  1, 3, etc.)
        if (y % 2 === 1) {
          for (let x = 0; x <= mapWidth; x++) {
            let point = {
              y: margin + rowHeight * y,
              x: (Math.floor(x / 2) * 3 + (x % 2) * 2) * unit + margin
            }
            points[y].push(point)
          }
        }

        // Even rows (y = 2, 4, etc.)
        if (y % 2 === 0) {
          for (let x = 0; x <= mapWidth; x++) {
            let point = {
              y: margin + rowHeight * y,
              x: (Math.floor(x / 2) * 3 + 0.5 + (x % 2)) * unit + margin
            }
            points[y].push(point)
          }
        }
      }

      return points
    }

    const matrix: Point[][] = generateMatrix()

    matrix.forEach((row, i) => {
      row.forEach((p, j) => {
        // ctx.beginPath()
        // ctx.arc(p.x, p.y, 8, 0, 2 * Math.PI)
        // ctx.fillStyle = 'white'
        // ctx.fill()
        // ctx.closePath()

        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1

        // Other rows
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            if (j < matrix[i].length - 1) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i][j + 1].x, matrix[i][j + 1].y)
              ctx.stroke()
              ctx.closePath()
            }

            // All rows except the second to last row
            if (i < matrix.length - 2) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i + 1][j].x, matrix[i + 1][j].y)
              ctx.stroke()
              ctx.closePath()
            }

            // Second to last row
            if (i === matrix.length - 2 && j !== 0) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i + 1][j - 1].x, matrix[i + 1][j - 1].y)
              ctx.stroke()
              ctx.closePath()
            }
          }

          if (j % 2 === 1) {
            // All rows except the second to last row
            if (i < matrix.length - 2) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i + 1][j].x, matrix[i + 1][j].y)
              ctx.stroke()
              ctx.closePath()
            }

            // Second to last row
            if (i === matrix.length - 2 && j !== 0) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i + 1][j - 1].x, matrix[i + 1][j - 1].y)
              ctx.stroke()
              ctx.closePath()
            }
          }
        }

        if (i % 2 === 1) {
          if (j % 2 === 0) {
            // All rows except the second to last row
            if (i < matrix.length - 2) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i + 1][j].x, matrix[i + 1][j].y)
              ctx.stroke()
              ctx.closePath()
            }
          }

          if (j % 2 === 1) {
            // All rows except the last row
            if (i < matrix.length - 1) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i][j + 1].x, matrix[i][j + 1].y)
              ctx.stroke()
              ctx.closePath()
            }

            // The last row
            if (i === matrix.length - 1) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i][j - 1].x, matrix[i][j - 1].y)
              ctx.stroke()
              ctx.closePath()
            }

            // All rows except the last row
            if (i < matrix.length - 1) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(matrix[i + 1][j].x, matrix[i + 1][j].y)
              ctx.stroke()
              ctx.closePath()
            }
          }
        }
      })
    })
  }

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
  }

  const initialize = () => {
    resizeCanvas()
    createMap()
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
