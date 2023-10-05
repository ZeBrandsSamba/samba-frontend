<script setup lang="ts">
import { onMounted, ref } from 'vue';

import SambaRequests from '../services/samba-requests';

const requests = new SambaRequests();

const users: any = ref([]);
const range: any = ref({ start: null, end: null});

const fetchUsers = async () => {
  users.value = await requests.get({ path: 'users' });
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div>
    <h1 style="margin: 15px 0; font-size: large">
      Client responses {{ range.start && range.end ? `from ${range.start.toDateString()} upto ${range.end.toDateString()}` : '' }}
    </h1>
    <div style="width: 270px; border: 1px solid #779ecb; border-radius: 5px;">
      <va-collapse
        header="Select date range"
      >
        <template #content>
          <va-date-picker
            v-model="range"
            mode="range"
            stripe
            stripe-color="success"
          />
        </template>
      </va-collapse>
    </div>
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
