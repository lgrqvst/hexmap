const { floor } = Math

export const drawGuides = (
  ctx: CanvasRenderingContext2D,
  marginHorizontal: number,
  marginVertical: number,
  widthUsable: number,
  heightUsable: number,
  widthMap: number,
  heightMap: number,
  widthScreen: number,
  heightScreen: number,
  offsetHorizontal: number,
  offsetVertical: number,
  heightRow: number,
  unit: number
) => {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.strokeRect(marginHorizontal, marginVertical, widthUsable, heightUsable)

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
}
