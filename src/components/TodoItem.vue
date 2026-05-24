<template>
  <div class="todo-item" :class="{ 'is-done': todo.done, 'is-new': isNew }">
    <button
      class="todo-check"
      @click="$emit('toggle', todo.id)"
      :title="todo.done ? '标记未完成' : '标记完成'"
    >
      <span class="check-box" :class="{ 'is-checked': todo.done }">
        <svg
          v-if="todo.done"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 7.5l3 3 5-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <span class="todo-text" @dblclick="$emit('toggle', todo.id)">{{
      todo.text
    }}</span>
    <button class="todo-delete" @click="$emit('remove', todo.id)" title="删除">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 3l8 8M11 3l-8 8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TodoItem as TodoItemType } from '@/types/todo'

const props = defineProps<{
  todo: TodoItemType
  index: number
}>()

defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()

const isNew = ref(
  props.todo.createdAt && Date.now() - props.todo.createdAt < 2000,
)

onMounted(() => {
  if (isNew.value) {
    setTimeout(() => {
      isNew.value = false
    }, 600)
  }
})
</script>
