<template>
  <div v-if="activity.secondsToComplete" :class="classes">
    {{ seconds }}
    {{ false ? SECONDS_IN_MINUTE : '' }}
  </div>
</template>

<script lang="ts" setup>
import { SECONDS_IN_MINUTE } from '@/lib/constants'
import { formatSeconds } from '@/lib/helper'
import { getTotalActivitySeconds } from '@/lib/helper'
import { timelineItems } from '@/module/timeline-items'
import type { IActivitiesItem } from '@/types'
import { computed } from 'vue'

interface Props {
  activity: IActivitiesItem
}

const props = defineProps<Props>()

const secondsDiff = computed(() => {
  return props.activity.secondsToComplete
    ? getTotalActivitySeconds(props.activity, timelineItems.value) -
        props.activity.secondsToComplete
    : 0
})

const seconds = computed(() => {
  return `${sign.value}${formatSeconds(secondsDiff.value)}`
})

const sign = computed(() => {
  return secondsDiff.value >= 0 ? '+' : '-'
})

const classes = computed(() => [
  'flex items-center rounded px-2 font-mono text-xl',
  secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
])
</script>
