<template>
  <div class="account-form">
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

    <!-- 商品基本信息标题 -->
    <h3 class="section-title"><span class="title-number">3.</span> 商品基本信息</h3>

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
      <div class="buttons">
        <el-button class="button">批量设置发货倍数</el-button>
        <el-button class="button">批量设置发货附言</el-button>
        <el-button class="button">批量设置优惠</el-button>
      </div>
      
      
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { QuestionFilled, Plus, Close } from '@element-plus/icons-vue'

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

// SKU类型
const skuType = ref('with')

// 文件上传相关
const uploadedFiles = ref([])
const uploadSource = ref('local')
const fileInput = ref(null)

const triggerUpload = () => {
  if (uploadSource.value === 'local') {
    fileInput.value?.click()
  } else {
    // 图库选择逻辑
    console.log('打开图库')
  }
}

const handleFileChange = (event) => {
  const files = event.target.files
  if (!files || files.length === 0) return
  
  for (let i = 0; i < files.length; i++) {
    if (uploadedFiles.value.length >= 10) break
    
    const file = files[i]
    const reader = new FileReader()
    
    reader.onload = (e) => {
      uploadedFiles.value.push({
        url: e.target.result,
        file: file
      })
    }
    
    reader.readAsDataURL(file)
  }
  
  // 清空 input 以便重复选择同一文件
  event.target.value = ''
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

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
.batch-settings .buttons .button {
  background-color: rgb(51, 51, 51);
  color: white;
  margin-right: 12px;
}

/* 表格样式 */
.batch-settings table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.batch-settings table td {
  padding: 16px;
  border: 1px solid #e8e8e8;
  vertical-align: top;
}

.batch-settings table td:first-child {
  width: 140px;
  background-color: #fafafa;
  font-weight: 500;
  color: #333;
}

/* 文件上传样式 */
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image-preview-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.image-preview-item {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-preview-item:hover .image-overlay {
  opacity: 1;
}

.remove-icon {
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.upload-box {
  width: 100px;
  height: 100px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #fafafa;
}

.upload-box:hover {
  border-color: #1890ff;
  background-color: #f0f5ff;
}

.upload-icon {
  font-size: 32px;
  color: #999;
}

.upload-box:hover .upload-icon {
  color: #1890ff;
}

.upload-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.upload-actions .el-button {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  color: #666;
  padding: 8px 20px;
}

.upload-actions .el-button.active {
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
}

.upload-tip {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
}

.upload-tip .highlight {
  color: #1890ff;
  font-weight: 500;
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

/* 规格与库存表格 */
.full-width {
  flex-direction: column;
}

.inventory-table {
  width: 100%;
}

:deep(.inventory-table .el-table__header-wrapper) {
  display: none;
}

:deep(.inventory-table .el-table__cell) {
  padding: 16px 0;
  vertical-align: top;
}

:deep(.inventory-table .el-table__body-wrapper .el-table__cell:first-child) {
  background: #fafafa;
  padding-left: 20px;
}

:deep(.inventory-table .el-table__body-wrapper .el-table__cell:nth-child(2)) {
  padding: 16px 20px;
}

:deep(.inventory-table .el-table__body-wrapper .el-table__cell:last-child) {
  padding: 16px 20px;
  background: #f9f9f9;
}

.table-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.table-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hint-text {
  font-size: 13px;
  color: #999;
}

.value-text {
  font-size: 14px;
  color: #666;
}

.inline-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-left: 20px;
}

/* 上传区域 */
.upload-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upload-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.upload-tip {
  font-size: 13px;
  color: #999;
}

/* 快速填充网格 */
.quick-fill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.field-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

/* 标题预览 */
.title-preview {
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  min-height: 40px;
  line-height: 1.5;
}

/* 优惠列表 */
.discount-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.discount-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
}

/* 便捷操作栏 */
.table-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}

/* 输入框样式 */
:deep(.el-input-group__prepend) {
  background-color: #fafafa;
  color: #999;
  border-color: #e8e8e8;
  padding: 0 16px;
}

:deep(.el-input-group__append) {
  background-color: #fafafa;
  color: #666;
  border-color: #e8e8e8;
  padding: 0 16px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 80px;
  height: 80px;
}

:deep(.el-upload--picture-card) {
  width: 80px;
  height: 80px;
}

/* Element Plus 表单项样式 */
:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}

:deep(.el-input-group__append) {
  background-color: #fafafa;
  color: #666;
  border-color: #e8e8e8;
}

:deep(.el-select) {
  width: 100%;
}

/* SKU类型选择 */
.sku-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
}

.sku-tab {
  flex: 1;
  padding: 16px 24px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.sku-tab:hover {
  background: #e8e8e8;
}

.sku-tab.active {
  background: #fff;
  border-color: #1890ff;
  color: #1890ff;
  font-weight: 500;
}

/* 商品基本信息标题 */
.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
}

.title-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #1890ff;
  color: #fff;
  border-radius: 50%;
  font-size: 16px;
  margin-right: 12px;
}
</style>

