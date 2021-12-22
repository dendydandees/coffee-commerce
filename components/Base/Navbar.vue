<template>
  <b-navbar type="light" variant="faded" class="p-3">
    <b-container>
      <b-navbar-brand class="text-danger font-weight-bolder" to="/">
        BELANJA
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-form
          v-if="$route.name === 'index'"
          @submit.stop.prevent="searchProduct"
        >
          <b-form-input
            v-model="search"
            placeholder="Cari Produk"
            type="search"
            :disabled="stateOfLoadingProduct"
          ></b-form-input>

          <b-button variant="danger" type="submit">
            <BIconSearch class="align-middle" />
          </b-button>
        </b-nav-form>

        <b-nav-item class="ml-2">
          <BIconHeart class="align-middle" />
          <b-badge v-if="countFavorite" pill variant="danger">
            {{ countFavorite }}
          </b-badge>
        </b-nav-item>

        <b-nav-item class="ml-2">
          <BIconBagPlus class="align-middle" />
          <b-badge v-if="countCart" pill variant="danger">
            {{ countCart }}
          </b-badge>
        </b-nav-item>

        <b-nav-item-dropdown right class="ml-2">
          <template #button-content>
            <BIconPerson class="align-middle" />
          </template>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import {
  BIconSearch,
  BIconHeart,
  BIconBagPlus,
  BIconPerson,
} from 'bootstrap-vue'

export default {
  components: {
    BIconSearch,
    BIconHeart,
    BIconBagPlus,
    BIconPerson,
  },
  computed: {
    ...mapState('products', { stateOfLoadingProduct: 'loading' }),
    ...mapGetters('favorite', ['countFavorite']),
    ...mapGetters('cart', ['countCart']),
    search: {
      get() {
        return this.stateOfParams?.search
      },
      set(value) {
        this.setParamsSearch(value)
      },
    },
  },
  methods: {
    ...mapMutations('products', { setParamsSearch: 'SET_PARAMS_SEARCH' }),
    ...mapActions('products', ['getProducts']),
    searchProduct() {
      this.getProducts({ token: this.$auth.strategy.token.get() })
    },
    async logout() {
      await this.$auth.logout()
      this.$auth.strategy.token.reset()
      this.$router.push('/login')
    },
  },
}
</script>
