<template>
  <div class="todo-list-wrapper">
    <TransitionGroup name="list" tag="ul" class="todo-list" v-if="todos.length">
      <TodoItem
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @toggle="$emit('toggle', $event)"
        @remove="$emit('remove', $event)"
        @edit="(id, text) => $emit('edit', id, text)"
      />
    </TransitionGroup>
    <div class="todo-empty" v-else>
      <div class="empty-icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect
            x="6"
            y="10"
            width="28"
            height="22"
            rx="3"
            stroke="currentColor"
            stroke-width="1.5"
            opacity="0.3"
          />
          <path
            d="M14 20l4 4 8-8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.2"
          />
        </svg>
      </div>
      <p class="empty-text">
        {{
          filter === 'completed'
            ? '还没有完成的事项'
            : filter === 'active'
              ? '全部已完成 ✦'
              : '空无一物，心如止水'
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem as TodoItemType, FilterType } from '@/types/todo'
import TodoItem from '@/components/TodoItem.vue'

defineProps<{
  todos: TodoItemType[]
  filter: FilterType
}>()

defineEmits<{
  toggle: [id: number]
  remove: [id: number]
  edit: [id: number, text: string]
}>()
</script>
