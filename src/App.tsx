import './App.css'
import ParticleConfig from './components/ParticleConfig'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Typewriter } from 'react-simple-typewriter'
import { Button } from '@/components/ui/button'
import { IoIosLink } from "react-icons/io"
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useNavigate, Routes, Route } from 'react-router-dom'

function App() {

  const navigate = useNavigate();
  function handle_whatIveBeenUpTo() {
    navigate('/explore')
  }

  return (
    <Routes>
      <Route path="/" element={
        <div>
          <div className="fixed inset-0 -z-10 w-full">
            <ParticleConfig />
          </div>
          <div className="flex flex-col items-center text-center space-y-8 -mt-75 overflow-hidden logo">
            <Avatar className="h-56 w-52">
              <AvatarImage src="./image.jpg" />
              <AvatarFallback>FJ</AvatarFallback>
            </Avatar>
            
            <h2 className="text-4xl px-4 text-white">
              Hi, I'm a{' '}
              <span className="type-writer-color">
                <Typewriter
                  words={['Software Engineer.', 'Full Stack Developer.', 'Systems Engineer.', 'Habitual Liar.', 'Tinkerer.']}
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
              <a href='https://docs.google.com/document/d/1nff0UoRnpBPTZFWd-I858IIq7QHipx5-pEZeWrpgHOg/edit?usp=sharing' className='color-change-a'>Resume <IoIosLink /></a>
            </Button>
            <Button asChild variant="outline" className='px-3 sm:px-6 py-2 sm:py-3 text-lg bg-transparent border-white'>
              <a onClick={(e) => { e.preventDefault(); handle_whatIveBeenUpTo(); }} className='color-change-a'>What I've been up to</a>
            </Button>
          </div>
          <div className="flex flex-row justify-center text-center mt-4">
            <Button asChild variant="link" className='px-3 sm:px-6 py-2 sm:py-3 text-lg bg-transparent border-white'>
              <a href='https://www.linkedin.com/in/fahad-jamil-219908140/'> <FaLinkedin /></a>
            </Button>
            <Button asChild variant="link" className='px-3 sm:px-6 py-2 sm:py-3 text-lg bg-transparent border-white'>
              <a href='https://github.com/fj-corp'> <FaGithub /></a>
            </Button>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default App
