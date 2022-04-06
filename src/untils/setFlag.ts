
import checkWin from './checkWin'
import type { MineBlock } from '~/types'
export default function setFlag(items: MineBlock, state: MineBlock[][], permission: any) {
  items.open = !items.open
  items.flaged = !items.flaged
  checkWin(state, permission)
}
