<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton
      type="danger"
      @click="resetTimelineItemTimer(timelineItem)"
      :disabled="!timelineItem.activitySeconds"
    >
      <BaseIcon name="ArrowPath" class="h-8" />
    </BaseButton>
    <div class="flex w-full flex-grow items-center bg-gray-100 px-2 py-2.5 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItemTimer && timelineItem.hour === now.getHours()"
      type="warning"
      @click="stopTimelineItemTimer(timelineItem)"
    >
      <BaseIcon name="Pause" class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      type="success"
      @click="startTimelineItemTimer(timelineItem)"
      :disabled="isStartButtonDisabled"
    >
      <BaseIcon name="Play" class="h-8" />
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseIcon from '../base/BaseIcon.vue'
import { formatSeconds } from '@/lib/helper'
import { now } from '@/module/time'
import {
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer,
  timelineItemTimer
} from '@/module/timeline-items'
import type { THourItem } from '@/types'

interface Props {
  timelineItem: THourItem
}
const props = defineProps<Props>()

const isStartButtonDisabled = computed(() => {
  return props.timelineItem.hour !== now.value.getHours()
})
</script>
