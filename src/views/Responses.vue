<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

import SambaRequests from '../services/samba-requests';
import { getLastYear, formatDateForSupabase } from '../util/dates';
import { colorForClientScore } from '../util/nps';
import {
  SURVEYS_ANSWERED_CHART_TITLE,
  SURVEYS_ANSWERED_LABEL,
  SURVEYS_NOT_ANSWERED_LABEL,
  SURVEY_ANSWERED_COLOR,
  SURVEY_NOT_ANSWERED_COLOR,
} from '../config/constants';

Chart.register(...registerables);

const requests = new SambaRequests();

const range: any = ref({
  start: getLastYear(),
  end: new Date(),
});

const surveyTotalsChartOptions: any = ref({
  plugins: {
    title: {
      display: true,
      text: SURVEYS_ANSWERED_CHART_TITLE,
    },
  },
});
const surveyTotalsChartData: any = ref({});
const customerAnswers: any = ref([]);

const fetchSurveyTotals = async () => {
  const startDate = range.value.start;
  const endDate = range.value.end;
  if (!startDate || !endDate) return null;

  const surveyTotalsData: any = await requests.get({
    path: `get_surveys_sent_and_answered?lower_limit_date=${formatDateForSupabase(startDate)}&upper_limit_date=${formatDateForSupabase(endDate)}`,
  });
  return surveyTotalsData;
};

const fetchCustomerFeedback = async () => {
  const startDate = range.value.start;
  const endDate = range.value.end;
  if (!startDate || !endDate) return null;

  const customerFeedback: any = await requests.get({
    path: `get_customer_feedback?lower_limit_date=${formatDateForSupabase(startDate)}&upper_limit_date=${formatDateForSupabase(endDate)}`,
  });
  return customerFeedback;
};

const updateSurveyTotalsChart = (surveyTotals: any) => {
  const answered = surveyTotals.total_surveys_answered;
  const total = surveyTotals.total_surveys_sent;

  const answeredPercentage = Math.round(100 * answered / total);
  const notAnsweredPercentage = 100 - answeredPercentage;

  surveyTotalsChartData.value = {
    labels: [SURVEYS_ANSWERED_LABEL, SURVEYS_NOT_ANSWERED_LABEL],
    datasets: [{
      data: [answeredPercentage, notAnsweredPercentage],
      backgroundColor: [SURVEY_ANSWERED_COLOR, SURVEY_NOT_ANSWERED_COLOR],
    }],
  };
};

const updateCustomerFeedback = (customerFeedback: any) => {
  customerAnswers.value = customerFeedback;
};

const updateCharts = async () => {
  const surveyTotals = await fetchSurveyTotals();
  if (surveyTotals) updateSurveyTotalsChart(surveyTotals);
  const customerFeedback = await fetchCustomerFeedback();
  if (customerFeedback) updateCustomerFeedback(customerFeedback);
};

onMounted(() => {
  updateCharts();
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
            @update:modelValue="updateCharts"
          />
        </template>
      </va-collapse>
    </div>
    <div style="width: 100%; margin: 12px 0;">
      <doughnut-chart :options="surveyTotalsChartOptions" :chartData="surveyTotalsChartData" />
    </div>
    <div>
      <va-card
        v-for="(answer, idx) in customerAnswers"
        :key="idx"
        stripe
        :stripe-color="colorForClientScore(answer.score)"
        style="margin-top: 12px;"
      >
        <va-card-title>
          {{ answer.customer_name }} &nbsp;
        </va-card-title>
        <va-card-content>
          <p>Score: {{ answer.score }} &nbsp; {{ answer.multiple_choice_answer }}</p>
          <p>{{ answer.text_answer }}</p>
        </va-card-content>
      </va-card>
      {{ customerAnswers }}
    </div>
  </div>
</template>
