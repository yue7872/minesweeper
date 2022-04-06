<template>
  <button
    v-for="(items,i) in block"
    :key="i"
    class="button"
    :class="getMineClass(items)"
    :disabled="permission.disabled ? true : false"
    @click="btnClick(items,state,permission)"
    @click.right="setFlag(items,state,permission)"
  >
    {{ getBlockContext(items,permission) }}
  </button>
</template>

<script>
import getMineClass from '~/untils/getMineClass'
import getBlockContext from '~/untils/getBlockContext'
import btnClick from '~/untils/btnClick'
import setFlag from '~/untils/setFlag'
export default {
  props: {
    block: {
      type: Array,
      default: () => [],
    },
    state: {
      type: Array,
      default: () => [],
    },
    permission: {
      type: Object,
      default: () => ({
        disabled: false,
        dev: false,
      }),
    },
  },
  methods: {
    getMineClass,
    getBlockContext,
    btnClick,
    setFlag,
  },
}
</script>

<style>

</style>
