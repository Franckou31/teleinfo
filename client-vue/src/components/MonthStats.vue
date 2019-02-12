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
import { formatWeekData, getDayForWeekStat } from '@/services/teleinfoData.service';
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
    var days = this.computeUrl(this.$route.params.days);
    this.fetchData(days);
  },
  // Method when the component is updated
  // see: https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
  beforeRouteUpdate (to, from, next) {
    var days = this.computeUrl(to.params.days);
    this.fetchData(days);

    next();
  },
  methods: {
    computeCacheKey () {
      return undefined;
    },
    formatData (data) {
      return formatWeekData(data);
    },
    computeUrl(day) {
      let date = this.computeMonth(day);

      return 'api/month?d=' + date;
    },
    computeMonth(date) {
      if (date === undefined || date.length === 0 || date === 'today') {
        var dd = new Date();
        var year = dd.getFullYear();
        var month = dd.getMonth() + 1;
        date = year + '-' + String('0' + month).slice(-2);

        return date;
      } else {
        return date;
      }
    },
    goToDay: function(day) {
      var day = this.computeMonth(day);
      this.$router.push(
        { name: 'monthstats', params: { days: day } });
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
      vm.graphData.xAxisLabels = series.xAxisLabels.map(element => getDayForWeekStat(element));

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

      var ddTmp = new Date(vm.dayInfo.infogenerale.date);
      var year = ddTmp.getFullYear();
      var month = ddTmp.getMonth() + 1;
      var currentDate = year + '-' + String('0' + month).slice(-2);
      var dd = new Date();
      var todayYear = dd.getFullYear();
      var todayMonth = dd.getMonth() + 1;
      var todayDate = todayYear + '-' + String('0' + todayMonth).slice(-2);

      var prevMonth = month;
      var nextMonth = month;
      var prevYear = year;
      var nextYear = year;
      if (month === 1) {
        prevMonth = 12;
        prevYear -= 1;
        nextMonth += 1;
      } else if (month === 12) {
        prevMonth -= 1;
        nextMonth = 1;
        nextYear += 1;
      } else {
        prevMonth -= 1;
        nextMonth += 1;
      }
      var prevDate = prevYear + '-' + String('0' + prevMonth).slice(-2);
      var nextDate = nextYear + '-' + String('0' + nextMonth).slice(-2);
      vm.dayInfo.infogenerale.nextday = nextDate;
      vm.dayInfo.infogenerale.prevday = prevDate;
    }
  }
};
</script>
