<template>
  <div class="layout-container">
    <!-- 左侧固定侧边栏 -->
    <aside class="sidebar">
      <Sidebar />
    </aside>
    
    <!-- 右侧内容区域 -->
    <div class="main-container">
      <!-- 右上方区域 -->
      <header class="header">
        <Header />
      </header>
      
      <!-- 右下方主内容区域 -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<style scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.content {
  flex: 1;
  overflow-y: auto;
  background: #ffffff;
}
</style>

