<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { BarChart, DoughnutChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

import SambaRequests from '../services/samba-requests';
import { getLastYear } from '../util/dates';
import { calculateNps } from '../util/nps';
import {
  NPS_LINE_COLOR,
  PROMOTERS_BAR_COLOR,
  DETRACTORS_BAR_COLOR,
  PASSIVES_BAR_COLOR,
  NPS_LINE_CHART_TITLE,
  HISTORIC_NPS_CHART_TITLE,
  PERCENTAGE_NPS_CHART_TITLE,
  PROMOTERS_LABEL,
  DETRACTORS_LABEL,
  PASSIVES_LABEL,
} from '../config/constants';

Chart.register(...registerables);

const requests = new SambaRequests();

const range: any = ref({
  start: getLastYear(),
  end: new Date(),
});

const npsLineChartData: any = ref({});

const historicNpsChartData: any = ref({});
const historicNpsChartOptions: any = ref({
  plugins: {
    title: {
      display: true,
      text: HISTORIC_NPS_CHART_TITLE,
    },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  }
});

const percentageNpsChartData: any = ref({});
const percentageNpsChartOptions: any = ref({
  plugins: {
    title: {
      display: true,
      text: PERCENTAGE_NPS_CHART_TITLE,
    },
  },
});

const fetchNpsHistoricData = async () => {
  const startDate = range.value.start;
  const endDate = range.value.end;
  if (!startDate || !endDate) return null;

  const startMonth = startDate.getMonth() + 1;
  const endMonth = endDate.getMonth() + 1;
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const npsData : any = await requests.get({
    path: `get_nps_history_from_range?starting_month=${startMonth}&starting_year=${startYear}&ending_month=${endMonth}&ending_year=${endYear}`,
  });
  return npsData;
};

const updateNpsLineChart = async (npsData: any) => {
  const npsLineChartDatasets = [
    {
      label: NPS_LINE_CHART_TITLE,
      data: npsData.map((x: any) => calculateNps(x)),
      borderColor: NPS_LINE_COLOR,
    }
  ];
  npsLineChartData.value = {
    labels: npsData.map((x: any) => `${x.month}/${x.year}`),
    datasets: npsLineChartDatasets,
  };
};

const updateHistoricNpsChart = async (npsData: any) => {
  const npsHistoricChartDatasets = [
    {
      data: npsData.map((x: any) => x.promoters),
      label: PROMOTERS_LABEL,
      backgroundColor: PROMOTERS_BAR_COLOR,
    },
    {
      data: npsData.map((x: any) => x.passives),
      label: PASSIVES_LABEL,
      backgroundColor: PASSIVES_BAR_COLOR,
    },
    {
      data: npsData.map((x: any) => x.detractors),
      label: DETRACTORS_LABEL,
      backgroundColor: DETRACTORS_BAR_COLOR,
    },
  ];
  historicNpsChartData.value = {
    labels: npsData.map((x: any) => `${x.month}/${x.year}`),
    datasets: npsHistoricChartDatasets
  };
};

const updatePercentageNpsChart = (npsData: any) => {
  const promoters = npsData.reduce((acc: any, data: any) => acc + data.promoters, 0);
  const passives = npsData.reduce((acc: any, data: any) => acc + data.passives, 0);
  const detractors = npsData.reduce((acc: any, data: any) => acc + data.detractors, 0);
  const totalClients = promoters + passives + detractors;

  const promotersPercentage = Math.round(100 * promoters / totalClients);
  const passivesPercentage = Math.round(100 * passives / totalClients);
  const detractorsPercentage = 100 - promotersPercentage - passivesPercentage;

  percentageNpsChartData.value = {
    labels: [ PROMOTERS_LABEL, PASSIVES_LABEL, DETRACTORS_LABEL ],
    datasets: [{
      data: [promotersPercentage, passivesPercentage, detractorsPercentage],
      backgroundColor: [PROMOTERS_BAR_COLOR, PASSIVES_BAR_COLOR, DETRACTORS_BAR_COLOR],
    }],
  };
};

const updateCharts = async () => {
  const npsData = await fetchNpsHistoricData();
  if (!npsData) return;
  updateNpsLineChart(npsData);
  updateHistoricNpsChart(npsData);
  updatePercentageNpsChart(npsData);
};

onMounted(() => {
  updateCharts();
});
</script>

<template>
  <div>
    <h1 style="margin: 15px 0; font-size: large">
      NPS data {{ range.start && range.end ? `from ${range.start.toDateString()} upto ${range.end.toDateString()}` : '' }}
    </h1>
    <div style="width: 270px; border: 1px solid #779ecb; border-radius: 5px;">
      <va-collapse header="Select date range">
        <va-date-picker
          v-model="range"
          mode="range"
          type="month"
          @update:modelValue="updateCharts"
        ></va-date-picker>
      </va-collapse>
    </div>
    <br />
    <div style="width: 100%; margin: 12px 0; display: flex;">
      <div>
        <line-chart :chartData="npsLineChartData" />
      </div>
      <div>
        <bar-chart :options="historicNpsChartOptions" :chartData="historicNpsChartData" />
      </div>
      <div>
        <doughnut-chart :options="percentageNpsChartOptions" :chartData="percentageNpsChartData" />
      </div>
    </div>
  </div>
</template>
