<template>
  <div class="app">
    <div class="app-bg">
      <div class="grain-overlay"></div>
      <div class="ambient-glow"></div>
    </div>
    <div class="app-container">
      <TodoHeader @add="addTodo" />
      <main class="app-main">
        <TodoList
          :todos="filteredTodos"
          :filter="filter"
          @toggle="toggleTodo"
          @remove="removeTodo"
        />
      </main>
      <TodoControls
        :total-count="todos.length"
        :active-count="activeCount"
        :current-filter="filter"
        :has-completed="activeCount < todos.length"
        @update:filter="filter = $event"
        @clear-completed="clearCompleted"
      />
    </div>
  </div>
</template>

<script setup>
import { useTodos } from './composables/useTodos.js'
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoControls from './components/TodoControls.vue'

const {
  todos,
  filter,
  filteredTodos,
  activeCount,
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
} = useTodos()
</script>

<style>
/* ============================================
   CSS Variables — Design System
   ============================================ */
:root {
  --bg-primary: #faf8f5;
  --bg-surface: #ffffff;
  --bg-elevated: #f5f2ed;
  --text-primary: #1c1a17;
  --text-secondary: #6b6660;
  --text-muted: #a09a94;
  --accent: #d4583a;
  --accent-hover: #e86a4a;
  --accent-subtle: rgba(212, 88, 58, 0.08);
  --border: #e6e1da;
  --border-hover: #d4cec6;
  --done-color: #5a7a5a;
  --done-bg: rgba(90, 122, 90, 0.06);
  --delete-color: #c26a5a;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.08);
  --radius: 10px;
  --radius-sm: 6px;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, sans-serif;
}

/* ============================================
   Reset & Base
   ============================================ */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  overflow-y: auto;
}

/* ============================================
   App Layout
   ============================================ */
.app {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 60px 24px 40px;
}

.app-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.grain-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  mix-blend-mode: overlay;
}

.ambient-glow {
  position: absolute;
  top: -20%;
  left: 50%;
  width: 600px;
  height: 400px;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse at center,
    rgba(212, 88, 58, 0.06) 0%,
    transparent 70%
  );
}

.app-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ============================================
   Header
   ============================================ */
.todo-header {
  text-align: center;
}

.todo-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 48px;
  color: var(--text-primary);
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.todo-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 400;
  margin-bottom: 32px;
  letter-spacing: 0.03em;
}

/* --- Input --- */
.todo-input-wrapper {
  display: flex;
  gap: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.todo-input-wrapper:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.todo-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 16px 16px 16px 20px;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 400;
  letter-spacing: 0.01em;
}

.todo-input::placeholder {
  color: var(--text-muted);
  font-weight: 300;
  letter-spacing: 0.02em;
}

.todo-add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  background: transparent;
  border: none;
  color: var(--accent);
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s;
  flex-shrink: 0;
}

.todo-add-btn:hover:not(:disabled) {
  background: var(--accent-subtle);
  color: var(--accent-hover);
}

.todo-add-btn:disabled {
  opacity: 0.25;
  cursor: default;
}

/* ============================================
   Todo List
   ============================================ */
.todo-list-wrapper {
  min-height: 120px;
}

.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* --- Empty State --- */
.todo-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 0;
  color: var(--text-muted);
}

.empty-icon {
  opacity: 0.5;
}

.empty-text {
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.04em;
}

/* --- Item --- */
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.15s;
}

.todo-item:hover {
  background: var(--bg-elevated);
  border-color: var(--border-hover);
  transform: translateX(2px);
}

.todo-item.is-done {
  background: var(--done-bg);
  border-color: transparent;
}

.todo-item.is-done:hover {
  background: var(--done-bg);
  border-color: var(--border);
}

/* --- Checkbox --- */
.todo-check {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
}

.check-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 2px solid var(--border-hover);
  border-radius: 50%;
  transition:
    border-color 0.2s,
    background 0.2s;
  color: var(--done-color);
}

.check-box.is-checked {
  border-color: var(--done-color);
  background: var(--done-color);
  color: var(--bg-primary);
}

.todo-check:hover .check-box {
  border-color: var(--text-secondary);
}

/* --- Text --- */
.todo-text {
  flex: 1;
  font-size: 15px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.5;
  letter-spacing: 0.01em;
  cursor: default;
}

.todo-item.is-done .todo-text {
  color: var(--text-muted);
  text-decoration: line-through;
}

/* --- Delete --- */
.todo-delete {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--text-muted);
  opacity: 0;
  transition:
    opacity 0.15s,
    color 0.15s;
}

.todo-item:hover .todo-delete {
  opacity: 1;
}

.todo-delete:hover {
  color: var(--delete-color);
}

/* ============================================
   Controls
   ============================================ */
.todo-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 4px;
  flex-wrap: wrap;
}

.todo-count {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.03em;
}

.todo-filters {
  display: flex;
  gap: 2px;
}

.filter-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  cursor: pointer;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition:
    color 0.15s,
    background 0.15s;
  letter-spacing: 0.03em;
}

.filter-btn:hover {
  color: var(--text-primary);
  background: var(--bg-surface);
}

.filter-btn.active {
  color: var(--accent);
  background: var(--accent-subtle);
}

.clear-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  cursor: pointer;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition:
    color 0.15s,
    background 0.15s;
  letter-spacing: 0.03em;
}

.clear-btn:hover {
  color: var(--delete-color);
  background: rgba(194, 106, 90, 0.1);
}

/* ============================================
   Transitions
   ============================================ */
.list-enter-active,
.list-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.97);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.list-move {
  transition: transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* --- New item highlight --- */
.todo-item.is-new {
  animation: itemPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes itemPop {
  0% {
    transform: translateY(-8px) scale(0.97);
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent-subtle);
  }
  100% {
    transform: translateY(0) scale(1);
    border-color: var(--border);
    box-shadow: none;
  }
}
</style>
