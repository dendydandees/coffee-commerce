<template>
  <b-card no-body class="p-3 border-0">
    <h6>Harga</h6>

    <vue-slider
      v-model="slider"
      :min="sliderOptions.min"
      :max="sliderOptions.max"
      :use-keyboard="false"
      :interval="10000"
      :lazy="true"
      :tooltip-formatter="formatter2"
    />

    <div>
      <b-form inline class="mt-3 align-items-center justify-content-center">
        <label class="mr-1" for="inline-form-custom-select-pref"> Rp </label>
        <b-form-input
          id="inline-form-input-name"
          v-model="slider[0]"
          :min="sliderOptions.min"
          :max="sliderOptions.max"
          step="10000"
          type="number"
          style="max-width: 35%"
        />

        <span class="mx-2">-</span>

        <label class="mr-1" for="inline-form-custom-select-pref"> Rp </label>
        <b-form-input
          id="inline-form-input-name"
          v-model="slider[1]"
          :min="sliderOptions.min"
          :max="sliderOptions.max"
          step="10000"
          type="number"
          style="max-width: 35%"
        />
      </b-form>
    </div>
  </b-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      sliderOptions: {
        min: 10000,
        max: 1000000,
      },
      slider: [10000, 500000],
      formatter2: (v) => `Rp.${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    }
  },
  watch: {
    slider: {
      handler(newValue, oldValue) {
        const formattedNewValue = newValue.map((item) => {
          if (typeof item === 'string') return parseInt(item)

          return item
        })
        this.setParamsPrice(formattedNewValue)
        this.getProducts({ token: this.$auth.strategy.token.get() })
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations('products', { setParamsPrice: 'SET_PARAMS_PRICE' }),
    ...mapActions('products', ['getProducts']),
  },
}
</script>

<style>
.vue-slider-process {
  background-color: #dc3545;
}

.vue-slider-dot-tooltip-inner {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
