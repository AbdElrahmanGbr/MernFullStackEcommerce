import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='container container-fluid'>
        <Routes>
          <Route path='/' element={<Home />} exact />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
