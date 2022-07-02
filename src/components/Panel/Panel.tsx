import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Action, State, updateMapSize } from '../../reducer'

type Props = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Panel = ({ state, dispatch }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const { mapSize } = state

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  const updateMapSizeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateMapSize({ ...mapSize, width: Number(e.target.value) }))
  }

  const updateMapSizeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateMapSize({ ...mapSize, height: Number(e.target.value) }))
  }

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      toggle()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [])

  return (
    <>
      <Toggle>
        <button onClick={toggle}>Settings</button>
      </Toggle>
      {isOpen && (
        <PanelStyled>
          <PanelInner>
            <h2>Style</h2>
            <ul>
              <li>Sector</li>
              <li>Wilderness</li>
            </ul>
            <h2>Size</h2>
            <ul>
              <li>Width</li>
              <input
                type='number'
                value={mapSize.width}
                onChange={updateMapSizeWidth}
              />
              <li>Height</li>
              <input
                type='number'
                value={mapSize.height}
                onChange={updateMapSizeHeight}
              />
            </ul>
          </PanelInner>
        </PanelStyled>
      )}
    </>
  )
}

const PanelStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 90vw;
  max-width: 500px;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
`

const PanelInner = styled.div`
  padding: 25px;
`

const Toggle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`
