import { Route, Routes } from 'react-router-dom';
import Example from './Pages/Example';
import MakeGame from './Pages/MakeGame';
import DoGame from './Pages/DoGame';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/Example" element={<Example />}/>
      <Route path="/MakeGame" element={<MakeGame />}/>
      <Route path="/DoGame" element={<DoGame />}/>
    </Routes>
  );
}

export default App;
