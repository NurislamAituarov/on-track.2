<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" ref="refContainerActivities" class="divide-y grow">
      <ActivityItem v-for="activity of activities" :key="activity.id" :activity="activity" />
    </ul>

    <TheActivitiesEmptyState v-else />

    <TheActivityForm />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ActivityItem from '@/components/activity/ActivityItem.vue'
import TheActivityForm from '@/components/activity/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/activity/TheActivitiesEmptyState.vue'
import { activities } from '@/module/activities'

const refContainerActivities = ref()
</script>
