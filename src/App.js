import { Route, Routes } from 'react-router-dom';
import Example from './Pages/Example';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/Example" element={<Example />}/>
    </Routes>
  );
}

export default App;
