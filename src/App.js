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
      <Route path="/build/:uuid" element={<MakeGame />}/>
      <Route path="/play/:uuid" element={<DoGame />}/>
      <Route path="/share-link/:uuid" element={<ShareLink />}/>
      <Route path="/leader-board/:uuid" element={<LeaderBoard />}/>
      <Route path="/result" element={<Result />}/>
    </Routes>
  );
}

export default App;
