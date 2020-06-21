import React from 'react'
import styled from 'styled-components'

import { TETROMINOS } from '../tetrominos'

const StyledCell = styled.div`
  width: auto;
  background: rgba(${({ color }) => color}, 0.8);
  border: ${({ type }) => (type ? '4px solid' : 'none')};
  border-bottom-color: rgba(${({ color }) => color}, 0.1);
  border-right-color: rgba(${({ color }) => color}, 1);
  border-top-color: rgba(${({ color }) => color}, 1);
  border-left-color: rgba(${({ color }) => color}, 0.3);
`

export const Cell = ({ type }) => {
  return (
    <StyledCell type={'L'} color={TETROMINOS['L'].color}>
      cell
    </StyledCell>
  )
}
