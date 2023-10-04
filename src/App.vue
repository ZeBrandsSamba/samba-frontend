<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div style="display: flex; ">
    <Sidebar />
    <span style="margin: 5px;">
      <router-view />
    </span>
  </div>
</template>
