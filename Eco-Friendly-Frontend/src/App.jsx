import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";

import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import ScrollToTop from "./components/ScrollToTop";
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddProduct from './components/AddProduct';
import OrderDetails from './pages/OrderDetails';

function Layout() {
  const location = useLocation();

  // Hide Header & Footer on Login and Signup
  const hideHeaderFooter = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/order-details" element={<OrderDetails />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}

export default App;
