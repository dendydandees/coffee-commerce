<template>
  <div>
    <b-button
      :class="isShowOptSorting ? null : 'collapsed'"
      :aria-expanded="isShowOptSorting ? 'true' : 'false'"
      aria-controls="optional-sorting"
      variant="light"
      block
      squared
      @click="isShowOptSorting = !isShowOptSorting"
    >
      <p class="d-flex m-0">
        URUTKAN BERDASARKAN
        <BIconChevronUp v-if="isShowOptSorting" class="align-middle ml-auto" />
        <BIconChevronDown v-else class="align-middle ml-auto" />
      </p>
    </b-button>

    <b-collapse id="optional-sorting" v-model="isShowOptSorting" class="mt-2">
      <Price />
    </b-collapse>
  </div>
</template>

<script>
import { BIconChevronDown, BIconChevronUp } from 'bootstrap-vue'
import Price from './Price.vue'

export default {
  components: {
    BIconChevronDown,
    BIconChevronUp,
    Price,
  },
  data() {
    return {
      isShowOptSorting: true,
    }
  },
}
</script>
