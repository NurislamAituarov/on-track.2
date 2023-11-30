<template>
  <nav class="nav bg-white border-t">
    <ul class="flex items-center justify-around">
      <NavIcon
        v-for="item of navItems"
        :key="item.id"
        :href="`#${item.title}`"
        :class="{
          'bg-gray-200': currentPage === item.title
        }"
        @click="emit('open-page', item.title)"
      >
        <!-- <component :is="item.icon" class="w-6 h-6" /> -->
        <BaseIcon :name="item.icon" class="w-6 h-6" />
        {{ item.title }}</NavIcon
      >
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import BaseIcon from '../base/BaseIcon.vue'
import NavIcon from '@/components/nav/NavItem.vue'
import type { INavItems } from '@/types'

defineProps<{ navItems: INavItems[]; currentPage: string }>()
const emit = defineEmits(['open-page'])

onMounted(() => {
  // console.log("mounted", window.location.hash.substring(1));
})
</script>

<style scoped lang="scss">
.nav {
  position: sticky;
  bottom: 0;
  z-index: 10;
  padding: 0;
}
</style>
