# 夜书记 · 待办

一个精致、有编辑感的待办事项应用，使用 Vue 3 + Vite 构建。

## 设计

深色暖调"夜书记"美学，后改为亮色暖白主题：

- 暖白米色背景，纯白卡片，暖黑文字
- 锈橘色（`#d4583a`）作为强调色
- Playfair Display（衬线标题）+ DM Sans（正文字体）
- 颗粒纹理叠加层 + 环境光晕营造层次感
- 渐进入场动画、弹性弹出效果、悬停微交互

## 功能

- 添加待办（回车或点击 + 号）
- 勾选/取消完成（点击圆圈或双击文字）
- 删除待办（悬停显示删除按钮）
- 筛选：全部 / 进行中 / 已完成
- 清除已完成
- `localStorage` 自动持久化
- 根据时段变化副标题问候语

## 开始使用

```bash
npm install
npm run dev
```

开发服务器将在 `http://localhost:5173/` 启动。

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建产物 |
| `npm run format` | 格式化源码 |
| `npm run format:check` | 检查格式 |

## 技术栈

- [Vue 3](https://vuejs.org/)（Composition API + `<script setup>`）
- [Vite](https://vitejs.dev/)
- [Prettier](https://prettier.io/)

## 部署

推送 `main` 分支会自动触发 GitHub Actions 构建并部署到 GitHub Pages。需在仓库 Settings → Pages 中将 Source 设为 GitHub Actions。
