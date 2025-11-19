import AddTodoForm from "./components/AddTodoForm";
import NavBar from "./components/NavBar";
import TodoItems from "./components/TodoItems";
import TodoStats from "./components/TodoStats";
import { useTodoStore } from "./lib/TodoStore";
import { useThemeStore } from "./lib/ThemeStore";
import Filters from "./components/Filters";
import { useState } from "react";
import type { Todo } from "./types/todo";



function App() {
  const todos = useTodoStore((state) => state.todos);
  const {theme} = useThemeStore();

  type FilterType = 'All' | 'Pending' | 'Completed'
    
  const [filter, setFilter] = useState<FilterType>('All')
  
  const getFilterdTodos = (): Todo[] => {
    switch(filter) {
      case 'Pending' :
        return todos.filter(todo => !todo.completed)
      case 'Completed' :
        return todos.filter(todo => todo.completed)
      case 'All':
      default: 
        return todos;
    }
  }
 
  const visibleTodos = getFilterdTodos();
  
  return (
    
   <div className={theme}>
    <NavBar />
     <div className="min-h-screen bg-gray-200 dark:bg-gray-700 py-8">
      
      <div className="max-w-2xl mx-auto px-4">
        
        <div className="text-3xl font-bold flex justify-between dark:text-white mb-6">
          Todo App

          <Filters setFilter={setFilter} />
        </div>
          {/* <Layout /> */}
          <AddTodoForm />
          <TodoStats />

        <div className="space-y-2">
          {
            todos.length == 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-100"> No Todos</p>
            ) : (
              visibleTodos.map((todo) => <TodoItems key={todo.id} todo={todo} />)
            )
          }
        </div>
      </div>
    </div>
   </div>
  )
}

export default App
