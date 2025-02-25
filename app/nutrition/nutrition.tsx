"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./nutrition.module.css";

interface Food {
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  sodium_mg: number;
  name: string;
  potassium_mg: number;
  fat_saturated_g: number;
  fat_total_g: number;
  calories: number;
  cholesterol_mg: number;
  protein_g: number;
  carbohydrates_total_g: number;
  image?: string;
}

interface Recipe {
  name: string;
  image: string;
}

export default function Nutrition() {
  const [query, setQuery] = useState<string>("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [calories, setCalories] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Optionally: Set theme on first load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // Fetch recipes from a dummy JSON API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        const recipeData: Recipe[] = response.data.recipes.map(
          (recipe: any) => ({
            name: recipe.name.toLowerCase(),
            image: recipe.image,
          })
        );
        setRecipes(recipeData);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      const data: Food[] = response.data.items;

      // Attach images from recipes if available
      const foodsWithImages = data.map((food) => {
        const recipeMatch = recipes.find((recipe) =>
          recipe.name.includes(food.name.toLowerCase())
        );
        return {
          ...food,
          image: recipeMatch ? recipeMatch.image : "",
        };
      });

      setFoods(foodsWithImages);
      calculateCalories(foodsWithImages);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchFoods();
    }
  };

  const calculateCalories = (foods: Food[]) => {
    const totalCalories = foods.reduce(
      (acc, food) => acc + (food.calories || 0),
      0
    );
    setCalories(totalCalories);
  };

  return (
    <div className={styles.nutritionPage}>
      <div className={styles.leftSide}>
        <h2>Search for Food Items</h2>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for food..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.rightSide}>
        <p className={styles.colorchange}>Total Calories: {calories} kcal</p>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.foodList}>
          {foods.length === 0 && !loading && !error ? (
            <p>No foods found. Try searching for a food item.</p>
          ) : (
            foods.map((food, index) => (
              <div key={index} className={styles.foodItem}>
                <span>{food.name}</span>
                <div className={styles.fooddetails}>
                  {food.image ? (
                    <img
                      src={food.image}
                      alt={food.name}
                      className={styles.foodImage}
                    />
                  ) : (
                    <p className={styles.noImage}>No image available</p>
                  )}
                  <div className={styles.nutrientlist}>
                    <p>Calories: {food.calories} kcal</p>
                    <p>Serving Size: {food.serving_size_g} g</p>
                    <p>Protein: {food.protein_g} g</p>
                    <p>Fat: {food.fat_total_g} g</p>
                    <p>Saturated Fat: {food.fat_saturated_g} g</p>
                    <p>Carbs: {food.carbohydrates_total_g} g</p>
                    <p>Fiber: {food.fiber_g} g</p>
                    <p>Sodium: {food.sodium_mg} mg</p>
                    <p>Potassium: {food.potassium_mg} mg</p>
                    <p>Cholesterol: {food.cholesterol_mg} mg</p>
                    <p>Sugar: {food.sugar_g} g</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
