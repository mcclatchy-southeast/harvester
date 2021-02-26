import styled from 'styled-components'
import { copy as copyFont } from 'js/styles/fonts'
import { copy as copyColor } from 'js/styles/colors'

export const Container = styled.div`
  margin: 0 2rem;
  font-size: 18px;
  font-family: ${copyFont};
  color: ${copyColor};
`
