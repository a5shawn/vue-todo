<template>
  <div class="todo-controls" v-if="totalCount > 0">
    <span class="todo-count">{{ activeCount }} 项待办</span>
    <div class="todo-filters">
      <button
        v-for="f in filters"
        :key="f.key"
        class="filter-btn"
        :class="{ active: currentFilter === f.key }"
        @click="$emit('update:filter', f.key)"
      >
        {{ f.label }}
      </button>
    </div>
    <button
      v-if="hasCompleted"
      class="clear-btn"
      @click="$emit('clear-completed')"
    >
      清除已完成
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FilterType } from '@/types/todo'

const props = defineProps<{
  totalCount: number
  activeCount: number
  currentFilter: FilterType
  hasCompleted: boolean
}>()

defineEmits<{
  'update:filter': [value: FilterType]
  'clear-completed': []
}>()

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
]
</script>
