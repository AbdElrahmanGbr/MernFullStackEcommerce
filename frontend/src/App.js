import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails'
import Cart from './components/cart/Cart'


function App() {
  return (
    <div className="App">
      <Header />
      <div className='container container-fluid'>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path="/product/:id" element={<ProductDetails/>} exact />
            <Route path="/cart" component={Cart} exact />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
