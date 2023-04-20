import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Landing from './components/Landing/Landing';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Main />} />
        <Route path="/detail/:detailId" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
