<template>
  <b-container>
    <BaseBreadcrumb :items="breadcrumbItems" />

    <b-row class="mb-5">
      <b-col cols="12" md="6">
        <b-img-lazy
          class="p-4 border shadow"
          :src="product.images[0].image_url"
          fluid
          blank
          :alt="product.name"
        ></b-img-lazy>
      </b-col>

      <b-col cols="12" md="6" class="p-4">
        <div>
          <!-- Product title -->
          <h5
            style="letter-spacing: 0.2rem"
            class="font-weight-bolder text-uppercase mb-3"
          >
            {{ product.name }}
          </h5>

          <!-- Product type -->
          <h6 class="font-weight-bold text-muted">
            {{ product.product_type.name }}
          </h6>

          <!-- Product rating -->
          <div>
            <b-form-rating
              id="product-rating"
              value="4.5"
              variant="warning"
              inline
              readonly
              no-border
              class="px-0"
            />

            <span class="text-muted">(4.5)</span>
          </div>

          <div class="d-flex align-items-center justify-content-between">
            <!-- Product price -->
            <span
              class="d-inline-block text-danger font-weight-bolder h5 mb-0 mt-2"
            >
              Rp.
              {{ new Intl.NumberFormat('id').format(product.price) }}
            </span>

            <!-- Is product active -->
            <span
              v-if="product.is_active"
              class="d-flex align-items-center text-primary"
            >
              <BIconCheck2Square class="align-middle mr-1" />
              Tersedia
            </span>
          </div>
        </div>

        <b-row class="my-4" align-v="center">
          <b-col cols="12" md="auto">
            <b-form-spinbutton
              id="sb-inline"
              v-model="quantity"
              min="0"
              inline
            ></b-form-spinbutton>
          </b-col>

          <b-col cols="12" md="auto">
            <b-button
              squared
              variant="danger"
              class="text-uppercase"
              @click="doAddToCart"
            >
              Tambah ke keranjang
            </b-button>
          </b-col>

          <b-col cols="12" md="auto">
            <b-button
              squared
              variant="light"
              class="text-uppercase"
              :class="[isFavorite ? 'text-danger' : '']"
              @click="setFavorite"
            >
              <BIconHeartFill v-if="isFavorite" class="align-middle" />
              <BIconHeart v-else class="align-middle" />
            </b-button>
          </b-col>
        </b-row>

        <!-- Product description -->
        <div>
          <p
            class="text-justify"
            :class="[isShowFullDescription ? '' : 'line-clamp-5']"
          >
            {{ product.description }}
          </p>

          <b-button variant="link" @click="showFullDescription">
            {{ isShowFullDescription ? 'Sembunyikan' : 'Lihat lebih' }}
          </b-button>
        </div>
      </b-col>
    </b-row>

    <!-- Product recommendation -->
    <b-row>
      <b-col cols="12" class="text-center mb-5">
        <h5 class="text-uppercase font-weight-bolder text-muted">
          Rekomendasi Untuk Anda
        </h5>

        <hr
          style="width: 150px; border-width: 2px !important"
          class="border border-danger rounded-pill"
        />
      </b-col>

      <template v-for="(recomendation, index) in stateOfProducts">
        <ProductCard :key="index" :item="recomendation" />
      </template>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { BIconCheck2Square, BIconHeart, BIconHeartFill } from 'bootstrap-vue'
import ProductCard from '~/components/Base/ProductCard.vue'

export default {
  components: { BIconCheck2Square, BIconHeart, BIconHeartFill, ProductCard },
  data() {
    return {
      product: null,
      quantity: 1,
      isShowFullDescription: false,
    }
  },
  fetch() {
    this.product = this.stateOfProducts.find(
      (product) => product.slug === this.$route.params.slug
    )
    this.setBreadcrumbs([
      {
        text: 'Home',
        to: '/',
      },
      {
        text: this.product?.name.toLowerCase(),
        active: true,
      },
    ])
  },
  computed: {
    ...mapState('appConfig', {
      breadcrumbItems: 'breadcrumbs',
    }),
    ...mapState('products', { stateOfProducts: 'products' }),
    ...mapState('favorite', { stateOfFavorite: 'favoriteProducts' }),
    ...mapState('cart', { stateOfCart: 'cart' }),
    isFavorite: {
      get() {
        return this.stateOfFavorite.some(
          (favorite) => favorite.id === this.product.id
        )
      },
      set(value) {
        return value
      },
    },
  },
  methods: {
    ...mapMutations('appConfig', { setBreadcrumbs: 'SET_BREADCRUMBS' }),
    ...mapMutations('favorite', {
      AddFavoriteProducts: 'ADD_FAVORITE_PRODUCTS',
      removeFavoriteProducts: 'REMOVE_FAVORITE_PRODUCTS',
    }),
    ...mapMutations('cart', {
      addCart: 'ADD_CART',
      removeCart: 'REMOVE_CART',
    }),
    showFullDescription() {
      this.isShowFullDescription = !this.isShowFullDescription
    },
    setFavorite() {
      if (this.isFavorite) {
        this.removeFavoriteProducts(this.product.id)
        this.isFavorite = false
      } else {
        this.AddFavoriteProducts({ ...this.product })
        this.isFavorite = true
      }
    },
    doAddToCart() {
      if (this.quantity === 0) return this.removeCart(this.product.id)

      const item = {
        product: this.product,
        quantity: this.quantity,
      }

      this.addCart(item)
    },
  },
}
</script>

<style scoped>
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
