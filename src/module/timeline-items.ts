import { generateTimelineItems } from '@/lib/helper'
import { computed, ref, watchEffect, type Ref } from 'vue'
import { now } from './time'
import { MILlISECONDS_IN_SECONDS } from '@/lib/constants'
import type { IActivitiesItem, THourItem } from '@/types'

export const timelineItems = ref(generateTimelineItems())

export function updateTimelineItem(timelineItem: THourItem, fields: THourItem) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(id: string) {
  console.log(timelineItems.value)
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === id) {
      updateTimelineItem(timelineItem, {
        ...timelineItem,
        activitySeconds:
          timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
        activityId: null
      })
    }
  })
}

export function selectActivity(timelineItem: THourItem, activityId: number) {
  timelineItem.activityId = activityId
}

export function calculateTrackedActivitySeconds(activity: IActivitiesItem) {
  return filterTimelineItemsByActivity(timelineItems.value, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

function filterTimelineItemsByActivity(timelineItems: THourItem[], activity: IActivitiesItem) {
  return timelineItems.filter(({ activityId }) => activityId === activity.id)
}

export const activeTimelineItem = computed(() =>
  timelineItems.value.find((timelineItem) => timelineItem.isActiveTimer)
)

// TIMELINE ITEM TIMER //

export const timelineItemTimer: Ref<number | null> = ref(null)

export function startTimelineItemTimer(timelineItem: THourItem) {
  updateTimelineItem(timelineItem, {
    ...timelineItem,
    isActiveTimer: true
  })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      ...timelineItem,
      activitySeconds: timelineItem.activitySeconds + 1
    })
  }, MILlISECONDS_IN_SECONDS)
}

export function stopTimelineItemTimer(timelineItem: THourItem) {
  updateTimelineItem(timelineItem, {
    ...timelineItem,
    isActiveTimer: false
  })

  timelineItemTimer.value && clearInterval(timelineItemTimer.value)
  timelineItemTimer.value = null
}

export function resetTimelineItemTimer(timelineItem: THourItem) {
  updateTimelineItem(timelineItem, {
    ...timelineItem,
    activitySeconds: 0
  })

  stopTimelineItemTimer(timelineItem)
}

watchEffect(() => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== now.value.getHours()) {
    stopTimelineItemTimer(activeTimelineItem.value)
  }
})
