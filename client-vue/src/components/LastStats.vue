<template>
  <section class='content'>
    <div class='box'>
      <div class='box-body' v-if="loading">
        <div class='row'>
          <div class='col-md-4'>
            <p class='text-center'>
              <strong>Loading ...</strong>
            </p>
          </div>
        </div>
      </div>
      <div class='box-body' v-else>
        <div class='row'>
          <div class='col-md-12'>
            <bar-chart v-bind:graphData="graphData"></bar-chart>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { formatWeekData, getDayForWeekStat } from '@/services/teleinfoData.service';
import { getGraphColor, getGraphLabel } from '@/services/Configuration';
import BarChart from './BarChart';
import FetchComponent from './FetchComponent';

export default {
  name: 'LastStat',
  mixins: [FetchComponent],
  components: {
    'bar-chart': BarChart
  },
  data () {
    return {
      loading: true,
      graphData: {xAxisLabels:[], datasets:[]},
      dayInfo: {infogenerale:[]},
      series: {}
    }
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
    this.fetchData(url)

    next();
  },
  methods: {
    computeCacheKey () {
      return undefined
    },
    formatData (data) {
      return formatWeekData(data)
    },
    computeUrl(days) {
      let date = days
      if (date === undefined || date.length === 0 || date === 'today') {
        date = new Date().getTime()
      }
      return 'api/q7days?d=today&nbdays=' + date
    },
    postProcess(series) {
      var vm = this;
      vm.graphData.xAxisLabels = series.xAxisLabels.map((element) => getDayForWeekStat(element));

      var datasets = series.datasets.map((element) => {
        return {
          label: getGraphLabel(element.type),
          data: element.data,
          backgroundColor: getGraphColor(element.type),
          stack: 'Stack 0',
        };
      });

      vm.graphData.datasets = datasets;
      vm.dayInfo.infogenerale = series.infogenerale;
      vm.series = series;
    }
  }
}
</script>
