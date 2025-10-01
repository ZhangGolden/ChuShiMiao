# Vue 管理系统布局

一个基于 Vue 3 的管理系统布局模板，包含左侧固定导航栏和右侧分区内容。

## 项目结构

```
├── src/
│   ├── layout/          # 布局组件
│   │   ├── Layout.vue   # 主布局容器
│   │   ├── Sidebar.vue  # 左侧导航栏
│   │   └── Header.vue   # 右上方标题栏
│   ├── views/           # 页面视图
│   │   ├── Workspace.vue    # 工作台
│   │   ├── Selection.vue    # 独立选号
│   │   ├── Products.vue     # 商品管理
│   │   ├── Orders.vue       # 订单管理
│   │   ├── Inventory.vue    # 卡密库存
│   │   └── Profile.vue      # 个人中心
│   ├── router/          # 路由配置
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

## 布局说明

- **左侧侧边栏**：固定宽度 240px，包含 logo、操作按钮和导航菜单
- **右上方区域**：高度 60px，显示当前页面标题
- **右下方主内容区**：可滚动的页面内容区域

## 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 技术栈

- Vue 3
- Vue Router 4
- Vite

