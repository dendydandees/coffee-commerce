<template>
  <div class="d-flex align-items-center">
    <span>Menampilkan</span>
    <b-form-select
      v-model="limit"
      :options="options"
      class="w-25 ml-2"
      :disabled="stateOfLoadingProduct"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      options: [3, 5, 7, 10],
    }
  },
  computed: {
    ...mapState('products', {
      stateOfParams: 'params',
      stateOfLoadingProduct: 'loading',
    }),
    limit: {
      get() {
        return this.stateOfParams?.limit
      },
      set(value) {
        this.setParamsLimit(value)
      },
    },
  },
  watch: {
    limit(newValue, oldValue) {
      this.getProducts({ token: this.$auth.strategy.token.get() })
    },
  },
  methods: {
    ...mapMutations('products', { setParamsLimit: 'SET_PARAMS_LIMIT' }),
    ...mapActions('products', ['getProducts']),
  },
}
</script>
