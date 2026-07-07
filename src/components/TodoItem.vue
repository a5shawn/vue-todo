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

    <input
      v-if="isEditing"
      ref="editInputRef"
      v-model="editText"
      class="todo-edit-input"
      type="text"
      maxlength="200"
      @keyup.enter="saveEdit"
      @keyup.escape="cancelEdit"
      @blur="saveEdit"
    />
    <span
      v-else
      class="todo-text"
      @dblclick="startEdit"
    >{{ todo.text }}</span>

    <button
      v-if="!isEditing && !todo.done"
      class="todo-edit-btn"
      @click="startEdit"
      title="编辑"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M10 1.5l2.5 2.5L4.5 12H2v-2.5L10 1.5z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
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
import { ref, nextTick, onMounted } from 'vue'
import type { TodoItem as TodoItemType } from '@/types/todo'

const props = defineProps<{
  todo: TodoItemType
  index: number
}>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
  edit: [id: number, text: string]
}>()

const isEditing = ref(false)
const editText = ref('')
const editInputRef = ref<HTMLInputElement | null>(null)

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

function startEdit() {
  if (props.todo.done) return
  editText.value = props.todo.text
  isEditing.value = true
  nextTick(() => {
    editInputRef.value?.focus()
    editInputRef.value?.select()
  })
}

function saveEdit() {
  if (!isEditing.value) return
  const text = editText.value.trim()
  if (text && text !== props.todo.text) {
    emit('edit', props.todo.id, text)
  }
  isEditing.value = false
}

function cancelEdit() {
  isEditing.value = false
}
</script>
