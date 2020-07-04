import { useState } from 'react'

import { createStage } from '../gameHelpers'

export const useStage = () => {
  // Set initial stage
  const [stage, setStage] = useState(createStage())

  return [stage, setStage]
}
