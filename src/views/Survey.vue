<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useRouter} from "vue-router";

import SambaRequests from '../services/samba-requests';


var query_string = useRouter().currentRoute.value.query
const requests = new SambaRequests();
const question_position_1: any = ref("");
const question_position_2: any = ref("");
const options: any = ref([]);
const step: any = ref(0);
const score: any = ref( query_string.score);
const order_number: any = ref(query_string.order_number);


const fetchQuestions = async () => {
  var response: any = await requests.get({ path: `questions?score=${score.value}&order_number=${order_number.value}` });
  question_position_1.value = response[0].question
  question_position_2.value = response[1].question
  options.value = response[0].possible_answers
};

const steps = [
  { label: 'Let us know' },
  { label: 'Share your experience' }
]

onMounted(() => {
  fetchQuestions();
});
</script>

<template>
  <div class="row align-center">
    <div class="flex flex-col xs12">
      <h1 class="va-h1">LUUNA BRASIL</h1>
      <va-stepper
        v-model="step"
        :steps="steps"  
      >
        <template #step-content-0>
          <h3 class="va-h3">{{ question_position_1 }}</h3>
          <va-card>
            <va-card-content>
              <va-textarea
                  autosize
                  placeholder="Start typing"
                />
            </va-card-content>
          </va-card>
        </template>
        <template #step-content-1>
          <h3 class="va-h3">{{ question_position_2 }}</h3>
          <va-card>
            <va-card-title>Seleccione una o más opciones</va-card-title>
            <va-card-content>
              <ul>
                <li v-for="option in options">
                  <va-chip href="https://google.com" outline size="large" class="mr-6 mb-3">
                    {{ option }}
                  </va-chip>
                </li>
              </ul>
            </va-card-content>
          </va-card>
        </template>
      </va-stepper>
    </div>
  </div>
</template>

<style>
</style>
