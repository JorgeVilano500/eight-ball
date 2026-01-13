import reactLogo from './assets/react.svg'
import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import BallCanvas from './canvas/Ball'
import {html} from './assets'
import { Navbar } from './components'
import {responses} from './utils/responses'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');



  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true) , 50)
    return () => clearTimeout(timeout)
  }, [])

  const onSubmitForm = () => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    const randomResponse = responses[randomIndex];
    setResponseText(randomResponse);
    setInputText(''); // Clear the input after submission
  }


  return (
    <body className='min-h-screen font-sans bg-black'>
      <div className='min-h-screen flex flex-col text-center'>
        <header className={`flex justify-center pt-6 px-4 transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <Navbar />
        </header>

        <main className='flex-1 flex flex-col justify-evenly items-center px-4'>

          <div>
            <p className={`text-zinc-400 text-4xl transition-all duration-700 delay-200 ease-out ${responseText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>{responseText || 'Placeholder text'}</p>
          </div>

        <section>
          <div className={`mt-[clamp(12px,8vh,72px)] flex justify-center transition-all duration-700 delay-300 ease-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <BallCanvas icon={html}/>


          </div>
          <p className={`mt-4 text-xl text-zinc-400 transition-opacity duration-700 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'} `}>Ask the ball a question</p>
        </section>

        </main>

        <footer className='px-4 pb-5 pt-3 flex justify-center'>
          <form 
            className={`w-full bg-zinc-300  max-w-2xl flex items-center gap-2 rounded border border-full border-zinc-200 bg-white px-3 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.06)] transition-all duration-700 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitForm();
            }}
          >

            <input
              type='text'
              placeholder='Message Eight Ball...'
              className='flex-1 bg-transparent outline-none border-0 px-2 py-2 text-base placeholder:text-zinc-400  '
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />

            <button 
              type='submit'
              className='h-10 w-10 rounded-full bg-zinc-900 text-white grid place-items-center text-lg active:scale-95 transition '
              aria-label='Send'
            >
              ➤
            </button>

          </form>

        </footer>
      </div>
    </body>
  )
}

export default App
