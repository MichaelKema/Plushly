import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full flex justify-center pt-10">
      <h1 className="w-1/2">
        Welcome to Plushly
      </h1>
    </div>
  )
  
}

export default App