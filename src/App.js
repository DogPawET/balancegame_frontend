import { Route, Routes } from 'react-router-dom';
import HostLogin from './Pages/HostLogin';
import GuestLogin from './Pages/GuestLogin';
import MakeGame from './Pages/MakeGame';
import DoGame from './Pages/DoGame';
import ShareLink from './Pages/ShareLink';
import LeaderBoard from './Pages/LeaderBoard';
import Result from './Pages/Result';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HostLogin />}/>
      <Route path="/balance-game/:uuid" element={<GuestLogin />}/>
      <Route path="/makegame" element={<MakeGame />}/>
      <Route path="/dogame" element={<DoGame />}/>
      <Route path="/sharelink" element={<ShareLink />}/>
      <Route path="/leaderboard" element={<LeaderBoard />}/>
      <Route path="/result" element={<Result />}/>
    </Routes>
  );
}

export default App;
