"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getPlan,
  savePlan,
  getSaved,
  saveSaved,
} from "../../storage";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    setPlanCount(getPlan().length);
    setSavedCount(getSaved().length);
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          `https://api.api-store.workers.dev/api/fitlog/${id}`
        );

        const data = await response.json();
        console.log("DATA:", data);


console.log("API DATA:", data);
const workoutData = data.data ?? data;

console.log("FULL WORKOUT:", workoutData);

setWorkout({
  ...workoutData,

  duration:
    workoutData.duration ??
    workoutData.durationMinutes ??
    workoutData.time ??
    0,

  caloriesBurned:
    workoutData.caloriesBurned ??
    workoutData.calories ??
    workoutData.calorie ??
    0,

  rating:
    workoutData.rating ??
    workoutData.rate ??
    0,
});
      } catch (error) {
        console.error("Failed to fetch workout:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="details-page">
        <p>Loading workout...</p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="details-page">
        <p>Workout not found.</p>
      </main>
    );
  }

  return (
    <main className="details-page">

      
      <nav className="navbar">
        <div className="logo">
  <img src="/assets/logo.png" alt="" />
  <span>FITLOG</span>
</div>

        <div className="nav-links">
          <a href="/" className="nav-link">
            Workouts
          </a>

          <a href="/my-plan" className="nav-link">
            My Plan
          </a>
        </div>

        <div className="nav-status">
          <a href="/my-plan" className="status-item">
            Plan
            <span className="plan-badge">{planCount}</span>
          </a>

          <a href="/my-plan" className="status-item">
            Saved
            <span className="saved-badge"> {savedCount}</span>
          </a>
        </div>
      </nav>

      
      <section className="workout-details">

        <div className="details-image">
          <img
            src={workout.image}
            alt={workout.name}
          />
        </div>

        <div className="details-content">

          <div className="category-list">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="category-tag"
              >
                {group}
              </span>
            ))}
          </div>

          <h1>{workout.name}</h1>

          <p className="details-description">
            {workout.description}
          </p>

          <div className="details-stats">

            <div>
              <span>Equipment</span>
              <strong>{workout.equipment}</strong>
            </div>

            <div>
              <span>Duration</span>
                <strong>{workout.duration} min</strong>
            </div>

            <div>
              <span>Calories</span>
              <strong>{workout.caloriesBurned} kcal</strong>
            </div>

            <div>
              <span>Rating</span>
              <strong>★ {workout.rating}</strong>
            </div>

          </div>

          <h2>INSTRUCTIONS</h2>

          <ol className="instructions">
            {workout.instructions.map((instruction, index) => (
              <li key={index}>
                {instruction}
              </li>
            ))}
          </ol>

          <div className="details-buttons">
            <button
  onClick={() => {
    const plan = getPlan();

    const alreadyAdded = plan.some(
      (item: Workout) => item.id === workout.id
    );

    if (!alreadyAdded) {
      savePlan([...plan, workout]);
      setPlanCount(plan.length + 1);
      alert("Added to today's plan!");
    } else {
      alert("This workout is already in your plan.");
    }
  }}
>
  ADD TO TODAY'S PLAN
</button>

            <button
  onClick={() => {
    const saved = getSaved();

    const alreadySaved = saved.some(
      (item: Workout) => item.id === workout.id
    );

    if (!alreadySaved) {
      saveSaved([...saved, workout]);
      setSavedCount(saved.length + 1);
      alert("Saved for later!");
    } else {
      alert("This workout is already saved.");
    }
  }}
>
  SAVE FOR LATER
</button>
          </div>

        </div>

      </section>

    </main>
  );
}