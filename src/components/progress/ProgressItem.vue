<template>
  <li class="flex flex-col gap-1 p-4 text-start">
    <div class="truncate text-xl">{{ activity.name }}</div>

    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="['transition-all', getProgressColorClass(progress)]"
        :style="`width: ${Math.min(progress, 100)}%`"
      ></div>
    </div>

    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span>
      <span
        >{{ formatSeconds(getTotalActivitySeconds(activity, timelineItems)) }}
        /
        {{
          activity.secondsToComplete ? formatSeconds(activity.secondsToComplete) : formatSeconds(0)
        }}</span
      >
    </div>
  </li>
</template>

<script setup lang="ts">
import { formatSeconds, getTotalActivitySeconds } from '@/lib/helper'
import { getProgressColorClass } from '@/lib/helper'
import { timelineItems } from '@/module/timeline-items'
import { useProgress } from '@/lib/hooks'
import type { IActivitiesItem } from '@/types'

interface Props {
  activity: IActivitiesItem
}

const props = defineProps<Props>()

const progress = useProgress(props.activity)
</script>
