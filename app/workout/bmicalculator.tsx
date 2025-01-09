"use client";
import React, { useState } from "react";
import styles from "./bmicalculator.module.css";

const BmiCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | string>(""); // Height in cm
  const [weight, setWeight] = useState<number | string>(""); // Weight in kg
  const [bmi, setBmi] = useState<number | null>(null); // Calculated BMI
  const [category, setCategory] = useState<string>(""); // BMI Category

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight!");
      return;
    }

    const heightInMeters = Number(height) / 100; // Convert height to meters
    const calculatedBmi = Number(weight) / (heightInMeters * heightInMeters); // BMI Formula
    setBmi(parseFloat(calculatedBmi.toFixed(2))); // Set BMI with 2 decimal places

    // Determine BMI category
    if (calculatedBmi < 18.5) {
      setCategory("Underweight");
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      setCategory("Normal weight");
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>BMI Calculator</h2>
      <div className={styles.form}>
        <label htmlFor="height" className={styles.label}>
          Height (cm):
        </label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className={styles.input}
          placeholder="Enter your height"
        />

        <label htmlFor="weight" className={styles.label}>
          Weight (kg):
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={styles.input}
          placeholder="Enter your weight"
        />

        <button onClick={calculateBMI} className={styles.button}>
          Calculate BMI
        </button>
      </div>

      {bmi !== null && (
        <div className={styles.result}>
          <p>Your BMI: <strong>{bmi}</strong></p>
          <p>Category: <strong>{category}</strong></p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
