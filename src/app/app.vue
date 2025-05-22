<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { Header, Sidebar } from '@shared/ui'
  import { routes } from './router/routes.ts'
</script>

<template>
  <div class="app-container">
    <Header />
    <div class="main-content">
      <nav class="sidebar">
        <Sidebar :routes="routes"/>
      </nav>
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  min-width: 200px;
  background-color: #34495e;
  color: white;
  padding: 16px;
}


.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
