import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import type { TodoItem, FilterType } from '@/types/todo'

const STORAGE_KEY = 'vue-todo-items'

export function useTodos() {
  const todos: Ref<TodoItem[]> = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  )
  const filter: Ref<FilterType> = ref('all')

  const filteredTodos: ComputedRef<TodoItem[]> = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter((t) => !t.done)
      case 'completed':
        return todos.value.filter((t) => t.done)
      default:
        return todos.value
    }
  })

  const activeCount: ComputedRef<number> = computed(
    () => todos.value.filter((t) => !t.done).length,
  )

  watch(
    todos,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true },
  )

  function addTodo(text: string): void {
    todos.value.unshift({
      id: Date.now(),
      text,
      done: false,
      createdAt: Date.now(),
    })
  }

  function toggleTodo(id: number): void {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function removeTodo(id: number): void {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  function clearCompleted(): void {
    todos.value = todos.value.filter((t) => !t.done)
  }

  return {
    todos,
    filter,
    filteredTodos,
    activeCount,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
  }
}
