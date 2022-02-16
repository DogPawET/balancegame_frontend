import { Route, Routes } from 'react-router-dom';
import Example from './Pages/Example';
import MakeGame from './Pages/MakeGame';
import DoGame from './Pages/DoGame';
import ShareLink from './Pages/ShareLink';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/example" element={<Example />}/>
      <Route path="/makegame" element={<MakeGame />}/>
      <Route path="/dogame" element={<DoGame />}/>
      <Route path="/sharelink" element={<ShareLink />}/>
    </Routes>
  );
}

export default App;
