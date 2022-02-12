import { Route, Routes } from 'react-router-dom';
import Example from './Pages/Example';
import MakeGame from './Pages/MakeGame';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/Example" element={<Example />}/>
      <Route path="/MakeGame" element={<MakeGame />}/>
    </Routes>
  );
}

export default App;
