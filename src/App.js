import { Route, Routes } from 'react-router-dom';
import TempHostLogin from './Pages/TempHostLogin';
import HostLogin from './Pages/HostLogin';
import GuestLogin from './Pages/GuestLogin';
import MakeGame from './Pages/MakeGame';
import DoGame from './Pages/DoGame';
import ShareLink from './Pages/ShareLink';
import LeaderBoard from './Pages/LeaderBoard';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TempHostLogin />}/>
      <Route path="/hostlogin" element={<HostLogin />}/>
      <Route path="/guestlogin" element={<GuestLogin />}/>
      <Route path="/makegame" element={<MakeGame />}/>
      <Route path="/dogame" element={<DoGame />}/>
      <Route path="/sharelink" element={<ShareLink />}/>
      <Route path="/leaderboard" element={<LeaderBoard />}/>
      
    </Routes>
  );
}

export default App;
