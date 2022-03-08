import { Route, Routes } from 'react-router-dom';
import TempHostLogin from './Pages/TempHostLogin';
import MakeGame from './Pages/MakeGame';
import DoGame from './Pages/DoGame';
import ShareLink from './Pages/ShareLink';
import LeaderBoard from './Pages/LeaderBoard';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TempHostLogin />}/>
      <Route path="/makegame" element={<MakeGame />}/>
      <Route path="/dogame" element={<DoGame />}/>
      <Route path="/sharelink" element={<ShareLink />}/>
      <Route path="/leaderboard" element={<LeaderBoard />}/>
    </Routes>
  );
}

export default App;
