<template>
  <div class="d-flex align-items-center justify-content-md-end">
    <span>Urutkan</span>
    <b-form-select v-model="order" :options="options" class="w-50 ml-2" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      options: [
        { value: 'product_name', text: 'Nama Produk' },
        { value: 'price', text: 'Harga Produk' },
        { value: 'date', text: 'Tanggal Produk' },
      ],
    }
  },
  computed: {
    ...mapState('products', { stateOfParams: 'params' }),
    order: {
      get() {
        return this.stateOfParams?.order
      },
      set(value) {
        this.setParamsOrder(value)
      },
    },
  },
  watch: {
    order(newValue, oldValue) {
      this.getProducts({ token: this.$auth.strategy.token.get() })
    },
  },
  methods: {
    ...mapMutations('products', { setParamsOrder: 'SET_PARAMS_ORDER' }),
    ...mapActions('products', ['getProducts']),
  },
}
</script>
