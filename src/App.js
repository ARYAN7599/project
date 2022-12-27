import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Data from './pages/Data';
import Card from './pages/Card';
import Header from './pages/Header';
import Error from './pages/Error';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Data />} />
          <Route path="/card" element={<Card />} />
          <Route path="*" element={<Error />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
