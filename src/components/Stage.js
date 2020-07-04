import React from 'react'
import styled from 'styled-components'

import { Cell } from './Cell'

const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${({ height }) => height},
    calc(25vw / ${({ width }) => width})
  );
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`

export const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row) => row.map((cell, i) => <Cell key={i} type={cell[0]} />))}
  </StyledStage>
)
