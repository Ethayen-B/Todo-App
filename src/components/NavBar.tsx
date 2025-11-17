import { LuClipboardCheck, LuMoon, LuSun } from 'react-icons/lu'
import { useThemeStore } from '../lib/ThemeStore';


const NavBar = () => {


    const {theme, setTheme} = useThemeStore();

    const toggleTheme = () => {
        const newTheme: string = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

  return (
    <div className='sticky top-0 z-50 bg-white/90 dark:bg-gray-800 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-900 font-sans'>
        <div className="flex items-center justify-between px-4 py-3 md:px6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 cursor-pointer group">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-green-600">
                    <LuClipboardCheck className='text-white w-10 h-10'/>
                </div>
                <span className="text-3xl font-extrabold bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent tracking-wide">
                    Todo List
                </span>
            </div>

            <div className="flex items-center gap-4">
                <button className='p-2 text-gray-600 dark:text-gray-200 hover:text-green-600 transition-colors duration-300 hover:bg-green-100 rounded-full '
                    onClick={toggleTheme}>
                    {theme === 'light' ? <LuMoon size={25} /> : <LuSun size={25} /> }
                </button>
            </div>
        </div>
    </div>
  )
}

export default NavBar