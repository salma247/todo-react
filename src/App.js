import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
