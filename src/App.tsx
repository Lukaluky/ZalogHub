import { useLocalStorage } from './hooks/useLocalStorage'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import type { Todo } from './types'
import './App.css'

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('zaloghub-todos', [])

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

  return (
    <div className="app">
      <h1>ZalogHub</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        emptyMessage="Задач пока нет"
      />
    </div>
  )
}

export default App
