<script setup lang="ts">
import { onMounted, ref } from 'vue';

import SambaRequests from '../services/samba-requests';

const requests = new SambaRequests();

const users: any = ref([]);

const fetchUsers = async () => {
  users.value = await requests.get({ path: 'users' });
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <h1>Client responses</h1>
  <div>
  <va-card
    v-for="user in users"
    :key="user.id"
    stripe
    stripe-color="primary"
    style="margin: 8px 0;"
  >
    <va-card-title>
      {{ user.name }}
    </va-card-title>
    <va-card-content>
      {{ user.company.bs }}
      {{ user.company.bs }}
      {{ user.company.bs }}
      {{ user.company.bs }}
      {{ user.company.bs }}
      {{ user.company.bs }}
    </va-card-content>
  </va-card>
  </div>
</template>
