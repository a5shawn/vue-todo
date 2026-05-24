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

<script setup lang="ts">
import { useTodos } from '@/composables/useTodos'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoList from '@/components/TodoList.vue'
import TodoControls from '@/components/TodoControls.vue'

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
