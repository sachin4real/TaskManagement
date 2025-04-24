// src/App.js

import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskManagementApp from "./components/TaskManagementApp"; // Import the new component

function App() {
  const [theme, setTheme] = useState("light");

  const handleModeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gradient-to-r from-yellow-100 to-gray-200"} p-6`}>
        <Header onThemeToggle={handleModeToggle} currentTheme={theme} />
        
        {/* Task Management Content */}
        <TaskManagementApp />

        {/* Footer with added gap */}
        <div className="my-12"></div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
