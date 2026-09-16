import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Task from './components/Task.jsx'
function App() {
 // const [count, setCount] = useState(0)

  return (
   <div className="container">
    <h1> Tasky </h1> 
    <Task title="Dishes" deadline="Today" description="Clean and dry the dishes" />
    <Task title="Laundry" deadline="Tomorrow" description="Fold laundry and put away"/>
       

    <Task title="Tidy" deadline="Today" />

    </div>
  )
}

export default App
