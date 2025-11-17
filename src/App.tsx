"use Client"


import AddTodoForm from "./components/AddTodoForm";
import NavBar from "./components/NavBar";
import TodoItems from "./components/TodoItems";
import TodoStats from "./components/TodoStats";
import { useTodoStore } from "./lib/TodoStore";
import { useThemeStore } from "./lib/ThemeStore";



function App() {
  const todos = useTodoStore((state) => state.todos);
  const {theme} = useThemeStore();

  return (
    
   <div className={theme}>
    <NavBar />
     <div className="min-h-screen bg-gray-200 dark:bg-gray-700 py-8">
      
      <div className="max-w-2xl mx-auto px-4">
        
        <div className="text-3xl font-bold text-center dark:text-white mb-6">Todo App</div>
          {/* <Layout /> */}
          <AddTodoForm />
          <TodoStats />

        <div className="space-y-2">
          {
            todos.length == 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-100"> No Todos</p>
            ) : (
              todos.map((todo) => <TodoItems key={todo.id} todo={todo} />)
            )
          }
        </div>
      </div>
    </div>
   </div>
  )
}

export default App
