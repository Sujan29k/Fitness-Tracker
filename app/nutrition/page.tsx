import React from "react";
import Nutrition from "./nutrition";
import styles from "./page.module.css"; // Assuming you're using CSS Modules

const Page = () => {
  return (
    <div className={styles.container}>
      {/* Intro Section */}
      <div className={styles.intro}>
        <div className={styles.leftSection}>
          <h1>Fuel Your Body, Track Your Nutrition</h1>
          <p>
            Stay on top of your health goals by keeping track of the nutrients you consume daily.
            Search for your favorite food items and get detailed nutritional insights instantly.
          </p>
        </div>
        <div className={styles.rightSection}>
          <img
            src="/nutrition_trakcer.jpg" // Replace with your image path
            alt="Nutrition"
            className={styles.image}
          />
        </div>
      </div>

      {/* Nutrition Component */}
      <div className={styles.nutrition}>
        <Nutrition />
      </div>
    </div>
  );
};

export default Page;
