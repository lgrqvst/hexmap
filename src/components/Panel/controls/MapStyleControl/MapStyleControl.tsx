import React from 'react'
import styled from 'styled-components'
import { Action, isMapStyle, MapStyle, setMapStyle } from '../../../../reducer'

type Props = {
  mapStyle: MapStyle
  dispatch: React.Dispatch<Action>
}

export const MapStyleControl = ({ mapStyle, dispatch }: Props) => {
  const setStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isMapStyle(e.target.value)) return

    dispatch(setMapStyle(e.target.value))
  }

  return (
    <Control>
      <ul>
        <li>
          <label htmlFor='radioButtonSector'>
            <input
              type='checkbox'
              onChange={setStyle}
              value='Sector'
              id='radioButtonSector'
              checked={mapStyle === 'Sector'}
            />
            <span>Sector</span>
          </label>
        </li>
        <li>
          <label htmlFor='radioButtonWilderness'>
            <input
              type='checkbox'
              onChange={setStyle}
              value='Wilderness'
              id='radioButtonWilderness'
              checked={mapStyle === 'Wilderness'}
            />
            <span>Wilderness</span>
          </label>
        </li>
      </ul>
    </Control>
  )
}

const Control = styled.div`
  ul {
    display: flex;
  }

  li {
    width: 50%;
    text-align: center;
  }

  input {
    display: none;
  }

  span {
    display: block;
    padding: 5px;
    border: 1px solid white;
  }

  input:checked ~ span {
    background: white;
    color: black;
  }
`
