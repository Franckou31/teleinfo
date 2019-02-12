<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: ['graphData'],
  mounted () {
    this.renderChart({
      labels: this.$props.graphData.xAxisLabels,
      datasets: this.$props.graphData.datasets
    }, {aspectRatio: 2, maintainAspectRatio: false});
    var node = this.$refs.canvas.parentNode;
    node.className += 'bg-chart';
  }
};
</script>

<style>
.bg-chart {
  background-color: #92b484;
}
</style>
