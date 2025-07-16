import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Todo } from '../types';
import { todoAPI } from '../services/api';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import TodoFilter from '../components/TodoFilter';
import { LogOut } from 'lucide-react';

type FilterType = 'all' | 'active' | 'completed';

const TodoPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const response = await todoAPI.getTodos();
        setTodos(response.data.todos);
      } catch (error: any) {
        setError('Failed to load todos');
        console.error('Load todos error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadTodos();
    }
  }, [user]);

  const addTodo = async (title: string) => {
    try {
      const response = await todoAPI.createTodo(title);
      setTodos([response.data.todo, ...todos]);
    } catch (error: any) {
      setError('Failed to create todo');
      console.error('Create todo error:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await todoAPI.updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => t.id === id ? response.data.todo : t));
    } catch (error: any) {
      setError('Failed to update todo');
      console.error('Toggle todo error:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error: any) {
      setError('Failed to delete todo');
      console.error('Delete todo error:', error);
    }
  };

  const editTodo = async (id: string, newTitle: string) => {
    try {
      const response = await todoAPI.updateTodo(id, { title: newTitle });
      setTodos(todos.map(todo => todo.id === id ? response.data.todo : todo));
    } catch (error: any) {
      setError('Failed to update todo');
      console.error('Edit todo error:', error);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

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
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

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