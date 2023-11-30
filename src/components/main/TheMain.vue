<template>
  <main class="main flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[page ?? PAGE_TIMELINE]" />
    </KeepAlive>
  </main>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import TheProgress from '@/pages/TheProgress.vue'
import TheTimeline from '@/pages/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities.vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '../../lib/constants'

const routes: Record<string, any> = {
  [PAGE_TIMELINE]: TheTimeline,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress
}

const page = inject<string>('current-page')
</script>
