<script setup lang="ts">
import { defineProps } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
  routes: readonly RouteRecordRaw[]
}

defineProps<Props>()
</script>

<template>
  <ul class="sidebar__list">
    <li v-for="route in routes" :key="route.name" class="sidebar__item">
      <RouterLink
        v-if="!route.children"
        :to="route.path"
        class="sidebar__link"
      >
        {{ route.name }}
      </RouterLink>
      <div v-else>
        <p class="sidebar__link"> {{route.name}} </p>
        <Sidebar
          :routes="route.children"
          class="sidebar__nested"
        />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.sidebar__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__item {
  padding: 10px 20px;
}

.sidebar__link {
  color: white;
  text-decoration: none;
  display: block;
}

.sidebar__link:hover {
  color: #42b983;
}

.sidebar__nested {
  margin-left: 10px; /* Отступ для вложенных меню */
}
</style>
