"use client"; // For interactive client-side features like the search bar
import Link from "next/link";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Import moon and sun icons from react-icons
import styles from "./Header.module.css"; // Assuming you use CSS Modules for styling

export default function Header() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = () => {
    alert(`You searched for: ${query}`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Toggle dark mode class on <html> element
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
        {/* Use moon icon for dark mode */}
        <button onClick={toggleDarkMode} className={styles.darkModeButton}>
          {isDarkMode ? <FaSun /> : <FaMoon />}{" "}
          {/* Toggle between moon and sun */}
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
