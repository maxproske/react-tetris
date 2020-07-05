export const STAGE_WIDTH = 12
export const STAGE_HEIGHT = 20

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  )

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // Check that we're on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // Check position we intend to move into is in bounds
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // Check the cell we intend to move into is set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true
        }
      }
    }
  }

  return false
}
