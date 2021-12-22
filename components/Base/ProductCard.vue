<template>
  <b-col cols="12" md="4" class="mb-4">
    <nuxt-link
      :to="`/product/${item.slug}`"
      class="text-dark text-decoration-none"
    >
      <b-card
        class="shadow text-center"
        :style="[
          $route.name !== 'index' ? 'min-height: 550px' : 'min-height: 430px',
        ]"
      >
        <!-- Product image -->
        <template v-if="item.images[0]">
          <b-card-img
            :alt="item.name"
            :src="item.images[0].image_url"
            top
            class="mb-4"
          />
        </template>

        <!-- Product title -->
        <h5
          style="letter-spacing: 0.2rem min-height: 75px"
          class="font-weight-bolder line-clamp-3 text-uppercase"
          :title="item.name"
        >
          {{ item.name.toLowerCase().replaceAll('\\"', '') }}
        </h5>

        <!-- Product type -->
        <h6 class="font-weight-bold text-muted line-clamp-1">
          {{ item.product_type.name }}
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

        <!-- Product price -->
        <span
          class="d-inline-block text-danger font-weight-bolder h5 mb-0 mt-2"
        >
          Rp.
          {{ new Intl.NumberFormat('id').format(item.price) }}
        </span>
      </b-card>
    </nuxt-link>
  </b-col>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
