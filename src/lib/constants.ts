export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'
export const PAGE_AUTHORIZATION = 'authorization'
export const HOURS_IN_DAY = 24
export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_HOUR = 3600
export const SECONDS_IN_DAY = 86400
export const MILlISECONDS_IN_SECONDS = 1000

import type { INavItems, IPeriodSelectItem } from '@/types'
// import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';
import { generatePeriodSelectOptions } from './helper'

export const navItems: INavItems[] = [
  { title: PAGE_TIMELINE, id: 1, icon: 'Clock' },
  { title: PAGE_ACTIVITIES, id: 2, icon: 'ListBullet' },
  { title: PAGE_PROGRESS, id: 3, icon: 'ChartBar' }
]

const periodsInMinutes = [
  15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
]

export const periodSelectOptions: IPeriodSelectItem[] =
  generatePeriodSelectOptions(periodsInMinutes)
