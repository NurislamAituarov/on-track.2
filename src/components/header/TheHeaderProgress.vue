<template>
  <a :href="`#${PAGE_PROGRESS}`" class="text-sm">
    <div v-if="isNaN(percentage) || percentage > 100" class="flex items-center gap-2">
      <p>Day complete!</p>
      <CheckCircleIcon class="h-7 text-green-500" />
    </div>

    <div v-else class="flex items-center gap-2">
      <p>
        Progress: <span class="mono">{{ percentage }}%</span>
      </p>
      <div class="h-3 w-3 rounded-full" :class="getProgressColorClass(percentage)"></div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { PAGE_PROGRESS } from '@/lib/constants'
import { useTotalProgress } from '@/lib/hooks'
import { getProgressColorClass } from '@/lib/helper'

const percentage = useTotalProgress()
</script>
