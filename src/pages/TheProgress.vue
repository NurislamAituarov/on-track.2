<template>
  <ul v-if="trackedActivities?.length" class="divide-y">
    <ProgressItem v-for="item of trackedActivities" :key="item.id" :activity="item" />
  </ul>
  <TheProgressEmptyState v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProgressItem from '@/components/progress/ProgressItem.vue'
import TheProgressEmptyState from '@/components/progress/TheProgressEmptyState.vue'
import { activities } from '@/module/activities'

const trackedActivities = computed(() => {
  return activities.value?.filter((el) => el.secondsToComplete)
})
</script>
