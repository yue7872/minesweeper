<script setup lang="ts">
interface MineBlock {
  x: number
  y: number
  boom?: boolean
}

const WIDTH = 5
const HEIGHT = 5

function btnClick(items: MineBlock) {
  console.log(items)
}

function generateMine(x: number, y: number) {
  const allMine: MineBlock[][] = Array.from(Array(x), () => [])
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const block: MineBlock = {
        x: i,
        y: j,
        boom: Math.random() < 0.1,
      }
      allMine[i].push(block)
    }
  }
  return allMine
}

const allMine = generateMine(WIDTH, HEIGHT)

</script>

<template>
  <div>
    <div
      v-for="(line,index) in allMine"
      :key="index"
      class="box"
    >
      <button
        v-for="(items,i) in allMine[index]"
        :key="i"
        class="button"
        @click="btnClick(items)"
      >
        {{ items.boom ? 'X' : '' }}
      </button>
    </div>
  </div>
</template>
<style>
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
  border: 1px solid red;
  margin-left: -1px;
}
</style>
