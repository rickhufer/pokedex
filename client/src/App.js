import './App.css';
import { Route, Routes } from 'react-router-dom'
import Cards from './components/Cards/Cards';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import data from "./assets/fake-data/data-today-pick"

function App() {
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Main data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
