import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </>
  )
}

export default App
