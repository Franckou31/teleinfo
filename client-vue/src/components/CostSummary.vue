<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-mysuccess">
          <div class="row">
            <div class="col-md-6">
              Consommation du jour  <span class="badge badge-primary">
                {{ series.coutTotal }}
              </span>
            </div>
            <div class="col-md-6">
              <button
                type="button" class="btn btn-outline-secondary"
                @click="goToDay(infogenerale.prevday)"
              >
                {{ '<< Précédent' }}
              </button>
              <button
                v-if="!infogenerale.today" type="button"
                class="btn btn-outline-secondary" @click="goToDay(infogenerale.nextday)"
              >
                {{ 'Suivant >>' }}
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-deck">
            <div
              v-for="item in series.statDays.consos" class="card mb-3"
              :class="'border-' + getColor(item.type)" style="max-width: 18rem;"
            >
              <div class="card-header">
                {{ getLabel(item.type) }} : {{ item.conso / 1000 }} kW.
              </div>
              <div class="card-body" :class="'text-' + getColor(item.type)">
                <p class="card-text">
                  {{ (item.cout / 1000).toFixed(2) }} €
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
import { getCardColor, getGraphLabel } from '@/services/Configuration';
export default {
  props: ['series', 'infogenerale', 'goToDay'],
  methods: {
    getLabel: (type) => getGraphLabel(type),
    getColor: (type) => getCardColor(type)
  }
};
</script>
