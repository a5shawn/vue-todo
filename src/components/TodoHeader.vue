<template>
  <header class="todo-header">
    <h1 class="todo-title">待办</h1>
    <p class="todo-subtitle">{{ subtitle }}</p>
    <form class="todo-input-wrapper" @submit.prevent="handleSubmit">
      <input
        ref="inputRef"
        v-model="newTodo"
        class="todo-input"
        type="text"
        placeholder="写点什么..."
        maxlength="200"
        autocomplete="off"
      />
      <button class="todo-add-btn" type="submit" :disabled="!newTodo.trim()">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 4v12M4 10h12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </form>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['add'])
const inputRef = ref(null)
const newTodo = ref('')

const now = new Date()
const hour = now.getHours()
const subtitle = computed(() => {
  if (hour < 6) return '夜深了，写点明天的计划'
  if (hour < 12) return `早安 · ${now.getMonth() + 1}月${now.getDate()}日`
  if (hour < 14) return '午后小记'
  if (hour < 18) return `下午 · ${now.getMonth() + 1}月${now.getDate()}日`
  if (hour < 22) return '傍晚，整理一下'
  return '夜色温柔，做点记录'
})

onMounted(() => {
  inputRef.value?.focus()
})

function handleSubmit() {
  const text = newTodo.value.trim()
  if (!text) return
  emit('add', text)
  newTodo.value = ''
  inputRef.value?.focus()
}
</script>
