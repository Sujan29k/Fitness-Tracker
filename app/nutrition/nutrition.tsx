"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./nutrition.module.css"; // Assuming you're using CSS Modules

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
  image?: string; // Add an optional image property
}

interface Recipe {
  name: string;
  image: string;
}

export default function Nutrition() {
  const [query, setQuery] = useState<string>(""); // Search query
  const [foods, setFoods] = useState<Food[]>([]); // Foods array
  const [calories, setCalories] = useState<number>(0); // Total calories
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Recipes from the dummy JSON API

  // Fetch recipes from dummy JSON API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        const recipeData: Recipe[] = response.data.recipes.map((recipe: any) => ({
          name: recipe.name.toLowerCase(),
          image: recipe.image,
        }));
        setRecipes(recipeData);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    setError(null); // Reset error before making the request
    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY, // API key from environment variable
          },
        }
      );

      // Extract the `items` array from the response data
      const data: Food[] = response.data.items;

      // Match foods with recipes to attach images
      const foodsWithImages = data.map((food) => {
        const recipeMatch = recipes.find((recipe) =>
          recipe.name.includes(food.name.toLowerCase())
        );
        return {
          ...food,
          image: recipeMatch ? recipeMatch.image : "", // Attach image or leave empty
        };
      });

      setFoods(foodsWithImages); // Set the foods
      calculateCalories(foodsWithImages); // Calculate total calories
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
    ); // Sum calories
    setCalories(totalCalories); // Set total calories
  };

  return (
    <div className={styles.nutritionPage}>
      <div className={styles.leftSide}>
        <h2>Search for food item</h2>
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
