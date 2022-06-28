export type Point = {
  x: number
  y: number
}

export type KeyPoint = Point & {
  radialPoints: Point[]
}
