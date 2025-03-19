import { useEffect, useState } from 'react'
import { MaterialUISwitch } from './MaterialSwitch'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isChecked) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [isChecked])

    const handleToggle:()=>void = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="fixed top-0 right-0 left-0 bg-transparent shadow-md z-[999]">
            <div className='max-w-[1280px] mx-auto'>
                <nav className=' p-4 flex justify-between items-center '>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className='text-3xl font-extrabold'
                    >
                        <p className='text-4xl font-extrabold bg-gradient-to-r from-zinc-900 via-zinc-300 to-zinc-600 inline-block 
                        text-transparent bg-clip-text 
                        transition-shadow duration-1500'> AiBlogs</p>
                    </motion.h1>
                    <div className='flex space-x-2 items-center'>
                      <Link to="/publish" className='bg-indigo-800 text-white font-semibold px-4 py-2 rounded-2xl'>
                        Publish
                      </Link>
                      <MaterialUISwitch
                          sx={{ m: 1 }}
                          checked={isChecked}
                          onChange={handleToggle}
                      />
                    </div>
                    
                </nav>
            </div>
        </div>
    )
}

export default Navbar
