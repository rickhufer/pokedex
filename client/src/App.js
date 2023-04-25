import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home';
import Search from './views/Search/Search';
import Landing from './views/Landing/Landing';
import Form from './views/Form/Form';
import Detail from './views/Detail/Detail';
import Header from './components/Header/Header'


function App() {
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home/search" element={<Search />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:detailId" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
