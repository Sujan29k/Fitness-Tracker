"use client";
import React from "react";
import styles from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Text Section */}
      <div className={styles.textSection}>
        <h1 className={styles.title}>Stay on Top of Your Workouts</h1>
        <p className={styles.description}>
          Keep track of your fitness progress with ease. Log your daily exercises, 
          set goals, and stay motivated to achieve your personal best.
        </p>
      </div>

      {/* Image Section */}
      <div className={styles.imageSection}>
        <img
          src="/fitnessmain.jpg" /* Replace with your actual image path */
          alt="Workout Tracker"
          className={styles.image}
        />
      </div>
    </header>
  );
};

export default Header;
