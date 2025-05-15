import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Navbar from "./components/Navbar";
import CarsPage from './pages/CarsPage';


function App() {
  return (
  
    <Router>
      <Navbar />
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/Login" element={<LoginPage />} />
  <Route path="/Register" element={<RegisterPage />} />
  <Route path="/cars" element={<CarsPage />} />
  
</Routes>


    </Router>
  );
}

export default App;
