<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card ">
        <div class="card-header bg-mysuccess">
          <div class="row">
            <div class="col-md-6">
              Relevé index (en KW): {{ dayDate }}
            </div>
            <div class="col-md-6">
              <button
                type="button" class="btn btn-outline-secondary"
                @click="goToDay(infogenerale.prevday)"
              >
                {{ 'Précédent' }}
              </button>
              <button
                v-if="!infogenerale.today" type="button"
                class="btn btn-outline-secondary"
                @click="goToDay(infogenerale.nextday)"
              >
                {{ 'Suivant >>' }}
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              Couleur du jour : <span class="badge badge-primary">
                {{ infogenerale.couleurDuJour }}
              </span>
              - Couleur Demain : <span class="badge badge-primary">
                {{ infogenerale.couleurDemain }}
              </span>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-deck">
            <div
              v-for="item in infogenerale.index" class="card mb-0 py-0"
              :class="'border-' + item.color" style="max-width: 18rem;"
            >
              <!--div class="card-header">{{ item.label }}</div-->
              <div class="card-body" :class="'text-' + item.color">
                <h6 class="card-title">
                  {{ item.label }}
                </h6>
                <p class="card-text">
                  {{ item.valeur / 1000 }} KW.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@/services/util.service';
export default {
  computed: {
    dayDate: function () {
      return Util.formatDayDate(this.$props.infogenerale.date);
    }
  },
  props: ['infogenerale', 'goToDay']
};
</script>

<style>
.bg-mysuccess {
  background-color: #dff0d8;
}
</style>
