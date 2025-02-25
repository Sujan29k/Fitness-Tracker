"use client"; // Required for interactive client-side features
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Import moon and sun icons
import styles from "./Header.module.css"; // Assuming you use CSS Modules

export default function Header() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Function to toggle theme using data attribute
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const handleSearch = () => {
    alert(`You searched for: ${query}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img
          src="/logo.jpg" // Replace with your logo's file path
          alt="Fitness Tracker Logo"
          className={styles.logo}
        />
        <h1 className={styles.appName}>Fitness Tracker</h1>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Dashboard
        </Link>
        <Link href="/workout" className={styles.navLink}>
          Workout
        </Link>
        <Link href="/nutrition" className={styles.navLink}>
          Nutrition
        </Link>
        <Link href="/watertracker" className={styles.navLink}>
          Water Tracker
        </Link>
      </nav>

      <div className={styles.searchBar}>
        {/* Theme Toggle Button */}
        <button onClick={toggleDarkMode} className={styles.darkModeButton}>
          {isDarkMode ? <FaSun /> : <FaMoon />} {/* Toggle icons */}
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
    </header>
  );
}
