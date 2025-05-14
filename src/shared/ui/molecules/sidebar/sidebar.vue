<script setup lang="ts">
import { defineProps } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
  routes: RouteRecordRaw[]
}

defineProps<Props>()
</script>

<template>
  <nav class="sidebar">
    <ul>
      <li v-for="route in routes" :key="route.name">
        <RouterLink :to="route.path">{{ route.name }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #34495e;
  color: white;
  padding: 20px 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 10px 20px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
}

.sidebar a:hover {
  color: #42b983;
}
</style>
