import { Action, toggleInversion } from '../../../../reducer'

type Props = {
  isInverted: boolean
  dispatch: React.Dispatch<Action>
}

export const InversionControl = ({ isInverted, dispatch }: Props) => {
  const changeHandler = (e: React.ChangeEvent) => {
    dispatch(toggleInversion())
  }

  return (
    <div>
      <label htmlFor='checkboxIsInverted'>
        <input
          type='checkbox'
          name='isInverted'
          id='checkboxIsInverted'
          checked={isInverted}
          onChange={changeHandler}
        />
        Invert hex position
      </label>
    </div>
  )
}
