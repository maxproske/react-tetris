import React, { useState } from 'react'
import styled from 'styled-components'

// Components
import { Stage } from './Stage'
import { Display } from './Display'
import { StartButton } from './StartButton'

// Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

import bgImage from '../img/bg.png'
import { createStage, checkCollision } from '../gameHelpers'

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

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer, playerRotate)

  console.log('re-render')

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage())
    setDropTime(1000) // 1 second
    resetPlayer()
    setGameOver(false)
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!')
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Down
      if (keyCode === 40) {
        setDropTime(1000)
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null)
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
      // Up
      else if (keyCode === 38) {
        playerRotate(stage, 1)
      }
    }
  }

  useInterval(() => {
    drop()
  }, dropTime)

  // Note: Without role="button", you would have to click the stage for inputs to register
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={(e) => keyUp(e)}
    >
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
