# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 提供操作指引，帮助在此仓库中高效工作。

## 常用命令

- `npm run dev` — 启动 Vite 开发服务器
- `npm run build` — 生产构建，输出到 `dist/`
- `npm run preview` — 本地预览构建产物
- `npm run format` — 用 Prettier 格式化所有源码
- `npm run format:check` — 仅检查格式，不写入

## 架构概览

基于 Vite + Vue 3 的单页待办应用。无路由、无外部状态库。

### 状态管理

`src/composables/useTodos.js` 是唯一数据源。管理待办对象数组（`{ id, text, done, createdAt }`），通过 `localStorage` 持久化。暴露 `todos`、`filter`、`filteredTodos`、`activeCount` 等响应式状态，以及 `addTodo`、`toggleTodo`、`removeTodo`、`clearCompleted` 操作方法。

### 组件树

- `App.vue` — 根组件。包含完整 CSS 设计系统（`:root` 变量）、背景效果（颗粒纹理 + 环境光晕），通过 `useTodos()` 消费状态并向子组件传递 props/events。
- `TodoHeader.vue` — 标题 + 根据时段变化的副标题 + 输入表单。触发 `add` 事件。
- `TodoList.vue` — 通过 `<TransitionGroup>` 渲染 `TodoItem`，空列表时显示空白状态。透传 `toggle`/`remove` 事件。
- `TodoItem.vue` — 单条待办行：圆形复选框、文本、删除按钮。新添加时触发 `isNew` 高亮动画。
- `TodoControls.vue` — 筛选标签（全部/进行中/已完成）、待办计数、清除已完成按钮。触发 `update:filter` 和 `clear-completed` 事件。

### 样式方案

CSS 自定义属性在 `:root` 中定义了完整设计系统（颜色、阴影、圆角、字体）。所有样式集中在 `App.vue` 中，子组件不包含独立 `<style>`。布局为居中单列最大宽度容器。字体使用 Google Fonts 的 Playfair Display（衬线标题）+ DM Sans（正文字体）。

### 代码格式化

Prettier 配置（`.prettierrc`）：无分号、单引号、尾随逗号。

### 部署

`.github/workflows/deploy.yml`：推送 `main` 分支时自动构建，通过 `actions/deploy-pages` 部署到 GitHub Pages。Vite `base` 设为 `'./'` 以兼容子路径。

### 已知局限

- 无测试运行器及测试文件
- 无 TypeScript
- 无 ESLint（仅 Prettier 负责代码格式化）
- 无组件库——全部 UI 为手写原生 CSS
