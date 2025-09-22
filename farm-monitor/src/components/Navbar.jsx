import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update username whenever localStorage changes
  useEffect(() => {
    const updateUserName = () => {
      const name = localStorage.getItem("username");
      setUserName(name || "User");
    };

    updateUserName();

    // Listen to storage events (for multi-tab support)
    window.addEventListener("storage", updateUserName);
    return () => window.removeEventListener("storage", updateUserName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };

  const isActivePage = (path) => location.pathname === path;

  const getNavItemClass = (path) => {
    const baseClass =
      "relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2";
    if (isActivePage(path)) {
      return `${baseClass} bg-white/20 text-white shadow-lg backdrop-blur-sm`;
    }
    return `${baseClass} text-white/80 hover:text-white hover:bg-white/10`;
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white shadow-2xl relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand Section */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <span className="text-3xl">🚜</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                Farm Monitor
              </h1>
              <p className="text-green-100 text-sm font-medium">
                Livestock Management System
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              <Link to="/" className={getNavItemClass("/")}>
                <span className="text-xl">🏠</span>
                Home
                {isActivePage("/") && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>

              <Link to="/dashboard" className={getNavItemClass("/dashboard")}>
                <span className="text-xl">📊</span>
                Dashboard
                {isActivePage("/dashboard") && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>

              <Link to="/add-animal" className={getNavItemClass("/add-animal")}>
                <span className="text-xl">➕</span>
                Add Animal
                {isActivePage("/add-animal") && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <div className="bg-white/20 rounded-full p-2">
                  <span className="text-xl">🧑‍🌾</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">Welcome back,</p>
                  <p className="text-green-100 font-semibold">{userName}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 bg-white/90 hover:bg-white text-green-700 hover:text-green-800 px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg group-hover:animate-pulse">🚪</span>
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg transition-all duration-300 hover:bg-white/30"
          >
            <span className="text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-4 space-y-3">
              {/* User Info Mobile */}
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4 mb-4">
                <div className="bg-white/20 rounded-full p-3">
                  <span className="text-2xl">🧑‍🌾</span>
                </div>
                <div>
                  <p className="text-white font-bold">Welcome back,</p>
                  <p className="text-green-100 font-semibold text-lg">
                    {userName}
                  </p>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`${getNavItemClass("/")} w-full justify-start text-lg`}
              >
                <span className="text-xl">🏠</span>
                Home
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`${getNavItemClass("/dashboard")} w-full justify-start text-lg`}
              >
                <span className="text-xl">📊</span>
                Dashboard
              </Link>

              <Link
                to="/add-animal"
                onClick={() => setIsMenuOpen(false)}
                className={`${getNavItemClass("/add-animal")} w-full justify-start text-lg`}
              >
                <span className="text-xl">➕</span>
                Add Animal
              </Link>

              {/* Mobile Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 bg-red-500/90 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg mt-4"
              >
                <span className="text-xl">🚪</span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </nav>
  );
}
