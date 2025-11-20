import AddTodoForm from "./components/AddTodoForm";
import NavBar from "./components/NavBar";
import TodoItems from "./components/TodoItems";
import TodoStats from "./components/TodoStats";
import { useTodoStore } from "./lib/TodoStore";
import { useThemeStore } from "./lib/ThemeStore";
import Filters from "./components/Filters";
import { useMemo, useState } from "react";
import type { Todo } from "./types/todo";
import { LuCalendar} from "react-icons/lu";



function App() {
  const todos = useTodoStore((state) => state.todos);
  const {theme} = useThemeStore();

  type FilterType = 'All' | 'Pending' | 'Completed'
 
  const [filter, setFilter] = useState<FilterType>('All')
  
  const [isSorted, setIsSorted] = useState(false)

  type SortKey = keyof Todo

  const sortTodos = (todos: Todo[], SortKey: SortKey, reverse: boolean = false): Todo[] => {
    if (!SortKey) return todos

    const sorted = [...todos].sort((a,b) => {
      const aValue = a[SortKey]
      const bValue = b[SortKey]

      if(typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue)
      }

      if(aValue instanceof Date && bValue instanceof Date) {
        return aValue.getTime() - bValue.getTime();
      }

      if(typeof aValue === 'boolean' && typeof bValue === 'boolean'){
        return (aValue === bValue) ? 0 : (aValue ? -1 : 1); 
      }

      return 0;
    })

    return reverse ? sorted.reverse() : sorted;
  }

  const [currentSortKey, setCurrentSortKey] = useState<SortKey>('createdAt')
  const [reverseSort, setReverseSort] = useState<boolean>(false)

  const sortedTodos = useMemo(() => {
    return sortTodos (todos, currentSortKey, reverseSort)
  }, [todos, currentSortKey, reverseSort])


  const handleSortChange = (key: SortKey) => {
    if (currentSortKey === key){
      setReverseSort(!reverseSort)
    } else {
      setCurrentSortKey(key)
      setReverseSort(false)
      setIsSorted(true)
    }
  }

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

          <Filters setFilter={setFilter} setIsSorted={setIsSorted} />
          
          <div className="flex gap-2">
            <button className="bg-white dark:text-gray-700 py-1 px-4 rounded text-sm" onClick={() => {handleSortChange('text'); }}>A-Z</button>
            <button className="bg-white dark:text-gray-700  py-1 px-4 rounded text-sm" onClick={() => handleSortChange('createdAt')}> <LuCalendar /></button>
            
          </div>
        </div>
          {/* <Layout /> */}
          <AddTodoForm />
          <TodoStats />

        <div className="space-y-2">
          {
            todos.length == 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-100"> No Todos</p>
            ) : (
              <>
                {(isSorted === false ? visibleTodos : sortedTodos).map((todo) => <TodoItems key={todo.id} todo={todo}/>) }
              </>
            )
          }

          
        </div>
      </div>
    </div>
   </div>
  )
}

export default App
