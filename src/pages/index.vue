<script setup lang="ts">
interface MineBlock {
  x: number
  y: number
  boom?: boolean
  open?: boolean
  mineNum: number
}
const WIDTH = 10
const HEIGHT = 10

const permission = reactive({
  disabled: false,
  dev: false,
})
const state: MineBlock[][] = reactive(
  Array.from({ length: WIDTH }, (_, x) => {
    return Array.from({ length: WIDTH }, (_, y): MineBlock => {
      return { x, y, mineNum: 0, open: false, boom: false }
    })
  }),
)
function expendZero(items: MineBlock) {
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
      expendZero(state[x2][y2])
    }
  })
}
function getMineClass(items: MineBlock) {
  return items.open ? '' : 'closed'
}
function cheat() {
  permission.dev = !permission.dev
}
function generateMine() {
  permission.disabled = false
  for (const line of state) {
    for (const block of line) {
      block.open = false
      block.mineNum = 0
      block.boom = Math.random() < 0.1
    }
  }
  calculateNum()
}
function btnClick(items: MineBlock) {
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
  expendZero(items)
}

generateMine()

function calculateNum() {
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]
  for (const line of state) {
    for (const block of line) {
      direction.forEach(([dx, dy]) => {
        const x2 = block.x + dx
        const y2 = block.y + dy
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
          return
        if (state[x2][y2].boom)
          block.mineNum++
      })
    }
  }
}
</script>

<template>
  <div>
    <div
      v-for="(line,index) in state"
      :key="index"
      class="box"
    >
      <button
        v-for="(items,i) in line"
        :key="i"
        class="button"
        :class="getMineClass(items) + (items.boom ? ' boom' : '')"
        :disabled="permission.disabled ? true : false"
        @click="btnClick(items,state)"
      >
        {{ (permission.dev || items.open) ? items.boom ? 'X' : items.mineNum : '' }}
      </button>
    </div>
    <button class="bottombtn" @click="cheat()">
      cheat: {{ permission.dev ? 'on' : 'off' }}
    </button>
    <button class="bottombtn" @click="generateMine()">
      reset
    </button>
  </div>
</template>
<style>
.page {
  margin-bottom: 20px;
}
.box {
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -1px;
}

.button {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 1px;
  color: white;
  background: #669933;
}
.button.boom {
  background: #CC3333;
}
.button.closed {
  background: #003366;
}
.bottombtn {
  border-radius: 5px;
  margin: 20px auto;
  width: 30%;
  display: block;
  background: #00bcd4;
  height: 50px;
  color: white;
}

</style>
