import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Action, State } from '../../reducer'
import { InversionControl } from './controls/InversionControl'
import { MapSizeControl } from './controls/MapSizeControl'
import { MapStyleControl } from './controls/MapStyleControl'

type Props = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Panel = ({ state, dispatch }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { mapStyle, mapSize, isInverted } = state

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.code === 'Escape') toggle()
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
            <MapStyleControl mapStyle={mapStyle} dispatch={dispatch} />
            <MapSizeControl mapSize={mapSize} dispatch={dispatch} />
            <InversionControl isInverted={isInverted} dispatch={dispatch} />
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
