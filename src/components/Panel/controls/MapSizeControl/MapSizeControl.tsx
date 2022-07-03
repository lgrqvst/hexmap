import { Action, Dimensions, updateMapSize } from '../../../../reducer'

type Props = {
  mapSize: Dimensions
  dispatch: React.Dispatch<Action>
}

export const MapSizeControl = ({ mapSize, dispatch }: Props) => {
  const updateMapSizeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    dispatch(updateMapSize({ ...mapSize, width: newValue < 1 ? 1 : newValue }))
  }

  const updateMapSizeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    dispatch(updateMapSize({ ...mapSize, height: newValue < 1 ? 1 : newValue }))
  }

  return (
    <div>
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
    </div>
  )
}
