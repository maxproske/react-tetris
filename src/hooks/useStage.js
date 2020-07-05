import { useState, useEffect } from 'react'

import { createStage } from '../gameHelpers'

export const useStage = (player, resetPlayer) => {
  // Set initial stage
  const [stage, setStage] = useState(createStage())
  const [rowsCleared, setRowsCleared] = useState(0)

  useEffect(() => {
    setRowsCleared(0)

    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          // Should be swept away from the stage
          setRowsCleared((prev) => prev + 1)
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']))
          return ack
        }
        ack.push(row)
        return ack
      }, [])

    const updateStage = (prevStage) => {
      // Clear previous render
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      )

      // Draw next render
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          // Check which cells are occupied
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              player.collided ? 'merged' : 'clear',
            ]
          }
        })
      })

      console.log('collided', player.collided)

      if (player.collided) {
        resetPlayer()
        return sweepRows(newStage)
      }

      return newStage
    }

    // Will infinite loop unless we invoke useCallback
    setStage((prev) => updateStage(prev))
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ])

  return [stage, setStage, rowsCleared]
}
