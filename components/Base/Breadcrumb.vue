<template>
  <b-breadcrumb :items="items" class="mb-4"></b-breadcrumb>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.breadcrumb {
  background-color: white;
}

.breadcrumb-item {
  color: #dc3545;
  text-transform: capitalize;
}
.breadcrumb-item a {
  color: #6c757d;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '>>';
}
</style>
