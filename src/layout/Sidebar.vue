<template>
  <div class="sidebar-wrapper">
    <!-- Logo区域 -->
    <div class="logo-section">
      <div class="logo">
        <span class="logo-text">初始喵</span>
      </div>
    </div>

    <!-- 我要卖按钮 -->
    <div class="sell-button-section">
      <button class="sell-button" @click="handleSell">我要卖</button>
    </div>

    <!-- 导航菜单 -->
    <nav class="nav-menu">
      <div
        v-for="item in menuItems"
        :key="item.path"
        class="menu-item"
        :class="{ active: isActive(item.path) }"
        @click="navigate(item.path)"
      >
        <div class="menu-item-content">
          <span class="menu-text">{{ item.label }}</span>
          <span v-if="item.hasDropdown" class="dropdown-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = ref([
  { label: '工作台', path: '/workspace', hasDropdown: false },
  { label: '独立选号', path: '/selection', hasDropdown: true },
  { label: '商品管理', path: '/products', hasDropdown: true },
  { label: '订单管理', path: '/orders', hasDropdown: false },
  { label: '卡密库存', path: '/inventory', hasDropdown: false },
  { label: '个人中心', path: '/profile', hasDropdown: true }
])

const isActive = (path) => {
  return route.path === path
}

const navigate = (path) => {
  router.push(path)
}

const handleSell = () => {
  router.push('/sell')
}
</script>

<style scoped>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 0;
  background: #ffffff;
}

.logo-section {
  padding: 0 20px 20px;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
}

.sell-button-section {
  padding: 20px;
}

.sell-button {
  width: 100%;
  height: 48px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.sell-button:hover {
  background: #40a9ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.sell-button:active {
  transform: translateY(0);
}

.nav-menu {
  flex: 1;
  padding: 10px 0;
}

.menu-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: #e6f7ff;
  border-left-color: #1890ff;
}

.menu-item.active {
  background: #e6f7ff;
  border-left-color: #1890ff;
}

.menu-item.active .menu-text {
  color: #1890ff;
  font-weight: 500;
}

.menu-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.menu-text {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.dropdown-icon {
  color: #999;
  display: flex;
  align-items: center;
}
</style>

