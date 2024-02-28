import { Outlet, Link} from 'react-router-dom'
import Whiteboard from './pages/Whiteboard';
import './App.css'

function App() {
  return (
    <>
      <header>Header</header>
      <Outlet />
      <Link to="/Whiteboard">
        <button> Whiteboard </button>
      </Link>
      <footer>Footer</footer>
    </>
  );
}

export default App;
