<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <MenuTitle title="Stats consommation" />

        <MenuItem
          title="Home" icon="home"
          path="/"
        />
        <MenuItem
          title="Relevé Index" icon="home"
          path="/sumindex/today"
        />
        <MenuItem
          title="Aujourd'hui" icon="home"
          path="/daystat/today"
        />
        <MenuItem
          title="7 derniers jours" icon="home"
          path="/last/7"
        />
        <MenuItem
          title="30 derniers jours" icon="home"
          path="/last/30"
        />
        <MenuItem
          title="Mois en cours" icon="home"
          path="/monthstat/today"
        />
      </ul>

      <MenuTitle title="Administration" />

      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text" />
            Current month
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import menuItem from '../menu/MenuItem';
import menuTitle from '../menu/MenuTitle';

export default {
  components: {
    menuItem, menuTitle
  }
};
</script>
