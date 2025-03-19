import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Blog} from './pages/Blog'
import Blogs  from './pages/Blogs'
import './App.css'
import Navbar from './components/ui/ui/Navbar.tsx'
import CustomEditor from './components/ui/ui/Publish.tsx'
import  Homepage  from './pages/Home/Homepage.tsx'

function App() {
  return(
    <BrowserRouter>
      <div className='relative min-h-screen bg-linear-120
       from-white to-gray-300'>
        {/* Main Content */}
        <Navbar/>
        <div className='max-w-[1280px] mx-auto pt-20 relative z-10'>
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
