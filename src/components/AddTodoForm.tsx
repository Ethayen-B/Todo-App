import React, { useState } from 'react'
import { useTodoStore } from '../lib/TodoStore';
import { LuPlus } from 'react-icons/lu';

const AddTodoForm = () => {
    const [input, setInput] = useState("");
    const addTodo = useTodoStore((state) => state.addTodo);
    

    const handleSubmit = () => {
      console.log("Hell0")
      if(input.trim()){
        addTodo(input);
        setInput("")
      }
    }

    return (
    <div className='mb-6 flex gap-2 md:flex-1'>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          type="text" 
          className="flex-1 px-4 py-2 border dark:text-white rounded-lg" id="" />
        <button 
          onClick={handleSubmit}
          className='px-4 py-2 bg-emerald-600 hover:bg-emerald-800 rounded-lg flex font-bold text-white '>
            <LuPlus className='w-6 h-6' />
            <span> Add</span>
          </button>
    </div>

  )
}

export default AddTodoForm