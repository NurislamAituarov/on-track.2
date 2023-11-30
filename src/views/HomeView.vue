<template>
  <div class="wrapper flex flex-col min-h-screen">
    <TheHeader @go-to-timeline="goTo('timeline')" @go-to-progress="goTo('progress')" />
    <TheMain />
    <TheNav @open-page="goTo" :nav-items="navItems" :current-page="currentPage" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue'

import TheMain from '@/components/main/TheMain.vue'
import TheNav from '@/components/nav/TheNav.vue'
import TheHeader from '@/components/header/TheHeader.vue'

import { normalizeHash } from '@/lib/helper'
import { PAGE_ACTIVITIES, navItems, PAGE_TIMELINE, PAGE_AUTHORIZATION } from '@/lib/constants'
import { useRouter } from 'vue-router'
//////////////////////////////////////////////////////////////////
const router = useRouter()

onMounted(() => {
  const user = localStorage.getItem('user')
  if (!user) router.push({ path: PAGE_AUTHORIZATION })
})

// взять из url имя странаицы
const currentPage = ref(normalizeHash(navItems))
const logoTime = ref('')
// Открыть новую страницу
function goTo(page: string) {
  currentPage.value = page

  if (page === PAGE_TIMELINE) {
    logoTime.value = 'scroll'
    setTimeout(() => {
      logoTime.value = ''
    }, 100)
  }

  if (page === PAGE_ACTIVITIES) {
    document.body.scrollIntoView()
  }
}

provide('logo-time', logoTime)
provide('current-page', currentPage)
</script>

<style scoped></style>
