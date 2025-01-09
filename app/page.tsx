import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Welcome to Fitness Tracker</h1>
          <p>
            Your ultimate companion to track workouts, nutrition, and hydration.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
        <div className={styles.heroImage}>
          <img src="/fitnessmain.jpg" alt="Fitness Tracker" />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Features</h2>
        <div className={styles.featureList}>
          {/* Workout Tracker Feature */}
          <Link href="/workout">
            <div className={styles.featureItem}>
              <img src="/workouttracker.webp" alt="Workout Tracker" />
              <h3>Workout Tracker</h3>
              <p>Log and monitor your daily workouts to stay on track.</p>
            </div>
          </Link>

          {/* Nutrition Guide Feature */}
          <Link href="/nutrition">
            <div className={styles.featureItem}>
              <img src="/nutrition_trakcer.jpg" alt="Nutrition Guide" />
              <h3>Nutrition Guide</h3>
              <p>Plan your meals and maintain a healthy diet effortlessly.</p>
            </div>
          </Link>

          {/* Water Tracker Feature */}
          <Link href="/water-tracker">
            <div className={styles.featureItem}>
              <img src="/watertracker.webp" alt="Water Tracker" />
              <h3>Water Tracker</h3>
              <p>Keep yourself hydrated with our easy-to-use water tracker.</p>
            </div>
          </Link>
        </div>
      </section>

      
    </div>
  );
}
