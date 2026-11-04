import { useMemo, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { TodoFilters } from './components/TodoFilters'
import type { Filter, Todo } from './types'
import './App.css'

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'Задач пока нет',
  active: 'Нет задач в этом фильтре',
  completed: 'Нет задач в этом фильтре',
}

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('zaloghub-todos', [])
  const [filter, setFilter] = useState<Filter>('all')

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [todos, filter])

  const activeCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="app">
      <h1>ZalogHub</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilters current={filter} onChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        emptyMessage={EMPTY_MESSAGES[filter]}
      />
      <div className="todo-footer">
        <span>Осталось задач: {activeCount}</span>
        <button type="button" onClick={clearCompleted}>
          Очистить выполненные
        </button>
      </div>
    </div>
  )
}

export default App
