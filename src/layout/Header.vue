<template>
  <div class="header-wrapper">
    <div class="tabs-container">
      <!-- 固定的工作台标签 -->
      <div
        class="tab-item"
        :class="{ active: isActive('/workspace') }"
        @click="switchTab('/workspace')"
      >
        <span class="tab-title">工作台</span>
      </div>
      
      <!-- 其他标签 -->
      <div
        v-for="tab in otherTabs"
        :key="tab.path"
        class="tab-item"
        :class="{ active: isActive(tab.path) }"
        @click="switchTab(tab.path)"
      >
        <span class="tab-title">{{ tab.title }}</span>
        <button
          class="close-btn"
          @click.stop="closeTab(tab.path)"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = ref([])

const titleMap = {
  '/workspace': '工作台',
  '/sell': '发布商品',
  '/selection': '独立选号',
  '/products': '商品管理',
  '/orders': '订单管理',
  '/inventory': '卡密库存',
  '/profile': '个人中心'
}

// 动态获取标题
const getPageTitle = (path) => {
  if (path === '/sell') {
    const productType = route.query.productType
    if (productType) {
      return `${productType}发布`
    }
    return '发布商品'
  }
  return titleMap[path] || '初始喵'
}

// 过滤掉工作台，显示其他标签
const otherTabs = computed(() => {
  return tabs.value.filter(tab => tab.path !== '/workspace')
})

// 添加标签页
const addTab = (path) => {
  // 工作台始终存在，不添加到tabs中
  if (path === '/workspace') return
  
  const title = getPageTitle(path)
  if (!title) return
  
  const exists = tabs.value.find(tab => tab.path === path)
  if (!exists) {
    tabs.value.push({ path, title, query: route.query })
  } else {
    // 更新已存在标签的标题
    exists.title = title
    exists.query = route.query
  }
}

// 关闭标签页
const closeTab = (path) => {
  const index = tabs.value.findIndex(tab => tab.path === path)
  if (index === -1) return
  
  tabs.value.splice(index, 1)
  
  // 如果关闭的是当前标签，跳转到工作台
  if (isActive(path)) {
    router.push('/workspace')
  }
}

// 切换标签页
const switchTab = (path) => {
  router.push(path)
}

// 判断是否是当前标签
const isActive = (path) => {
  return route.path === path
}

// 监听路由变化，自动添加标签
watch(() => route.path, (newPath) => {
  addTab(newPath)
}, { immediate: true })

// 监听路由query变化，更新标签标题
watch(() => route.query, () => {
  if (route.path === '/sell') {
    const tab = tabs.value.find(t => t.path === '/sell')
    if (tab) {
      tab.title = getPageTitle('/sell')
      tab.query = route.query
    }
  }
}, { deep: true })
</script>

<style scoped>
.header-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
}

.tabs-container {
  display: flex;
  gap: 0;
  height: 100%;
  align-items: stretch;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  user-select: none;
  border-right: 1px solid #e0e0e0;
}

.tab-item:hover {
  background: #f5f5f5;
}

.tab-item.active {
  background: #3d3d3d;
}

.tab-title {
  font-size: 15px;
  color: #333;
}

.tab-item.active .tab-title {
  color: #ffffff;
}

.close-btn {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 22px;
  line-height: 1;
  padding: 0;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #333;
}

.tab-item.active .close-btn {
  color: #fff;
}

.tab-item.active .close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
</style>

