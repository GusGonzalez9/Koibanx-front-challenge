import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Wallet from './components/routes/wallet';
import Convert from './components/routes/convert';
import Nav from './components/elements/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Wallet />} />
        <Route path="convert" element={<Convert />} />
      </Routes>
    </div>
  );
}

export default App;
