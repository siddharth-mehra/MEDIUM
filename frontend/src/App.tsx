import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Blog} from './pages/Blog'
import Blogs  from './pages/Blogs'
import './App.css'
import Navbar from './components/ui/ui/Navbar.tsx'
import CustomEditor from './components/ui/ui/Publish.tsx'
import Homepage from './pages/Home/Homepage.tsx'
import logoimage from './assets/logoimage.png'

function App() {
  return(
    <BrowserRouter>
      <div className='min-h-screen w-full relative bg-gradient-to-br from-indigo-500 via-white to-indigo-500  dark:from-zinc-900 dark:via-white dark:to-zinc-900'>
        {/* Background Image Container */}
        <div 
          className='fixed inset-0 z-0 pointer-events-none opacity-30 '
          style={{
            backgroundImage: `url(${logoimage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          }}
        />
        
        {/* Main Content */}
        <Navbar/>
        <div className='w-full max-w-[1280px] mx-auto pt-20 relative z-10'>
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/Signin" element={<Signin/>} />
            <Route path="/blog/:id" element={<Blog/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/publish" element={<CustomEditor/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
