import type { MineBlock } from '~/types'
import { HEIGHT, WIDTH } from '~/types'

export default function expendZero(items: MineBlock, state: MineBlock[][]) {
  if (items.mineNum !== 0)
    return
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  items.open = true
  direction.forEach(([dx, dy]) => {
    const x2 = items.x + dx
    const y2 = items.y + dy
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return
    if (state[x2][y2].open === false) {
      state[x2][y2].open = true
      expendZero(state[x2][y2], state)
    }
  })
}
