import { useState } from 'react';
import { useTodoStore } from '../lib/TodoStore';
import type { Todo } from '../types/todo'
import { BsCheck, BsPencil, BsTrash, BsX } from 'react-icons/bs';

const TodoItems = ({todo} : {todo : Todo}) => {

      const deleteTodo = useTodoStore((state) => state.deleteTodo);
      const toggleTodo = useTodoStore((state) => state.toggleTodo);
      const updateTodo = useTodoStore((state) => state.updateTodo);
      
      const [isEdited, setIsEdited] = useState(false);
      const [editedText, setEditedText] = useState(todo.text);
      


      const handleSaveEdit = () => {
        if(editedText.trim()) {
          updateTodo(todo.id, editedText);
          setIsEdited(false)
        }
      }

      const handleCancelEdit = () => {
        setEditedText(todo.text);
        setIsEdited(false)
      }
  
  return (
    <div className={`flex items-center dark:bg-gray-400 dark:text-white gap-3 p-3 border rounded-lg 
      ${ todo.completed 
        ? "bg-gray-50 border-gray-200"
        : "bg-white border-gray-300"    
    }`}>
      <input 
        type="checkbox" 
        className="w-5 h-5 text-blue-600 " 
        checked={todo.completed} 
        onChange={()=> toggleTodo(todo.id)} />
      

      <div className="flex-1">
        {isEdited ? (
          <input 
            value={editedText} 
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            className='w-full dark:bg-gray-700 dark:text-white px-2 py-1 border rounded' 
            autoFocus />
        ) : (
            <span className={`${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                {todo.text}
            </span>
          )
        }
         
      </div>
      

      <div className="flex gap-1">
        {isEdited ? (
          <>
            <button 
              className='p-2 text-blue-600 dark:text-gray-900 hover:bg-blue-100 hover:rounded-2xl'
              onClick={handleSaveEdit}
              >
                <BsCheck className='w-6 h-6'/>
              </button>
            <button 
              className='p-2 text-red-600 dark:text-gray-900 hover:bg-red-100 hover:rounded-2xl'
              onClick={handleCancelEdit}>
                <BsX className='w-6 h-6'/> 
            </button>
          </>
        ) : (
          <>
            <button 
              className='p-2 text-blue-600 dark:text-gray-900 hover:bg-blue-100 hover:rounded-2xl'
              onClick={() => setIsEdited(true)}
              >
                <BsPencil className='w-6 h-6'/>
              </button>
            <button 
              className='p-2 text-red-600 dark:text-gray-900 hover:bg-red-100 hover:rounded-2xl'
              onClick={() => deleteTodo(todo.id)}>
                <BsTrash className='w-6 h-6'/> 
            </button>
          </>
        )}
        
      </div>
    </div>
  )
}

export default TodoItems