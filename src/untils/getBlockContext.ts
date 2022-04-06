
import type { MineBlock } from '~/types'

export default function getBlockContext(items: MineBlock, permission: any) {
  if ((permission.dev || items.open)) {
    if (items.flaged)
      return '🚩'
    return items.boom ? 'X' : items.mineNum === 0 ? '' : items.mineNum
  }
}
