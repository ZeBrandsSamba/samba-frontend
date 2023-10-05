<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div style="display: flex; ">
    <Sidebar v-if="!$route.meta.fullPage" />
    <span style="margin: 12px;">
      <router-view />
    </span>
  </div>
</template>
