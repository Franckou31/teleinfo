<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: ['graphData'],
  mounted () {
    this.renderChart(this.$props.graphData.piedata, {
      legend: {
        display: false
      },
      // height:'100px',
      // width:'100px',
      maintainAspectRatio: false
    });
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
