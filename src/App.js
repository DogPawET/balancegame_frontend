import { Route, Routes } from 'react-router-dom';
import Example from './Pages/Example';
import MakeGame from './Pages/MakeGame';
import DoGame from './Pages/DoGame';
import ShareLink from './Pages/ShareLink';
import LeaderBoard from './Pages/LeaderBoard';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/example" element={<Example />}/>
      <Route path="/makegame" element={<MakeGame />}/>
      <Route path="/dogame" element={<DoGame />}/>
      <Route path="/sharelink" element={<ShareLink />}/>
      <Route path="/leaderboard" element={<LeaderBoard />}/>
    </Routes>
  );
}

export default App;
