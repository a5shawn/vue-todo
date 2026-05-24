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

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalCount: { type: Number, default: 0 },
  activeCount: { type: Number, default: 0 },
  currentFilter: { type: String, default: 'all' },
  hasCompleted: { type: Boolean, default: false },
})

defineEmits(['update:filter', 'clear-completed'])

const filters = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
]
</script>
