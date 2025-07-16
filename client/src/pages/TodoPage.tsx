import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Todo } from '../types';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import TodoFilter from '../components/TodoFilter';
import { LogOut } from 'lucide-react';

type FilterType = 'all' | 'active' | 'completed';

const TodoPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Mock data - will replace with API calls later
  useEffect(() => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: 'Learn React hooks',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.id || '1',
      },
      {
        id: '2',
        title: 'Build todo app',
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.id || '1',
      },
    ];
    setTodos(mockTodos);
  }, [user]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user?.id || '1',
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newTitle: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, title: newTitle, updatedAt: new Date().toISOString() }
        : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const counts = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Todos</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}!</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TodoForm onAdd={addTodo} />
        
        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {filter === 'active' && 'No active todos'}
                {filter === 'completed' && 'No completed todos'}
                {filter === 'all' && 'No todos yet. Add one above!'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TodoPage;