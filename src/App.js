import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./pages/Cart/Cart";
import All from "./pages/All/All";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact index element={<Home />} />
        <Route exact path="all" element={<All />} />
        <Route exact path="cart" element={<Cart />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
