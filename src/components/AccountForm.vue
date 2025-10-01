<template>
  <div class="account-form">
    <!-- 快速选填 -->
    <div class="quick-fill">
      <div class="quick-fill-header">
        <span class="label">快速选填</span>
        <span class="hint">勾选这里的分类可以生成【快捷填写框】，使用这个功能将更方便买家筛选商品哦~</span>
        <el-icon class="help-icon"><QuestionFilled /></el-icon>
      </div>

      <div class="quick-fill-options">
        <el-checkbox v-model="localSelectAll" @change="handleSelectAll">全选</el-checkbox>
        <el-checkbox v-model="formData.cardDraws">抽卡次数</el-checkbox>
        <el-checkbox v-model="formData.primogems">原石</el-checkbox>
        <el-checkbox v-model="formData.acquaintFate">相遇之缘</el-checkbox>
        <el-checkbox v-model="formData.intertwinedFate">纠缠之缘</el-checkbox>
        <el-checkbox v-model="formData.accountLevel">账号等级</el-checkbox>
        <el-checkbox v-model="formData.popularCharacters">热门角色</el-checkbox>
        <div class="inline-input">
          <span>数量</span>
          <el-input-number
            v-model="formData.quantity"
            :min="1"
            size="small"
            style="width: 100px; margin-left: 8px"
          />
        </div>
        <el-checkbox v-model="formData.other">其它</el-checkbox>
      </div>
    </div>

    <!-- 是否填写商品详情 -->
    <div class="detail-option">
      <div class="detail-label">
        <span>是否填写商品详情</span>
        <span class="detail-hint">如果您需要在详情页中添加内容，请勾选是</span>
      </div>
      <el-radio-group v-model="formData.hasDetail">
        <el-radio label="yes">是</el-radio>
        <el-radio label="no">否</el-radio>
      </el-radio-group>
    </div>

    <!-- 批量设置标签页 -->
    <div class="batch-settings">
      <el-tabs v-model="activeTab" class="settings-tabs">
        <el-tab-pane label="批量设置发货倍数" name="multiplier"></el-tab-pane>
        <el-tab-pane label="批量设置发货附言" name="message"></el-tab-pane>
        <el-tab-pane label="批量设置优惠" name="discount"></el-tab-pane>
      </el-tabs>

      <!-- 商品轮播图 -->
      <div class="product-section">
        <div class="section-row">
          <div class="section-label">商品轮播图</div>
          <div class="section-content">
            <div class="upload-wrapper">
              <el-upload
                v-model:file-list="fileList"
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="10"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </div>
            <div class="upload-controls">
              <el-radio-group v-model="uploadSource" size="small">
                <el-radio label="local">本地</el-radio>
                <el-radio label="library">图库</el-radio>
              </el-radio-group>
            </div>
            <div class="upload-info">
              <span class="info-text">上传至这里的图片将作为商品首图，不上传将默认为账号首图</span>
              <a href="#" class="link-text" @click.prevent>设置优先</a>
              <a href="#" class="link-text danger" @click.prevent>删除</a>
            </div>
            <div class="upload-count">已经选择{{ fileList.length }}/10张</div>
          </div>
        </div>

        <!-- 商品标题 -->
        <div class="section-row">
          <div class="section-label">商品标题<span class="required">*</span></div>
          <div class="section-content">
            <el-input
              v-model="productTitle"
              placeholder="我现在想求一下商品"
              maxlength="50"
              show-word-limit
              style="width: 100%;"
            />
          </div>
        </div>

        <!-- 商品标题快速选填 -->
        <div class="section-row">
          <div class="section-label">商品标题<span class="sub-text">快速选填</span></div>
          <div class="section-content quick-inputs">
            <div v-if="formData.cardDraws" class="quick-input-item">
              <span class="input-name">抽卡次数</span>
              <el-input-number v-model="titleFields.cardDraws" :min="0" size="small" style="width: 120px;" />
            </div>
            <div v-if="formData.primogems" class="quick-input-item">
              <span class="input-name">原石</span>
              <el-input-number v-model="titleFields.primogems" :min="0" size="small" style="width: 120px;" />
            </div>
            <div v-if="formData.acquaintFate" class="quick-input-item">
              <span class="input-name">相遇之缘</span>
              <el-input-number v-model="titleFields.acquaintFate" :min="0" size="small" style="width: 120px;" />
            </div>
            <div v-if="formData.intertwinedFate" class="quick-input-item">
              <span class="input-name">纠缠之缘</span>
              <el-input-number v-model="titleFields.intertwinedFate" :min="0" size="small" style="width: 120px;" />
            </div>
            <div v-if="formData.accountLevel" class="quick-input-item">
              <span class="input-name">账号等级</span>
              <el-input-number v-model="titleFields.accountLevel" :min="0" size="small" style="width: 120px;" />
            </div>
            <div v-if="formData.popularCharacters" class="quick-input-item">
              <span class="input-name">热门角色</span>
              <el-input v-model="titleFields.popularCharacters" size="small" style="width: 200px;" />
            </div>
          </div>
        </div>

        <!-- 标题预览 -->
        <div class="section-row">
          <div class="section-label">标题预览</div>
          <div class="section-content">
            <div class="preview-box">
              {{ generatedTitle || '抽卡次数99 原石200 账号等级60 我现在想求一下商品' }}
            </div>
          </div>
        </div>

        <!-- 规格与库存 -->
        <div class="section-row">
          <div class="section-label">规格与库存</div>
          <div class="section-content inventory-content">
            <!-- 商品库存 -->
            <div class="inventory-line">
              <span class="line-label">商品库存</span>
              <el-select v-model="inventoryType" placeholder="请选择" size="default" style="width: 120px;">
                <el-option label="选择" value="select" />
              </el-select>
              <el-select v-model="inventoryCategory" placeholder="选择" size="default" style="width: 120px; margin-left: 12px;">
                <el-option label="选择" value="category" />
              </el-select>
              <el-input v-model="unitPrice" placeholder="请输入单价" size="default" style="width: 200px; margin-left: 12px;">
                <template #prepend>
                  <span style="color: #999;">默认值 N%</span>
                </template>
              </el-input>
            </div>

            <!-- 发货倍数和附言 -->
            <div class="inventory-line">
              <span class="line-label">发货倍数</span>
              <span class="line-hint">默认为 N%</span>
              <span class="line-value">发货倍数</span>
              <span class="line-label" style="margin-left: 40px;">发货附言</span>
              <el-input placeholder="请输入您的留言" size="default" style="width: 300px; margin-left: 12px;" />
              <el-button type="text" style="color: #1890ff; margin-left: 12px;">编辑</el-button>
            </div>

            <!-- 设置优惠预设 -->
            <div class="inventory-line">
              <span class="line-label">设置优惠预设：</span>
              <el-button size="small" plain>100件，2元</el-button>
              <el-button size="small" plain style="margin-left: 8px;">200件，1.5元</el-button>
              <el-button size="small" plain style="margin-left: 8px;">300件，1.3元</el-button>
              <el-button size="small" plain style="margin-left: 8px;">400件，1元</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { QuestionFilled, Plus } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
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
  }
})

const emit = defineEmits(['update:modelValue'])

const formData = ref({ ...props.modelValue })
const localSelectAll = ref(false)

// 批量设置标签
const activeTab = ref('multiplier')

// 商品轮播图
const fileList = ref([])
const uploadSource = ref('local')

// 商品标题
const productTitle = ref('')

// 商品标题快速填写字段
const titleFields = ref({
  cardDraws: 99,
  primogems: 200,
  acquaintFate: 0,
  intertwinedFate: 0,
  accountLevel: 60,
  popularCharacters: ''
})

// 生成的标题
const generatedTitle = computed(() => {
  const parts = []
  if (formData.value.cardDraws && titleFields.value.cardDraws) {
    parts.push(`抽卡次数${titleFields.value.cardDraws}`)
  }
  if (formData.value.primogems && titleFields.value.primogems) {
    parts.push(`原石${titleFields.value.primogems}`)
  }
  if (formData.value.acquaintFate && titleFields.value.acquaintFate) {
    parts.push(`相遇之缘${titleFields.value.acquaintFate}`)
  }
  if (formData.value.intertwinedFate && titleFields.value.intertwinedFate) {
    parts.push(`纠缠之缘${titleFields.value.intertwinedFate}`)
  }
  if (formData.value.accountLevel && titleFields.value.accountLevel) {
    parts.push(`账号等级${titleFields.value.accountLevel}`)
  }
  if (formData.value.popularCharacters && titleFields.value.popularCharacters) {
    parts.push(`热门角色${titleFields.value.popularCharacters}`)
  }
  
  return parts.length > 0 ? parts.join(' ') + ' ' + productTitle.value : productTitle.value
})

// 规格与库存
const inventoryType = ref('select')
const inventoryCategory = ref('')
const unitPrice = ref('')

const handleSelectAll = (val) => {
  formData.value.cardDraws = val
  formData.value.primogems = val
  formData.value.acquaintFate = val
  formData.value.intertwinedFate = val
  formData.value.accountLevel = val
  formData.value.popularCharacters = val
  formData.value.other = val
}

// 同步数据到父组件
watch(formData, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })
</script>

<style scoped>
.account-form {
  width: 100%;
}

.quick-fill {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 32px;
}

.quick-fill-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.quick-fill-header .label {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.quick-fill-header .hint {
  font-size: 13px;
  color: #999;
  flex: 1;
}

.help-icon {
  color: #999;
  cursor: pointer;
  font-size: 16px;
}

.quick-fill-options {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}

.inline-input {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
}

.detail-option {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 32px;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.detail-hint {
  font-size: 13px;
  color: #999;
  font-weight: normal;
}

/* 批量设置 */
.batch-settings {
  margin-top: 24px;
}

.settings-tabs {
  margin-bottom: 20px;
}

:deep(.settings-tabs .el-tabs__item) {
  background: #3d3d3d;
  color: #fff;
  border-radius: 6px 6px 0 0;
  padding: 12px 0;
  margin-right: 4px;
  font-size: 14px;
  height: auto;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.settings-tabs .el-tabs__item:hover) {
  background: #4d4d4d;
}

:deep(.settings-tabs .el-tabs__item.is-active) {
  background: #3d3d3d;
}

/* 商品表格 */
.product-section {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
}

.section-row {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  min-height: 60px;
}

.section-row:last-child {
  border-bottom: none;
}

.section-label {
  width: 140px;
  padding: 16px 20px;
  background: #fafafa;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
}

.section-content {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.required {
  color: #ff4d4f;
  margin-left: 4px;
}

.sub-text {
  font-size: 13px;
  color: #999;
  font-weight: normal;
  margin-left: 4px;
}

/* 上传相关 */
.upload-wrapper {
  display: flex;
  gap: 8px;
}

.upload-controls {
  display: flex;
  align-items: center;
}

.upload-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.info-text {
  color: #999;
}

.link-text {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
}

.link-text:hover {
  text-decoration: underline;
}

.link-text.danger {
  color: #ff4d4f;
}

.upload-count {
  font-size: 13px;
  color: #1890ff;
}

/* 快速输入 */
.quick-inputs {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.quick-input-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-name {
  font-size: 14px;
  color: #333;
}

/* 标题预览 */
.preview-box {
  width: 100%;
  padding: 12px 16px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  min-height: 40px;
}

/* 规格与库存 */
.inventory-content {
  flex-direction: column;
  gap: 16px;
}

.inventory-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.line-label {
  font-size: 14px;
  color: #333;
}

.line-hint {
  font-size: 12px;
  color: #999;
}

.line-value {
  font-size: 14px;
  color: #666;
}
</style>

