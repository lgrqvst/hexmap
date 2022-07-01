import { useEffect, useReducer } from 'react'
import './App.css'

import { canvas, clearCanvas, createMap } from './canvas'
import { getInitialState, reducer, updateScreenSize } from './reducer'

export const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState())

  const resizeCanvas = () => {
    dispatch(updateScreenSize())
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
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

  useEffect(() => {
    createMap(state)

    return () => clearCanvas()
  }, [state])

  return <div />
}
