
import type { MineBlock } from '~/types'
export default function checkWin(state: MineBlock[][], permission: any) {
  const winState = state.every(line => line.every((block) => {
    if (block.open || block.flaged) {
      if (block.boom)
        return block.flaged === true
      return block.flaged === false
    }
    return false
  }))
  if (winState) {
    alert('win!')
    permission.disabled = true
  }
}
