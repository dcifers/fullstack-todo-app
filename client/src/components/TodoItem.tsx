import React from 'react';
import { Todo } from '../types';
import { Trash2, Edit2, Check, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center p-4 bg-white rounded-lg shadow-sm border ${
      todo.completed ? 'bg-gray-50' : ''
    }`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && <Check size={14} />}
      </button>

      {/* Todo content */}
      <div className="flex-1">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="text-red-600 hover:text-red-800"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;