// import logo from './logo.svg';
import { Route, Routes } from 'react-router';
import './App.css';
import Cards from './componets/Cards';
import Header from './componets/Header';
import Cart from './componets/Cart';
import { ProductProvider } from './context/productContext';


function App() {
  return (
    <div className="App">
      <ProductProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Cards></Cards>} />
          <Route path="Cart" element={<Cart></Cart>} />
        </Routes>
      </ProductProvider>

    </div>
  );
}

export default App;
