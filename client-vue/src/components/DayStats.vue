<template>
  <section class="content">
    <div class="box">
      <div v-if="loading" class="box-body">
        <div class="row">
          <div class="col-md-4">
            <p class="text-center">
              <strong>Loading ...</strong>
            </p>
          </div>
        </div>
      </div>
      <div v-else class="box-body">
        <VaCostSummary
          :go-to-day="goToDay" :infogenerale="dayInfo.infogenerale"
          :series="series"
        />
        <div class="row">
          <div class="col-md-12">
            <BarChart :graph-data="graphData" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formatDayData } from '@/services/teleinfoData.service';
import { getGraphColor, getGraphLabel } from '@/services/Configuration';
import BarChart from './BarChart';
import PieChart from './PieChart';
import VAIndex from './Index';
import VACostSummary from './CostSummary';
import FetchComponent from './FetchComponent';

export default {
  name: 'DayStat',
  mixins: [FetchComponent],
  components: {
    'bar-chart': BarChart,
    'pie-chart': PieChart,
    'va-index': VAIndex,
    'va-cost-summary': VACostSummary
  },
  data () {
    return {
      loading: true,
      graphData: {xAxisLabels: [], datasets: []},
      dayInfo: {infogenerale: []},
      series: {}
    };
  },
  // Method when the component is created
  created () {
    var url = this.computeUrl(this.$route.params.days);
    this.fetchData(url);
  },
  // Method when the component is updated
  // see: https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
  beforeRouteUpdate (to, from, next) {
    var url = this.computeUrl(to.params.days);
    this.fetchData(url);

    next();
  },
  methods: {
    computeCacheKey () {
      return undefined;
    },
    formatData (data) {
      return formatDayData(data);
    },
    computeUrl(days) {
      let date = days;
      if (date === undefined || date.length === 0 || date === 'today') {
        date = new Date().getTime();
      }
      return 'api/q1?d=' + date;
    },
    goToDay: function(day) {
      this.$router.push(
        { name: 'dstats', params: { days: day } });
    },
    getPieDataSets: function(series) {
      var data = [];
      var backgroundColors = [];
      var labels = [];

      series.forEach((element) => {
        data.push(element.cout);
        backgroundColors.push(getGraphColor(element.type));
        labels.push(getGraphLabel(element.type));
      });

      return {
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          label: 'Conso'
        }],
        labels: labels
      };
    },
    postProcess(series) {
      var vm = this;
      vm.graphData.xAxisLabels = series.xAxisLabels;

      var datasets = series.datasets.map((element) => {
        return {
          label: getGraphLabel(element.type),
          data: element.data,
          backgroundColor: getGraphColor(element.type),
          stack: 'Stack 0'
        };
      });

      var pieDataSet = this.getPieDataSets(series.statDays.consos);

      vm.graphData.datasets = datasets;
      vm.graphData.piedata = pieDataSet;
      vm.dayInfo.infogenerale = series.infogenerale;
      vm.series = series;
    }
  }
};
</script>
