<template>
  <div>
    <div
      v-for="(line,index) in state"
      :key="index"
      class="box"
    >
      <BlockBtn :block="line" :permission="permission" :state="state" />
    </div>
    <button class="bottombtn" @click="cheat()">
      cheat: {{ permission.dev ? 'on' : 'off' }}
    </button>
    <button class="bottombtn" @click="generateMine()">
      reset
    </button>
  </div>
</template>

<script setup lang="ts">
import type { MineBlock } from '../types'
import BlockBtn from '~/components/BlockBtn.vue'
import { HEIGHT, WIDTH } from '~/types'

const permission = reactive({
  disabled: false,
  dev: false,
})
const state: MineBlock[][] = reactive(
  Array.from({ length: WIDTH }, (_, x) => {
    return Array.from({ length: WIDTH }, (_, y): MineBlock => {
      return { x, y, mineNum: 0, open: false, boom: false, flaged: false }
    })
  }),
)

function cheat() {
  permission.dev = !permission.dev
}

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

function generateMine() {
  permission.disabled = false
  for (const line of state) {
    for (const block of line) {
      block.open = false
      block.mineNum = 0
      block.flaged = false
      block.boom = Math.random() < 0.1
    }
  }
  calculateNum()
}

generateMine()

window.oncontextmenu = function(e) {
  e.preventDefault()
}

</script>

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
.button.flaged {
  background: #003366;
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
