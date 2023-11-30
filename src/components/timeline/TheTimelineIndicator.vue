<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${calculateTopOffset}px` }"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { calculateSecondsSinceMidnightInPercentage } from '@/module/time'
import type { THourItem } from '@/types'

interface Props {
  timelineItems: THourItem[]
}
defineProps<Props>()

const indicatorRef = ref()

const calculateTopOffset = computed(() => {
  return (calculateSecondsSinceMidnightInPercentage.value * getTimelineHeight()) / 100
})

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}
</script>
