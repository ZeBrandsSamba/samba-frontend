<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const minimized = ref(false);
</script>

<template>
  <span>
    <va-sidebar :minimized="minimized">
      <va-sidebar-item>
        <router-link to="/dashboard">
          <va-sidebar-item-content>
            <va-icon name="dashboard" />
              <va-sidebar-item-title>
                Dashboard
              </va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>

      <va-sidebar-item>
        <router-link to="/responses">
          <va-sidebar-item-content>
            <va-icon name="book" />
              <va-sidebar-item-title>
                Responses
              </va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>

      <va-sidebar-item>
        <va-sidebar-item-content @click="minimized=!minimized">
          <va-icon :name="`${minimized ? 'arrow_forward' : 'arrow_back'}`" />
          <va-sidebar-item-title></va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </span>
</template>
