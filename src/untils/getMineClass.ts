
import type { MineBlock } from '~/types'

export default function getMineClass(items: MineBlock) {
  return `${items.open ? '' : 'closed'}${items.boom ? ' boom' : ''}${items.flaged ? ' flaged' : ''}`
}
