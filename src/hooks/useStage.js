import { useState, useEffect } from 'react'

import { createStage } from '../gameHelpers'

export const useStage = (player, resetPlayer) => {
  // Set initial stage
  const [stage, setStage] = useState(createStage())

  useEffect(() => {
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

      return newStage
    }

    // Will infinite loop unless we invoke useCallback
    setStage((prev) => updateStage(prev))
  }, [player])

  return [stage, setStage]
}
