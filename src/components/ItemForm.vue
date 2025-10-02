<template>
  <div class="item-form">
    <!-- 发货方式 -->
    <h3 class="section-title">
      <span class="title-number">1.</span> 发货方式
    </h3>

    <div class="delivery-options">
      <!-- 自动发货 -->
      <div 
        class="delivery-card" 
        :class="{ active: deliveryMethod === 'auto' }"
        @click="deliveryMethod = 'auto'"
      >
        <div class="card-icon">
          <el-icon :size="48"><Box /></el-icon>
        </div>
        <div class="card-content">
          <h4 class="card-title">自动发货</h4>
          <p class="card-desc">您需要填写游戏账号资料</p>
          <p class="card-detail">
            商品被购买后，平台将为您自动发货。您的账号资料经过加密保存，保障您的库存安全
          </p>
        </div>
        <div class="card-check">
          <el-icon :size="24"><CircleCheck /></el-icon>
        </div>
      </div>

      <!-- 手动发货 -->
      <div 
        class="delivery-card" 
        :class="{ active: deliveryMethod === 'manual' }"
        @click="deliveryMethod = 'manual'"
      >
        <div class="card-icon">
          <el-icon :size="48"><User /></el-icon>
        </div>
        <div class="card-content">
          <h4 class="card-title">手动发货</h4>
          <p class="card-desc">您无需填写游戏账号资料</p>
          <p class="card-detail">
            商品被购买后，您务必亲自登录后台，确认买家信息后进行发货，脱离平台私下交易有风险！
          </p>
        </div>
        <div class="card-check">
          <el-icon :size="24"><CircleCheck /></el-icon>
        </div>
      </div>
    </div>

    <!-- 规格与库存 -->
    <h3 class="section-title">
      <span class="title-number">4.</span> 规格与库存
    </h3>

    <!-- 道具规格说明 -->
    <div class="spec-tips">
      <span class="tips-label">道具规格</span>
      <span class="tips-text">
        展示顺时：该类目自助区/商场区下按优先级排序<span class="highlight">N个</span>商品，贴出您分店的商品，售出您分店补货提示。
      </span>
    </div>

    <!-- 规格表格 -->
    <table class="spec-table">
      <thead>
        <tr>
          <th style="width: 400px;">数量<span class="required">*</span></th>
          <th style="width: 300px;">总价<span class="required">*</span></th>
          <th style="width: 150px;">
            库存<span class="required">*</span>
          </th>
          <th>商品标题</th>
          <th style="width: 100px;">便捷操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(spec, index) in specList" :key="index">
          <td>
            <el-input
                v-model="spec.quantity"
                style="max-width: 600px"
                placeholder="请输入"
            >
              <template #append>金币</template>
            </el-input>
          </td>
          <td>
            <div class="price-inputs">
              <el-input
                  style="margin-top: 10px;"
                  v-model="spec.priceLabel"
                  placeholder="买多少钱"
              >
                <template #append>元</template>
              </el-input>
            </div>
            <div style="color: rgb(192, 192, 192);font-size: 10px;">1金币=N元（1元=N金币）</div>
          </td>
          <td>
            <el-input
                v-model="spec.stock"
                placeholder="买多少钱"
            >
              <template #append>件</template>
            </el-input>

          </td>
          <td>
            <div class="auto-title">由您填写的内容自动生成</div>
          </td>
          <td>
            <el-button 
              type="danger" 
              link 
              @click="removeSpec(index)"
            >
              删除
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 新增规格按钮 -->
    <div class="add-spec-wrapper">
      <el-button 
        class="add-spec-btn"
        @click="addSpec"
      >
        <el-icon style="margin-right: 4px;"><CircleCheck /></el-icon>
        新增规格({{ specList.length }}/N)
      </el-button>
      <el-icon class="help-icon"><QuestionFilled /></el-icon>
    </div>

    <!-- 交易与售后 -->
    <h3 class="section-title">
      <span class="title-number">5.</span> 交易与售后
    </h3>

    <!-- 交易方式 -->
    <div class="trade-method-section">
      <div class="section-label">交易方式</div>
      <el-radio-group v-model="tradeMethod">
        <el-radio label="mail">邮寄交易</el-radio>
        <el-radio label="face">当面交易</el-radio>
      </el-radio-group>
    </div>

    <!-- 联系方式 -->
    <div class="contact-section">
      <div class="section-label">联系方式</div>
      <div class="contact-form">
        <div class="form-item">
          <div class="item-label">
            手机号<span class="required">*</span>
          </div>
          <el-input
            v-model="phoneNumber"
            placeholder="请输入联系手机号码"
            style="width: 500px;"
          />
        </div>
        <div class="form-item">
          <div class="item-label">
            验证码<span class="required">*</span>
          </div>
          <el-input
            v-model="verifyCode"
            placeholder="请输入验证码"
            style="width: 500px;"
          >
            <template #suffix>
              <span 
                class="get-code-link"
                @click="getVerifyCode"
              >
                获取手机验证码
              </span>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <!-- 提交区域 -->
    <div class="submit-section">
      <!-- 协议复选框 -->
      <div class="agreement-checkbox">
        <el-checkbox v-model="agreedToTerms">
          已仔细阅读并同意
          <a href="#" class="agreement-link" @click.prevent>《欧皇初始喵用户服务协议》</a>
        </el-checkbox>
      </div>

      <!-- 操作按钮 -->
      <div class="submit-buttons">
        <el-button 
          type="primary" 
          size="large" 
          class="submit-btn"
          @click="handleSubmit"
        >
          提交并发布
        </el-button>
        <el-button 
          size="large" 
          class="draft-btn"
          @click="handleSaveDraft"
        >
          保存草稿({{ draftCount }}/100)
        </el-button>
      </div>

      <!-- 最后保存时间 -->
      <div class="last-save-time">
        <el-icon><Clock /></el-icon>
        <span>最后保存于{{ lastSaveTime }}</span>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Box, User, CircleCheck, QuestionFilled, Clock } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      deliveryMethod: 'manual'
    })
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const deliveryMethod = ref(props.modelValue.deliveryMethod || 'manual')

// 规格列表
const specList = ref([
  {
    quantity: '',
    currency: 'gold',
    stock: 1
  }
])

// 添加规格
const addSpec = () => {
  specList.value.push({
    quantity: '',
    currency: 'gold',
    stock: 1
  })
}

// 删除规格
const removeSpec = (index) => {
  if (specList.value.length > 1) {
    specList.value.splice(index, 1)
  }
}

// 交易与售后
const tradeMethod = ref('mail')
const phoneNumber = ref('')
const verifyCode = ref('')

// 获取验证码
const getVerifyCode = () => {
  if (!phoneNumber.value) {
    // 这里可以添加提示：请先输入手机号
    console.log('请先输入手机号')
    return
  }
  // 这里添加获取验证码的逻辑
  console.log('发送验证码到：', phoneNumber.value)
}

// 提交相关
const agreedToTerms = ref(false)
const draftCount = ref(0)
const lastSaveTime = ref('2025-08-11 14:43')

// 提交并发布
const handleSubmit = () => {
  if (!agreedToTerms.value) {
    console.log('请先同意用户服务协议')
    // 这里可以添加 ElMessage 提示
    return
  }
  
  // 发出提交事件，通知父组件
  emit('submit')
}

// 保存草稿
const handleSaveDraft = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  
  lastSaveTime.value = `${year}-${month}-${day} ${hours}:${minutes}`
  draftCount.value = Math.min(draftCount.value + 1, 100)
  
  console.log('保存草稿')
}

// 同步数据到父组件
watch(deliveryMethod, (newVal) => {
  emit('update:modelValue', {
    deliveryMethod: newVal
  })
})
</script>

<style scoped>
.item-form {
  width: 100%;
}

/* 标题样式 */
.section-title {
  font-size: 20px;
  font-weight: 500;
  color: #1890ff;
  margin: 0 0 32px 0;
  display: flex;
  align-items: center;
}

.title-number {
  margin-right: 8px;
}

/* 发货方式选项 */
.delivery-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.delivery-card {
  position: relative;
  background: #fafafa;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.delivery-card:hover {
  border-color: #1890ff;
  background: #f0f7ff;
}

.delivery-card.active {
  background: #fff;
  border-color: #1890ff;
  box-shadow: 0 2px 12px rgba(24, 144, 255, 0.15);
}

.card-icon {
  margin-bottom: 16px;
  color: #999;
}

.delivery-card.active .card-icon {
  color: #1890ff;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
}

.card-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
}

.card-detail {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  margin: 0;
}

.card-check {
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #d9d9d9;
  transition: all 0.3s;
}

.delivery-card.active .card-check {
  color: #1890ff;
}

/* 道具规格说明 */
.spec-tips {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
}

.tips-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.tips-text {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.highlight {
  color: #1890ff;
  font-weight: 500;
  margin: 0 2px;
}

/* 规格表格 */
.spec-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid #e8e8e8;
  margin-bottom: 16px;
}

.spec-table th {
  background: #fafafa;
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  border: 1px solid #e8e8e8;
}

.spec-table td {
  padding: 12px 16px;
  border: 1px solid #e8e8e8;
  vertical-align: middle;
}

.required {
  color: #ff4d4f;
  margin-left: 2px;
}

.sub-label {
  display: block;
  font-size: 12px;
  color: #999;
  font-weight: normal;
  margin-bottom: 4px;
}

/* 价格输入框 */
.price-inputs {
  display: flex;
  align-items: center;
  gap: 0;
}

.unit {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.unit-text {
  font-size: 14px;
  color: #999;
  margin-left: 8px;
}

/* 自动生成标题 */
.auto-title {
  font-size: 14px;
  color: #999;
  font-style: italic;
}

/* 新增规格按钮 */
.add-spec-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}

.add-spec-btn {
  background: #333;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.add-spec-btn:hover {
  background: #444;
  color: white;
}

.help-icon {
  color: #999;
  font-size: 16px;
  cursor: pointer;
}

.help-icon:hover {
  color: #1890ff;
}

/* 交易与售后 */
.trade-method-section {
  margin-bottom: 32px;
}

.contact-section {
  margin-bottom: 32px;
}

.section-label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item-label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  min-width: 80px;
}

.get-code-link {
  font-size: 14px;
  color: #1890ff;
  cursor: pointer;
  white-space: nowrap;
  padding-right: 8px;
}

.get-code-link:hover {
  color: #40a9ff;
}

/* Element Plus Radio 样式调整 */
:deep(.el-radio) {
  margin-right: 32px;
}

:deep(.el-radio__label) {
  font-size: 14px;
  color: #333;
}

/* 提交区域 */
.submit-section {
  border-top: 1px solid #e8e8e8;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 0;
}

.agreement-checkbox {
  display: flex;
  justify-content: center;
}

.agreement-link {
  color: #1890ff;
  text-decoration: none;
  margin-left: 4px;
}

.agreement-link:hover {
  text-decoration: underline;
}

.submit-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.submit-btn {
  background-color: #333;
  border-color: #333;
  color: white;
  min-width: 160px;
  font-size: 16px;
  border-radius: 8px;
}

.submit-btn:hover {
  background-color: #444;
  border-color: #444;
}

.draft-btn {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  color: #666;
  min-width: 180px;
  font-size: 16px;
  border-radius: 8px;
}

.draft-btn:hover {
  background-color: #e8e8e8;
  border-color: #d9d9d9;
}

.last-save-time {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999;
  font-size: 14px;
}

.last-save-time .el-icon {
  color: #1890ff;
  font-size: 16px;
}

/* Checkbox 样式调整 */
:deep(.el-checkbox__label) {
  font-size: 14px;
  color: #333;
}
</style>
