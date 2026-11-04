import type { Filter } from '../types'

interface TodoFiltersProps {
  current: Filter
  onChange: (filter: Filter) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

export function TodoFilters({ current, onChange }: TodoFiltersProps) {
  return (
    <div className="todo-filters">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={current === filter.value ? 'filter-button active' : 'filter-button'}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
