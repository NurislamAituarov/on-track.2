<template>
  <form @submit.prevent="submit" class="sticky bottom-[67px] flex gap-2 border-t bg-white p-4">
    <input
      ref="refValue"
      v-model.trim="nameActivity"
      type="text"
      class="w-full rounded border px-4 text-xl focus:outline-none focus:border-2 focus:border-purple-300"
      placeholder="Activity name"
    />
    <BaseButton type="primary">
      <BaseIcon name="Plus" class="h-8" />
    </BaseButton>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { createActivityItem } from '@/module/activities'
import BaseIcon from '../base/BaseIcon.vue'

const nameActivity = ref('')
const refValue = ref()

async function submit() {
  if (!nameActivity.value) return refValue.value.focus()
  await createActivityItem(nameActivity.value)

  document.body.scrollIntoView({
    block: 'end',
    behavior: 'smooth'
  })

  nameActivity.value = ''
}
</script>
