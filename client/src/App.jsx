import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </> 
  );
}

export default App;