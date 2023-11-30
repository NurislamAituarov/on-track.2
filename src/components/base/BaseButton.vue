<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  type: 'neutral' | 'danger' | 'primary' | 'success' | 'warning'
}
const props = defineProps<Props>()

const typeClasses = {
  neutral: 'bg-gray-100 enabled:hover:bg-gray-200',
  danger: 'bg-red-500 enabled:hover:bg-red-600 text-white',
  primary: 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
  success: 'bg-green-500 enabled:hover:bg-green-600 text-white',
  warning: 'bg-yellow-500 enabled:hover:bg-yellow-600 text-white'
}

const classes = [
  typeClasses[props.type],
  'rounded p-3 disabled:cursor:not-allowed disabled:opacity-50'
]
</script>
