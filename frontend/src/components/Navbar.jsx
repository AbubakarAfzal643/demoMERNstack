import { useNavigate, useLocation } from "react-router-dom";
import {toast} from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToHome = () => {
    toast.success('✨ Welcome to Home Page!!', {
      toastId: 'navbar-home-toast',
      icon: '🏠',
      className: 'glass-effect',
    })
    navigate("/");
  };

  const navigateToStudents = () => {
    navigate("/students");
    toast.success('📚 Welcome to Student Portal!!', {
      toastId: 'navbar-students-toast',
      icon: '👥',
      className: 'glass-effect',
    })
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-glow sticky top-0 z-50 glass-dark border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
              <h1 className="relative bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-2xl font-bold font-space-grotesk">
                MERN
              </h1>
            </div>
            <span className="text-gray-400 text-sm font-light">Studio</span>
          </div>

          {/* Navigation Items */}
          <ul className="flex space-x-2">
            <button
              className={`btn-glow relative px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={navigateToHome}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🏠</span>
                <span>Home</span>
              </span>
              {!isActive('/') && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
              )}
            </button>

            <button
              className={`btn-glow relative px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                isActive('/students') 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={navigateToStudents}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>📚</span>
                <span>Students</span>
              </span>
              {!isActive('/students') && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
              )}
            </button>
          </ul>
        </div>
      </div>

      {/* Animated bottom border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </nav>
  );
};

export default Navbar;
