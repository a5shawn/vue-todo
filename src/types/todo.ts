export interface TodoItem {
  id: number
  text: string
  done: boolean
  createdAt: number
}

export type FilterType = 'all' | 'active' | 'completed'
