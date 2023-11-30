import { computed, ref } from 'vue'
import { generateActivitySelectOptions, getTotalActivitySeconds, id } from '@/lib/helper'
import { resetTimelineItemActivities, timelineItems } from './timeline-items'
import type { IActivitiesItem } from '@/types'

export const activities = ref<IActivitiesItem[]>([])
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete)
)

export function createActivityItem(name: string) {
  activities.value.push({
    id: id(),
    name,
    secondsToComplete: 0
  })
}

export function deleteActivityItem(id: string) {
  resetTimelineItemActivities(id)

  const activityItemId = activities.value.findIndex((el) => el.id === id)
  activities.value.splice(activityItemId, 1)
}

export function updateTimeActivity(activity: IActivitiesItem, value: number) {
  activity.secondsToComplete = value || 0
}

export function getTotalActivityProgress(activity: IActivitiesItem) {
  const activitySeconds = getTotalActivitySeconds(activity, timelineItems.value)
  const secondsToComplete = activity.secondsToComplete ? activity.secondsToComplete : 0

  return ((activitySeconds * 100) / secondsToComplete).toFixed()
}

export function calculateCompletionPercentage(totalTrackedSeconds: number) {
  const percentage = Math.floor((totalTrackedSeconds * 100) / totalActivitySecondsToComplete.value)
  // if (Number.isNaN(percentage)) return 0;

  return percentage
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete ?? 0)
    .reduce((total, seconds) => total + seconds, 0)
})
