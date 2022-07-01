import { State } from '../reducer'

const { floor } = Math

export const drawGuides = (ctx: CanvasRenderingContext2D, state: State) => {
  const { mapSize, screenSize, margins, usableSize, offsets, unit, rowHeight } =
    state

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.strokeRect(
    margins.horizontal,
    margins.vertical,
    usableSize.width,
    usableSize.height
  )

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'

  for (let x = 0; x < mapSize.width; x++) {
    ctx.beginPath()
    ctx.moveTo(
      margins.horizontal +
        offsets.horizontal +
        unit * (floor(x / 2) * 3 + 1 + (x % 2) * 1.5),
      0
    )
    ctx.lineTo(
      margins.horizontal +
        offsets.horizontal +
        unit * (floor(x / 2) * 3 + 1 + (x % 2) * 1.5),
      screenSize.height
    )
    ctx.stroke()
    ctx.closePath()
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'

  for (let y = 0; y < mapSize.height * 2; y++) {
    ctx.beginPath()
    ctx.moveTo(0, margins.vertical + offsets.vertical + rowHeight * (y + 1))
    ctx.lineTo(
      screenSize.width,
      margins.vertical + offsets.vertical + rowHeight * (y + 1)
    )
    ctx.stroke()
    ctx.closePath()
  }
}
