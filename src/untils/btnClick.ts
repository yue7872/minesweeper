
import expendZero from './expendZero'
import checkWin from './checkWin'
import type { MineBlock } from '~/types'
export default function btnClick(items: MineBlock, state: MineBlock[][], permission: any) {
  if (items.flaged)
    return
  if (items.boom) {
    state.forEach((line) => {
      line.forEach((block) => {
        if (block.boom) {
          permission.disabled = true
          block.open = true
        }
      })
    })
    alert('boom!')
    return
  }
  items.open = true
  expendZero(items, state)
  checkWin(state, permission)
}
