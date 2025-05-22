<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
  routes: readonly RouteRecordRaw[]
}

defineProps<Props>()

const expandedRoutes = ref<Record<string | symbol, boolean>>({})

const toggleRoute = (routeName: string | symbol | undefined) => {
  if (!routeName) {
    return;
  }
  expandedRoutes.value[routeName] = !expandedRoutes.value[routeName]
}
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
      <div v-else class="sidebar__parent">
        <div class="sidebar__header" @click="toggleRoute(route.name)">
          <span class="sidebar__link">{{ route.name }}</span>
          <span class="sidebar__toggle">
            {{ route.name && expandedRoutes[route.name] ? '▼' : '▶' }}
          </span>
        </div>
        <transition name="slide">
          <div v-if="route.name && expandedRoutes[route.name]" class="sidebar__children">
            <Sidebar
              :routes="route.children"
              class="sidebar__nested"
            />
          </div>
        </transition>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.sidebar__list {
  list-style: none;
  padding: 8px 0;
  margin: 0;
}

.sidebar__item {
  padding: 4px 0;
}

.sidebar__link {
  color: white;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.sidebar__link:hover {
  color: #42b983;
}

.sidebar__parent {
  cursor: pointer;
}

.sidebar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.sidebar__toggle {
  color: white;
  font-size: 0.7em;
  display: inline-block;
  transition: transform 0.2s ease;
}

.sidebar__toggle:hover {
  color: #42b983;
}

.sidebar__nested {
  margin-left: 20px;
}

/* Анимация плавного раскрытия */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
