<template>
  <b-container>
    <BaseBreadcrumb :items="breadcrumbItems" />

    <b-row>
      <!-- Sorting options -->
      <b-col cols="12" md="4" class="mb-4 mb-md-0">
        <OptionalSort />
      </b-col>

      <b-col cols="12" md="8">
        <!-- Order and limit options -->
        <b-row class="mb-4">
          <b-col cols="12" md="6" class="mb-4 mb-md-0">
            <Limit />
          </b-col>

          <b-col cols="12" md="6">
            <OrderBy />
          </b-col>
        </b-row>

        <b-row>
          <template v-for="(product, index) in stateOfProducts">
            <ProductCard :key="index" :item="product" />
          </template>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Limit from '~/components/Index/Limit.vue'
import OptionalSort from '~/components/Index/OptionalSort.vue'
import OrderBy from '~/components/Index/OrderBy.vue'
import ProductCard from '~/components/Base/ProductCard.vue'

export default {
  name: 'IndexPage',
  components: { Limit, OptionalSort, OrderBy, ProductCard },
  layout: 'default',
  data() {
    return {}
  },
  fetch() {
    this.setBreadcrumbs([
      {
        text: 'Home',
        active: true,
      },
    ])
    this.getProducts({ token: this.$auth.strategy.token.get() })
  },
  fetchOnServer: false,
  computed: {
    ...mapState('appConfig', {
      breadcrumbItems: 'breadcrumbs',
    }),
    ...mapState('products', { stateOfProducts: 'products' }),
  },
  methods: {
    ...mapMutations('appConfig', { setBreadcrumbs: 'SET_BREADCRUMBS' }),
    ...mapActions('products', ['getProducts']),
  },
}
</script>
