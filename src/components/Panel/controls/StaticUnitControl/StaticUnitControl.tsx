import { Action, setStaticUnitSize, useStaticUnits } from '../../../../reducer'

type Props = {
  isStaticUnits: boolean
  staticUnitSize: number
  dispatch: React.Dispatch<Action>
}

export const StaticUnitControl = ({
  isStaticUnits,
  staticUnitSize,
  dispatch
}: Props) => {
  const useStaticUnitsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(useStaticUnits(e.target.checked))
  }

  const setStaticUnitSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStaticUnitSize(Number(e.target.value)))
  }

  return (
    <div>
      <h2>Static Units</h2>
      <label htmlFor='checkboxIsStaticUnits'>
        <input
          type='checkbox'
          name='isStaticUnits'
          id='checkboxIsStaticUnits'
          checked={isStaticUnits}
          onChange={useStaticUnitsHandler}
        />
        Use static hex size
      </label>

      {isStaticUnits && (
        <div>
          <input
            type='number'
            value={staticUnitSize}
            onChange={setStaticUnitSizeHandler}
          />
        </div>
      )}
    </div>
  )
}
