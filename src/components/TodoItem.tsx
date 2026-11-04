import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
          {todo.text}
        </span>
      </label>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        aria-label="Удалить задачу"
      >
        ✕
      </button>
    </li>
  )
}
