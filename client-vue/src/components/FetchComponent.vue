<script>
import { formatDayData } from '@/services/teleinfoData.service';
import { getGraphColor, getGraphLabel } from '@/services/Configuration';

export default {
  methods: {
    // Method to e implemented
    computeCacheKey () {
      return undefined;
    },
    formatData (data) {
      return undefined;
    },
    computeUrl(days) {
      return undefined;
    },
    postProcess(series) {
      return undefined;
    },
    // Common method
    fetchData: function(url) {
      this.loading = true;
      var vm = this;
      fetch(url).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            const series = this.formatData(json);
            this.postProcess(series);
            vm.loading = false;
          });
        } else {
          console.log('Mauvaise réponse du réseau ' + response.status + '-' + response.statusText);
        }
      })
        .catch(function (error) {
          vm.loading = false;
          vm.setState({ response: 'KO' });
          console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
    }
  }
};
</script>
