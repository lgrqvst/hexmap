import styled from 'styled-components'

export const Header = () => {
  return (
    <HeaderStyled>
      {/* TODO: Come up with a better name later :) */}
      <h1>Hexmap Generator</h1>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: absolute;
  top: 0;
  left: 0;
`
