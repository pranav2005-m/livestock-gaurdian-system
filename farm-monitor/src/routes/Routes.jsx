import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AddAnimal from "../pages/AddAnimal";
import AnimalDetails from "../pages/AnimalDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default homepage */}
        <Route path="/" element={<Home />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected / App routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-animal" element={<AddAnimal />} />
        <Route path="/animal/:id" element={<AnimalDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
