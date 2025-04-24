// src/components/Header.jsx

import { Link } from 'react-router-dom';

const Header = ({ onThemeToggle, currentTheme }) => {
  return (
    <header className={`p-6 ${currentTheme === "dark" ? "bg-gray-900" : "bg-gradient-to-r from-yellow-100 to-gray-200"} shadow-md`}>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-extrabold text-gray-800">
          <span className={`${currentTheme === "dark" ? "text-white" : "text-black"}`}>TaskMaster</span>
        </div>

        <nav className="space-x-8">
          <Link to="/" className="text-gray-800 hover:text-yellow-500 transition duration-300">
            Dashboard
          </Link>
          <Link to="/tasks" className="text-gray-800 hover:text-yellow-500 transition duration-300">
            Tasks
          </Link>
          <Link to="/settings" className="text-gray-800 hover:text-yellow-500 transition duration-300">
            Settings
          </Link>
        </nav>

        <button
          onClick={onThemeToggle}
          className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300"
        >
          {currentTheme === "light" ? "🌑" : "☀️"}
        </button>
      </div>
    </header>
  );
};

export default Header;
