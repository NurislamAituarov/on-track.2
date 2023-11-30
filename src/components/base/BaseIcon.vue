<template>
  <component :is="icons[name]" />
</template>

<script setup lang="ts">
import {
  ArrowPathIcon as ArrowPath,
  PauseIcon as Pause,
  PlayIcon as Play,
  TrashIcon as Trash,
  XMarkIcon as XMark,
  ChevronDownIcon as ChevronDown,
  PlusIcon as Plus,
  ClockIcon as Clock,
  ListBulletIcon as ListBullet,
  ChartBarIcon as ChartBar,
  EyeIcon as Eye,
  EyeSlashIcon as EyeSlash
} from '@heroicons/vue/24/outline'
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

interface Props {
  name: string
}

type TIcons = Record<string, FunctionalComponent<HTMLAttributes & VNodeProps>>

defineProps<Props>()

const icons: TIcons = {
  ArrowPath,
  Pause,
  Play,
  Trash,
  XMark,
  ChevronDown,
  Plus,
  Clock,
  ListBullet,
  ChartBar,
  Eye,
  EyeSlash
}
</script>
