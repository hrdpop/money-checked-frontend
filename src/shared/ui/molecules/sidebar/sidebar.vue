<script setup lang="ts">
import { defineProps, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
  routes: readonly RouteRecordRaw[]
}

const props = defineProps<Props>()
const route = useRoute()
const expandedRoutes = ref<Record<string | symbol, boolean>>({})

// Нормализация путей для сравнения
const normalizePath = (path: string) => {
  return path.replace(/\/+$/, '') || '/'
}

// Проверка, содержит ли маршрут или его дети текущий путь
const containsCurrentRoute = (routeItem: RouteRecordRaw, currentPath: string): boolean => {
  const normalizedCurrent = normalizePath(currentPath)
  const normalizedRoutePath = normalizePath(routeItem.path)

  if (normalizedRoutePath === normalizedCurrent) return true

  if (routeItem.children) {
    return routeItem.children.some(child => {
      const childPath = normalizedRoutePath +
        (child.path.startsWith('/') ? child.path : '/' + child.path)
      return normalizePath(childPath) === normalizedCurrent ||
        containsCurrentRoute(child, normalizedCurrent)
    })
  }

  return false
}

// Раскрытие всех родительских маршрутов, содержащих текущий
const expandActiveRoutes = (routes: readonly RouteRecordRaw[], currentPath: string) => {
  routes.forEach(routeItem => {
    if (containsCurrentRoute(routeItem, currentPath)) {
      if (routeItem.name) {
        expandedRoutes.value[routeItem.name] = true
      }

      if (routeItem.children) {
        expandActiveRoutes(routeItem.children, currentPath)
      }
    }
  })
}

// Инициализация и отслеживание изменений маршрута
onMounted(() => {
  expandActiveRoutes(props.routes, route.path)
})

watch(() => route.path, (newPath) => {
  expandedRoutes.value = {} // Сброс перед новым раскрытием
  expandActiveRoutes(props.routes, newPath)
})

const toggleRoute = (routeName: string | symbol | undefined, event?: Event) => {
  if (event) event.stopPropagation()
  if (!routeName) return
  expandedRoutes.value[routeName] = !expandedRoutes.value[routeName]
}
</script>

<template>
  <ul class="sidebar__list">
    <li v-for="routeItem in routes" :key="routeItem.name" class="sidebar__item">
      <RouterLink
        v-if="!routeItem.children"
        :to="routeItem.path"
        class="sidebar__link"
        :class="{ 'sidebar__link--active': normalizePath(route.path) === normalizePath(routeItem.path) }"
      >
        {{ routeItem.name }}
      </RouterLink>
      <div v-else class="sidebar__parent">
        <div class="sidebar__header" @click="toggleRoute(routeItem.name, $event)">
          <RouterLink
            :to="routeItem.path"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': normalizePath(route.path) === normalizePath(routeItem.path) }"
            @click.stop
          >
            {{ routeItem.name }}
          </RouterLink>
          <span class="sidebar__toggle">
            {{ routeItem.name && expandedRoutes[routeItem.name] ? '▼' : '▶' }}
          </span>
        </div>
        <transition name="slide">
          <div v-if="routeItem.name && expandedRoutes[routeItem.name]" class="sidebar__children">
            <Sidebar
              :routes="routeItem.children"
              class="sidebar__nested"
            />
          </div>
        </transition>
      </div>
    </li>
  </ul>
</template>

<style scoped>
/* Стили остаются такими же, как в предыдущем примере */
.sidebar__list {
  list-style: none;
  padding: 8px 0;
  margin: 0;
}

.sidebar__item {
  padding: 4px 0;
  position: relative;
}

.sidebar__link {
  color: white;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;

  width: 100%;
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar__link:hover {
  color: #42b983;
}

.sidebar__link--active {
  color: #42b983;
  font-weight: bold;
}

.sidebar__parent {
  cursor: pointer;
}

.sidebar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
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
