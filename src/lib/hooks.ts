import { computed } from 'vue'
import { getTotalActivitySeconds } from './helper'
import { calculateTrackedActivitySeconds, timelineItems } from '@/module/timeline-items'
import { calculateCompletionPercentage, trackedActivities } from '@/module/activities'
import type { IActivitiesItem } from '@/types'

export function useProgress(activity: IActivitiesItem) {
  return computed(() => {
    const activitySeconds = getTotalActivitySeconds(activity, timelineItems.value)
    const secondsToComplete = activity.secondsToComplete ? activity.secondsToComplete : 0

    return +((activitySeconds * 100) / secondsToComplete).toFixed()
  })
}

export function useTotalProgress() {
  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(calculateTrackedActivitySeconds(activity), activity.secondsToComplete ?? 0)
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  return percentage
}
