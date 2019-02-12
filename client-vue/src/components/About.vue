
<template>
  <section class="content">
    <div class="box">
      <div class="box-body">
        <div class="row">
          <div class="col-md-4">
            <p class="text-center">
              <strong>Test Bar Chart</strong>
            </p>
          </div>
          <div class="col-md-8">
            <p class="text-center">
              <strong>Test Bar Chart</strong>
            </p>
            <BarChart
              :chart-config="barChartConfig"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BarChart from './BarChart';
export default {
  components: { 'BarChart': BarChart }
};
</script>

<style>
