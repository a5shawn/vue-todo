import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'vue-todo-items'

export function useTodos() {
  const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  const filter = ref('all')

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter((t) => !t.done)
      case 'completed':
        return todos.value.filter((t) => t.done)
      default:
        return todos.value
    }
  })

  const activeCount = computed(() => todos.value.filter((t) => !t.done).length)

  watch(
    todos,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true },
  )

  function addTodo(text) {
    todos.value.unshift({
      id: Date.now(),
      text,
      done: false,
      createdAt: Date.now(),
    })
  }

  function toggleTodo(id) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function removeTodo(id) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  function clearCompleted() {
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
