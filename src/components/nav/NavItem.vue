<template>
  <li class="flex-1 border">
    <a v-bind="$attrs" class="flex flex-col items-center p-2 capitalize">
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
