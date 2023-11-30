import { MILlISECONDS_IN_SECONDS, SECONDS_IN_DAY, SECONDS_IN_HOUR } from '@/lib/constants'
import { computed, ref } from 'vue'

export function today() {
  const today = new Date()
  // today.setHours(0, 0);
  return today
}

export function tomorrow() {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

export function isToday(date: Date) {
  return date.toDateString() === today().toDateString()
}

export const now = ref(today())

export const calculateSecondsSinceMidnightInPercentage = computed(() => {
  return (100 * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

const midnight = computed(() => {
  return new Date(now.value).setHours(0, 0, 0, 0)
})

const secondsSinceMidnight = computed(() => {
  return (now.value.getTime() - midnight.value) / MILlISECONDS_IN_SECONDS
})

// CURRENT DATE TIMER
let currentDateTimer: number
export function startCurrentDateTimer() {
  now.value = today()

  currentDateTimer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILlISECONDS_IN_SECONDS)
    // console.log('Timer');
  }, MILlISECONDS_IN_SECONDS)
}
export function stopCurrentDateTimer() {
  clearInterval(currentDateTimer)
}

export function endOfHour(date: Date) {
  const endOfHour = new Date(date)

  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILlISECONDS_IN_SECONDS)
  endOfHour.setMinutes(0, 0, 0)
  return endOfHour
}

export function toSeconds(milliseconds: number) {
  return Math.round(milliseconds / MILlISECONDS_IN_SECONDS)
}
