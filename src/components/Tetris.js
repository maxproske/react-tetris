import React, { useState } from 'react'
import styled from 'styled-components'

// Components
import { Stage } from './Stage'
import { Display } from './Display'
import { StartButton } from './StartButton'

// Hooks
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

import bgImage from '../img/bg.png'
import { createStage } from '../gameHelpers'

const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`

const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`

export const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer] = usePlayer()
  const [stage, setStage] = useStage(player)

  console.log('re-render')

  const movePlayer = (dir) => {
    updatePlayerPos({ x: dir, y: 0 })
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage())
    resetPlayer()
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false })
  }

  const dropPlayer = () => {
    drop()
  }

  // Callback function for keyboard input
  const move = ({ keyCode }) => {
    console.log('KEY PRESS', keyCode)

    if (!gameOver) {
      // Left
      if (keyCode === 37) {
        movePlayer(-1)
      }
      // Right
      else if (keyCode === 39) {
        movePlayer(1)
      }
      // Down
      else if (keyCode === 40) {
        dropPlayer()
      }
    }
  }

  // Note: Without role="button", you would have to click the stage for inputs to register
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}
