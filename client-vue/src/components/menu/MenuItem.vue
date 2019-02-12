<template>
  <li class="nav-item">
    <RouterLink
      exact-active-class="active" class="nav-link"
      :to="path"
    >
      <span :data-feather="icon" />
      {{ title }}
    </RouterLink>
  </li>
</template>

<script>
export default {
  props: ['path', 'icon', 'title']
};
</script>
