<template>
  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
    <span>{{ title }}</span>
    <a class="d-flex align-items-center text-muted" href="#">
      <span data-feather="plus-circle" />
    </a>
  </h6>
</template>

<script>
export default {
  props: ['title']
};
</script>
