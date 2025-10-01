<template>
  <div class="item-form">
    <!-- 道具信息 -->
    <div class="quick-fill">
      <div class="quick-fill-header">
        <span class="label">道具信息</span>
        <span class="hint">请填写道具相关信息</span>
        <el-icon class="help-icon"><QuestionFilled /></el-icon>
      </div>

      <div class="quick-fill-options">
        <el-checkbox v-model="formData.itemName">道具名称</el-checkbox>
        <el-checkbox v-model="formData.itemType">道具类型</el-checkbox>
        <el-checkbox v-model="formData.itemRarity">道具稀有度</el-checkbox>
        <div class="inline-input">
          <span>数量</span>
          <el-input-number
            v-model="formData.quantity"
            :min="1"
            size="small"
            style="width: 100px; margin-left: 8px"
          />
        </div>
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      itemName: false,
      itemType: false,
      itemRarity: false,
      quantity: 1,
      hasDetail: 'no'
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const formData = ref({ ...props.modelValue })

// 同步数据到父组件
watch(formData, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })
</script>

<style scoped>
.item-form {
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
</style>

