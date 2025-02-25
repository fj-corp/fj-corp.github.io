import './App.css'
import ParticleConfig from './components/ParticleConfig'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Typewriter } from 'react-simple-typewriter'
import { Button } from '@/components/ui/button'
import { IoIosLink } from 'react-icons/io'
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Explore from './components/Explore'

const Layout = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 w-full">
        <ParticleConfig />
      </div>
      <Outlet />
    </>
  )
}

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col items-center space-y-8 -mt-75 overflow-hidden logo">
        <Avatar className="h-56 w-52">
          <AvatarImage src="./image.jpg" />
          <AvatarFallback>FJ</AvatarFallback>
        </Avatar>
        <h2 className="text-4xl px-4 text-white">
          Hi, I'm a{' '}
          <span className="type-writer-color">
            <Typewriter
              words={['Software Engineer.', 'Full Stack Developer.', 'Systems Engineer.', 'Tinkerer.']}
              loop={true}
              cursor={true}
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h2>
      </div>
      <div className="flex flex-row justify-center text-center space-x-4">
        <Button asChild variant="outline" className='px-3 sm:px-6 py-2 sm:py-3 text-lg bg-transparent border-white'>
          <a href='https://docs.google.com/document/d/1j08Lor73KGZ2Pywis8XKrMfEo2hTuS0f_-rpidvfXa8/edit?usp=sharing' rel='noopener noreferrer' target='_blank' className='color-change-a'>Resume <IoIosLink /></a>
        </Button>
        <Button asChild variant="outline" className='px-3 sm:px-6 py-2 sm:py-3 text-lg bg-transparent border-white'>
          <Link className='color-change-a' to="/explore">What I've been up to</Link>
        </Button>
      </div>
      <div className="flex flex-row justify-center text-center mt-4">
        <Button asChild variant="link" className='px-3 sm:px-6 py-2 sm:py-3 text-lg bg-transparent border-white'>
          <a href='https://www.linkedin.com/in/fahad-jamil-219908140/' rel='noopener noreferrer' target='_blank'><FaLinkedin /></a>
        </Button>
        <Button asChild variant="link" className='px-3 sm:px-6 py-2 sm:py-3 text-lg bg-transparent border-white'>
          <a href='https://github.com/fj-corp' rel='noopener noreferrer' target='_blank'><FaGithub /></a>
        </Button>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
      </Route>
    </Routes>
  )
}

export default App
