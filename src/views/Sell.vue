<template>
  <div class="sell-container">
    <!-- 第一步：选择游戏分类 -->
    <div v-if="currentStep === 0" class="step-content">
      <!-- 页面标题 -->
      <h1 class="page-title">选择游戏分类</h1>

      <div class="content-card">
        <!-- 步骤指示器 -->
        <div class="steps-wrapper">
          <span class="step-label">发布商品</span>
          <el-steps :active="currentStep" class="custom-steps">
            <el-step title="选择游戏分类" />
            <el-step title="填写商品信息" />
            <el-step title="发布完成" />
          </el-steps>
        </div>
        <!-- 顶部历史选择 -->
        <div class="history-section">
          <span class="label">历史选择</span>
          <el-select
            v-model="historySelection"
            placeholder="请选择历史记录"
            class="history-select"
            clearable
          >
            <el-option label="历史记录1" value="1" />
            <el-option label="历史记录2" value="2" />
          </el-select>
          <a href="#" class="help-link" @click.prevent>找不到想要的游戏分类?</a>
        </div>

        <!-- 主选择区域 -->
        <div class="main-selection">
          <!-- 左侧游戏分类 -->
          <div class="game-categories">
            <div
              v-for="category in gameCategories"
              :key="category.id"
              class="category-item"
              :class="{ active: selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </div>
          </div>

          <!-- 右侧选择表格 -->
          <div class="selection-table" :class="{ 'has-expanded': isGameExpanded }">
            <!-- 游戏名 -->
            <div class="table-column" :class="{ expanded: isGameExpanded }">
              <div class="column-header">
                <div class="header-title">游戏名</div>
                <el-input
                  v-model="searchGame"
                  placeholder="请输入游戏名称"
                  clearable
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                  <template #suffix>
                    <span class="expand-text-btn" @click="toggleGameExpand">
                      {{ isGameExpanded ? '收起' : '展开' }}
                    </span>
                  </template>
                </el-input>
              </div>
              
              <!-- 列表视图 -->
              <div v-if="!isGameExpanded" class="column-list">
                <div
                  v-for="game in filteredGames"
                  :key="game.id"
                  class="list-item"
                  :class="{ selected: selectedGame === game.id }"
                  @click="selectGame(game)"
                >
                  {{ game.name }}
                </div>
              </div>

              <!-- 网格视图 -->
              <div v-else class="grid-view">
                <!-- 字母导航 -->
                <div class="letter-nav">
                  <div
                    v-for="letter in letters"
                    :key="letter"
                    class="letter-item"
                    :class="{ active: selectedLetter === letter }"
                    @click="selectLetter(letter)"
                  >
                    {{ letter }}
                  </div>
                </div>

                <!-- 游戏网格 -->
                <div class="game-grid">
                  <div
                    v-for="game in filteredGames"
                    :key="game.id"
                    class="game-card"
                    @click="selectGame(game)"
                  >
                    <div class="game-cover">
                      <img src="https://via.placeholder.com/150x100?text=游戏" alt="游戏封面">
                    </div>
                    <div class="game-name">{{ game.name }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 商品类型 -->
            <div class="table-column" v-if="selectedGame && !isGameExpanded">
              <div class="column-header">
                <div class="header-title">商品类型</div>
                <el-input
                  v-model="searchProductType"
                  placeholder="关键字"
                  clearable
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
              </div>
              <div class="column-list">
                <div v-if="!selectedGame" class="empty-hint">
                  请先选择游戏名
                </div>
                <div
                  v-else
                  v-for="type in filteredProductTypes"
                  :key="type.id"
                  class="list-item"
                  :class="{ selected: selectedType === type.id }"
                  @click="selectType(type)"
                >
                  {{ type.name }}
                </div>
              </div>
            </div>

            <!-- 游戏区服1 -->
            <div class="table-column" v-if="selectedType && !isGameExpanded">
              <div class="column-header">
                <div class="header-title">游戏区服1</div>
                <el-input
                  v-model="searchServer1"
                  placeholder="关键字"
                  clearable
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
              </div>
              <div class="column-list">
                <div v-if="!selectedType" class="empty-hint">
                  请先选择商品类型
                </div>
                <div
                  v-else
                  v-for="server in filteredServers1"
                  :key="server.id"
                  class="list-item"
                  :class="{ selected: selectedServer1 === server.id }"
                  @click="selectServer1(server)"
                >
                  {{ server.name }}
                </div>
              </div>
            </div>

            <!-- 游戏区服2 -->
            <div class="table-column" v-if="selectedServer1 && !isGameExpanded">
              <div class="column-header">
                <div class="header-title">游戏区服2</div>
                <el-input
                  v-model="searchServer2"
                  placeholder="关键字"
                  clearable
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
              </div>
              <div class="column-list">
                <div
                  v-for="server in filteredServers2"
                  :key="server.id"
                  class="list-item"
                  :class="{ selected: selectedServer2 === server.id }"
                  @click="selectServer2(server)"
                >
                  {{ server.name }}
                </div>
              </div>
            </div>

            <!-- 游戏区服3 -->
            <div class="table-column" v-if="selectedServer2 && !isGameExpanded">
              <div class="column-header">
                <div class="header-title">游戏区服3</div>
                <el-input
                  v-model="searchServer3"
                  placeholder="关键字"
                  clearable
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
              </div>
              <div class="column-list">
                <div
                  v-for="server in filteredServers3"
                  :key="server.id"
                  class="list-item"
                  :class="{ selected: selectedServer3 === server.id }"
                  @click="selectServer3(server)"
                >
                  {{ server.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部选择路径和按钮 -->
        <div class="selection-footer">
          <div class="selection-path">
            您的选择：{{ selectionPath }}
          </div>
          <el-button
            type="primary"
            size="large"
            class="next-button"
            :disabled="!isStep1Complete"
            @click="nextStep"
          >
            下一步，填写商品信息
          </el-button>
        </div>
      </div>

    </div>

    <!-- 第二步：填写商品信息 -->
    <div v-if="currentStep === 1" class="step-content">
      <div class="content-card">
        <!-- 面包屑导航 -->
        <div class="breadcrumb-nav">
          <span class="breadcrumb-item">选择游戏分类</span>
          <span class="breadcrumb-selection">【您的选择：{{ selectionPath }}】</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item current">填写商品信息</span>
        </div>

        <!-- 步骤条 -->
        <div class="steps-wrapper">
          <span class="step-label">{{ selectedTypeName ? selectedTypeName + '发布' : '发布商品' }}</span>
          <el-steps :active="currentStep" class="custom-steps">
            <el-step title="选择游戏分类" />
            <el-step title="填写商品信息" />
            <el-step title="发布完成" />
          </el-steps>
        </div>

        <!-- SKU类型选择 -->
        <div class="sku-tabs">
          <div
            class="sku-tab"
            :class="{ active: skuType === 'with' }"
            @click="skuType = 'with'"
          >
            带SKU商品发布（SKU上限N条）
          </div>
          <div
            class="sku-tab"
            :class="{ active: skuType === 'without' }"
            @click="skuType = 'without'"
          >
            不带SKU商品
          </div>
        </div>

        <!-- 商品基本信息 -->
        <div class="form-section">
          <h3 class="section-title"><span class="title-number">3.</span> 商品基本信息</h3>

          <!-- 自抽号/账号表单 -->
          <AccountForm 
            v-if="selectedTypeName === '自抽号' || selectedTypeName === '账号'" 
            v-model="accountFormData"
          />

          <!-- 道具表单 -->
          <ItemForm 
            v-else-if="selectedTypeName === '道具'" 
            v-model="itemFormData"
          />

          <!-- 表单操作按钮 -->
          <div class="form-actions">
            <el-button size="large" @click="prevStep">上一步</el-button>
            <el-button type="primary" size="large" @click="submitForm">
              发布商品
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三步：发布完成 -->
    <div v-if="currentStep === 2" class="step-content">
      <h1 class="page-title">发布完成</h1>
      <div class="content-card result-card">
        <el-result icon="success" title="发布成功" sub-title="您的商品已成功发布">
          <template #extra>
            <el-button type="primary" @click="goToProducts">查看商品</el-button>
            <el-button @click="resetForm">继续发布</el-button>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import AccountForm from '../components/AccountForm.vue'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()
const route = useRoute()
const currentStep = ref(0)
const formRef = ref(null)

// 历史选择
const historySelection = ref('')

// 游戏分类
const gameCategories = ref([
  { id: 'all', name: '全部游戏' },
  { id: 'online', name: '网络游戏' },
  { id: 'mobile', name: '手机游戏' },
  { id: 'mihoyo', name: '米哈游系列' },
  { id: 'favorite', name: '我收藏的游戏' }
])

const selectedCategory = ref('all')

// 字母导航
const letters = ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const selectedLetter = ref('全部')

const selectLetter = (letter) => {
  selectedLetter.value = letter
  // 这里可以根据字母过滤游戏
}

// 游戏列表
const games = ref([
  { id: 1, name: '游戏名称1' },
  { id: 2, name: '游戏名称2' },
  { id: 3, name: '游戏名称3' },
  { id: 4, name: '游戏名称4' },
  { id: 5, name: '游戏名称5' },
  { id: 6, name: '游戏名称6' },
  { id: 7, name: '游戏名称7' },
  { id: 8, name: '游戏名称8' },
  { id: 9, name: '游戏名称9' },
  { id: 10, name: '游戏名称10' }
])

const searchGame = ref('')
const selectedGame = ref(null)
const selectedGameName = ref('')

const filteredGames = computed(() => {
  if (!searchGame.value) return games.value
  return games.value.filter(game =>
    game.name.toLowerCase().includes(searchGame.value.toLowerCase())
  )
})

// 商品类型
const searchProductType = ref('')
const allProductTypes = ref([
  { id: 1, name: '自抽号' },
  { id: 2, name: '账号' },
  { id: 3, name: '道具' }
])
const selectedType = ref(null)
const selectedTypeName = ref('')

const filteredProductTypes = computed(() => {
  if (!searchProductType.value) return allProductTypes.value
  return allProductTypes.value.filter(type =>
    type.name.toLowerCase().includes(searchProductType.value.toLowerCase())
  )
})

// 区服
const servers1 = ref([
  { id: 1, name: '游戏区服1' },
  { id: 2, name: '游戏区服1' },
  { id: 3, name: '游戏区服1' },
  { id: 4, name: '游戏区服1' },
  { id: 5, name: '游戏区服1' }
])

const servers2 = ref([
  { id: 1, name: '游戏区服2' },
  { id: 2, name: '游戏区服2' },
  { id: 3, name: '游戏区服2' }
])

const servers3 = ref([
  { id: 1, name: '游戏区服3' },
  { id: 2, name: '游戏区服3' },
  { id: 3, name: '游戏区服3' },
  { id: 4, name: '游戏区服3' }
])

const searchServer1 = ref('')
const searchServer2 = ref('')
const searchServer3 = ref('')
const selectedServer1 = ref(null)
const selectedServer2 = ref(null)
const selectedServer3 = ref(null)
const selectedServer1Name = ref('')
const selectedServer2Name = ref('')
const selectedServer3Name = ref('')

const filteredServers1 = computed(() => {
  if (!searchServer1.value) return servers1.value
  return servers1.value.filter(s =>
    s.name.toLowerCase().includes(searchServer1.value.toLowerCase())
  )
})

const filteredServers2 = computed(() => {
  if (!searchServer2.value) return servers2.value
  return servers2.value.filter(s =>
    s.name.toLowerCase().includes(searchServer2.value.toLowerCase())
  )
})

const filteredServers3 = computed(() => {
  if (!searchServer3.value) return servers3.value
  return servers3.value.filter(s =>
    s.name.toLowerCase().includes(searchServer3.value.toLowerCase())
  )
})

// 选择路径
const selectionPath = computed(() => {
  const parts = []
  if (selectedGameName.value) parts.push(selectedGameName.value)
  if (selectedTypeName.value) parts.push(selectedTypeName.value)
  if (selectedServer1Name.value) parts.push(selectedServer1Name.value)
  if (selectedServer2Name.value) parts.push(selectedServer2Name.value)
  if (selectedServer3Name.value) parts.push(selectedServer3Name.value)
  return parts.join(' / ') || '未选择'
})

const isStep1Complete = computed(() => {
  return selectedGame.value && selectedType.value
})

// 第二步表单数据
const skuType = ref('without')

// 账号表单数据
const accountFormData = ref({
  cardDraws: false,
  primogems: false,
  acquaintFate: false,
  intertwinedFate: false,
  accountLevel: false,
  popularCharacters: false,
  quantity: 1,
  other: false,
  hasDetail: 'no'
})

// 道具表单数据
const itemFormData = ref({
  itemName: false,
  itemType: false,
  itemRarity: false,
  quantity: 1,
  hasDetail: 'no'
})

// 方法
const selectCategory = (id) => {
  selectedCategory.value = id
}

const isGameExpanded = ref(false)

const toggleGameExpand = () => {
  isGameExpanded.value = !isGameExpanded.value
}

const selectGame = (game) => {
  selectedGame.value = game.id
  selectedGameName.value = game.name
  // 重置后续选择
  selectedType.value = null
  selectedTypeName.value = ''
  selectedServer1.value = null
  selectedServer1Name.value = ''
  selectedServer2.value = null
  selectedServer2Name.value = ''
  selectedServer3.value = null
  selectedServer3Name.value = ''
}


const selectType = (type) => {
  selectedType.value = type.id
  selectedTypeName.value = type.name
  // 重置后续选择
  selectedServer1.value = null
  selectedServer1Name.value = ''
  selectedServer2.value = null
  selectedServer2Name.value = ''
  selectedServer3.value = null
  selectedServer3Name.value = ''
}

const selectServer1 = (server) => {
  selectedServer1.value = server.id
  selectedServer1Name.value = server.name
  // 重置后续选择
  selectedServer2.value = null
  selectedServer2Name.value = ''
  selectedServer3.value = null
  selectedServer3Name.value = ''
}

const selectServer2 = (server) => {
  selectedServer2.value = server.id
  selectedServer2Name.value = server.name
  // 重置后续选择
  selectedServer3.value = null
  selectedServer3Name.value = ''
}

const selectServer3 = (server) => {
  selectedServer3.value = server.id
  selectedServer3Name.value = server.name
}

const nextStep = () => {
  if (!isStep1Complete.value) {
    ElMessage.warning('请完成游戏和类型的选择')
    return
  }
  // 进入第二步时更新路由，添加商品类型信息，标签页标题会相应改变
  router.replace({
    path: '/sell',
    query: { productType: selectedTypeName.value }
  })
  currentStep.value++
}

const prevStep = () => {
  currentStep.value--
  // 返回第一步时清除 query 参数，标签页标题恢复为"发布商品"
  if (currentStep.value === 0) {
    router.replace({ path: '/sell', query: {} })
  }
}

const submitForm = () => {
  console.log('提交表单')
  ElMessage.success('商品发布成功！')
  currentStep.value++
}

const goToProducts = () => {
  router.push('/products')
}

const resetForm = () => {
  currentStep.value = 0
  selectedGame.value = null
  selectedGameName.value = ''
  selectedType.value = null
  selectedTypeName.value = ''
  selectedServer1.value = null
  selectedServer1Name.value = ''
  selectedServer2.value = null
  selectedServer2Name.value = ''
  selectedServer3.value = null
  selectedServer3Name.value = ''
  skuType.value = 'without'
  
  // 重置账号表单
  accountFormData.value = {
    cardDraws: false,
    primogems: false,
    acquaintFate: false,
    intertwinedFate: false,
    accountLevel: false,
    popularCharacters: false,
    quantity: 1,
    other: false,
    hasDetail: 'no'
  }
  
  // 重置道具表单
  itemFormData.value = {
    itemName: false,
    itemType: false,
    itemRarity: false,
    quantity: 1,
    hasDetail: 'no'
  }
  
  router.replace({ path: '/sell', query: {} })
}

// Watch for route query changes to initialize selectedTypeName if page is refreshed
watch(() => route.query.productType, (newType) => {
  if (newType) {
    selectedTypeName.value = newType
  }
}, { immediate: true })
</script>

<style scoped>
.sell-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.step-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.content-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 20px;
  font-weight: 400;
  color: #999;
  margin: 0 0 16px 0;
  padding: 0 20px;
}

.steps-wrapper {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 30px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e8e8e8;
}

.step-label {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.history-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.label {
  font-size: 15px;
  color: #333;
  white-space: nowrap;
  font-weight: 500;
}

.history-select {
  flex: 1;
  max-width: 800px;
}

.help-link {
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
  margin-left: auto;
}

.help-link:hover {
  text-decoration: underline;
}

.main-selection {
  flex: 1;
  display: flex;
  gap: 16px;
  overflow: hidden;
  min-height: 0;
}

.game-categories {
  width: 200px;
  background: #f2f2f2;
  border-radius: 12px;
  overflow-y: auto;
  flex-shrink: 0;
  padding: 8px;
}

.category-item {
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  color: #333;
  background: #f2f2f2;
  border-radius: 8px;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 500;
}

.category-item:last-child {
  margin-bottom: 0;
}

.category-item:hover {
  background: #e0e0e0;
}

.category-item.active {
  background: #3d3d3d;
  color: #fff;
}

.selection-table {
  flex: 1;
  display: flex;
  gap: 12px;
  overflow: hidden;
  min-width: 0;
}

.table-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
}

.selection-table.has-expanded .table-column.expanded {
  flex: 1;
  width: 100%;
}

.column-header {
  margin-bottom: 12px;
}

.header-title {
  font-size: 15px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.column-list {
  flex: 1;
  overflow-y: auto;
  background: #fff;
  border-radius: 6px;
  padding: 6px;
  border: 1px solid #e8e8e8;
}

.list-item {
  padding: 12px 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #666;
  border-radius: 4px;
  margin-bottom: 4px;
}

.list-item:last-child {
  margin-bottom: 0;
}

.list-item:hover {
  background: #f5f5f5;
  color: #333;
}

.list-item.selected {
  background: #3d3d3d;
  color: #fff;
  font-weight: 500;
}

.selection-footer {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selection-path {
  font-size: 15px;
  color: #666;
}

.next-button {
  min-width: 220px;
  height: 44px;
  font-size: 15px;
}

/* 第二步：填写商品信息 */
.breadcrumb-nav {
  padding: 16px 0;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 24px;
}

.breadcrumb-item {
  color: #666;
}

.breadcrumb-item.current {
  color: #1890ff;
}

.breadcrumb-selection {
  color: #999;
  margin: 0 8px;
}

.breadcrumb-separator {
  margin: 0 12px;
  color: #999;
}

.sku-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  border-bottom: 2px solid #e8e8e8;
}

.sku-tab {
  padding: 12px 24px;
  cursor: pointer;
  font-size: 15px;
  color: #666;
  position: relative;
  transition: all 0.2s;
}

.sku-tab:hover {
  color: #1890ff;
}

.sku-tab.active {
  color: #1890ff;
  font-weight: 500;
}

.sku-tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #1890ff;
}

.form-section {
  padding: 0;
}

.section-title {
  font-size: 18px;
  color: #333;
  margin: 0 0 24px 0;
  font-weight: 500;
}

.title-number {
  color: #1890ff;
  margin-right: 8px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
}

.result-card {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-card__header) {
  background: #fafafa;
}

:deep(.el-card__header) {
  background: #fafafa;
}

.custom-steps {
  flex: 1;
  max-width: 1000px;
}

:deep(.custom-steps .el-step__title) {
  font-size: 15px;
}

:deep(.custom-steps .el-step__icon) {
  width: 36px;
  height: 36px;
  font-size: 16px;
}

:deep(.el-input__inner) {
  border-radius: 6px;
}

:deep(.el-select .el-input__inner) {
  height: 40px;
  line-height: 40px;
}

:deep(.el-button--large) {
  border-radius: 6px;
}

.expand-text-btn {
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.expand-text-btn:hover {
  color: #40a9ff;
}

.empty-hint {
  padding: 40px 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

/* 网格视图 */
.grid-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.letter-nav {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.letter-item {
  padding: 4px 10px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  transition: all 0.2s;
  user-select: none;
}

.letter-item:hover {
  background: #e8e8e8;
}

.letter-item.active {
  background: #3d3d3d;
  color: #fff;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}

.game-card {
  cursor: pointer;
  transition: all 0.2s;
}

.game-card:hover {
  transform: translateY(-2px);
}

.game-cover {
  width: 100%;
  aspect-ratio: 3/2;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 8px;
}

.game-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-name {
  text-align: center;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

