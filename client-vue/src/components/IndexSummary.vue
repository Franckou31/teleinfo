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
        <va-index :goToDay="goToDay" :infogenerale="dayInfo.infogenerale"></va-index>
      </div>
    </div>
  </section>
</template>

<script>
import { formatDayData } from '@/services/teleinfoData.service'
import VAIndex from './Index'

export default {
  name: 'DayStat',
  components: {
    'va-index': VAIndex,
   },
  data () {
    return {
      loading: true,
      dayInfo: {infogenerale:[]},
    }
  },
  // Method when the component is created
  created () {
    console.log('Stats created entering');
    this.fetchData(this.$route.params.days);
  },
  // Method when the component is updated
  // see: https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
  beforeRouteUpdate (to, from, next) {
    this.fetchData(to.params.days);
    next();
  },
  methods: {
    goToDay: function(day) {
      this.$router.push(
        { name: 'sumindex', params: { days: day } });
    },
    fetchData: function(days) {
      this.loading = true
      console.log('Stats created entering ' + days);
      // TODO : remettre en place le cache local
      // TODO tester erreur pas de service
      // TODO tester erreur enlenver la regle de proxy
      let date = days
      if (date === undefined || date.length === 0 || date === 'today') {
        date = new Date().getTime()
      }
      var url = 'api/q1?d=' + date
      var vm = this;
      fetch(url).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log('Stats created in then response');
            const series = formatDayData(json);

            console.log('Stats created in then response before setting data');
            vm.dayInfo.infogenerale = series.infogenerale;
            vm.loading = false;
            console.log('Stats created end fetch');
          })
        } else {
          console.log('Mauvaise réponse du réseau ' + response.status + '-' + response.statusText);
        }
      })
      .catch(function (error) {
        vm.loading = false
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      })
      console.log('Stats created ending');
    }
  }

}
</script>
