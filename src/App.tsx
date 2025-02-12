import './App.css'
import ParticleConfig from './components/ParticleConfig'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Typewriter } from 'react-simple-typewriter'
import { Button } from '@/components/ui/button'
import { IoIosLink } from "react-icons/io"

function App() {

  return (
    <> 
      <div className="fixed inset-0 -z-10">
        <ParticleConfig />
      </div>
      <div className="flex flex-col items-center text-center space-y-8 -mt-75 overflow-hidden logo">
        <Avatar className="h-56 w-52">
          <AvatarImage src="./image.jpg" />
          <AvatarFallback>FJ</AvatarFallback>
        </Avatar>
        
        <h2 className="text-4xl px-4">
          Hi, I'm a{' '}
          <span className="text-blue-400">
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
        <Button asChild variant="outline" className='px-6 py-3 text-lg text-white'>
          <a href='https://docs.google.com/document/d/1nff0UoRnpBPTZFWd-I858IIq7QHipx5-pEZeWrpgHOg/edit?usp=sharing' className='color-change-a'>Resume <IoIosLink /></a>
        </Button>
        <Button asChild variant="outline" className='px-6 py-3 text-lg text-white'>
         <a className='color-change-a'>What I've been upto</a>
        </Button>
      </div>
    </>
  )
}

export default App
