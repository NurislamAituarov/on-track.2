<template>
  <header class="header bg-white border-b p-4">
    <THeLogo @click="$emit('go-to-timeline')" />

    <TheHeaderProgress @click="$emit('go-to-progress')" />
  </header>
</template>

<script lang="ts" setup>
import THeLogo from './TheHeaderLogo.vue'
import TheHeaderProgress from './TheHeaderProgress.vue'

defineEmits(['go-to-timeline', 'go-to-progress'])
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__logo {
  display: block;
  height: 36px;
  width: 134px;
}
</style>
