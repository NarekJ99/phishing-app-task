import { Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from './components/ui/toaster'
import Home from './components/home'

const App = () => {
  return (
    <main>
      <Home />
      <Outlet />
      <Toaster />
    </main>
  )
}

export default App
