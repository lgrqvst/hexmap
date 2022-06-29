import { useEffect } from 'react'
import './App.css'

import { canvas, createMap } from './canvas'

const widthMap = 5
const heightMap = 3

export const App = () => {
  const resizeCanvas = () => {
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    createMap(widthMap, heightMap)
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
