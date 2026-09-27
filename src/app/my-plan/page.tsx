"use client";

import { useEffect, useState } from "react";
import {
  getPlan,
  savePlan,
  getSaved,
  saveSaved,
} from "../storage";

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

export default function MyPlan() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"calories" | "duration" | "rating">("duration");


  useEffect(() => {
    setPlan(getPlan());
    setSaved(getSaved());
  }, []);

  const removeFromPlan = (id: number) => {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);
    savePlan(updatedPlan);
  };

  const removeFromSaved = (id: number) => {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id
    );

    setSaved(updatedSaved);
    saveSaved(updatedSaved);
  };

  const markAsDone = (id: number) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
    }
  };

  const currentWorkouts =
    activeTab === "plan" ? plan : saved;
    const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
  if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
  if (sortBy === "duration") return b.duration - a.duration;
  if (sortBy === "rating") return b.rating - a.rating;
  return 0;
});


  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <div className="my-plan-page">

      
      <nav className="navbar">

        <div className="logo">
  <img src="/assets/logo.png" alt="" />
  <span>FITLOG</span>
</div>

        <div className="nav-links">
          <a href="/" className="nav-link">
            Workouts
          </a>

          <a
            href="/my-plan"
            className="nav-link active"
          >
            My Plan
          </a>
        </div>

        <div className="nav-status">

          <a
            href="/my-plan"
            className="status-item"
          >
            Plan
            <span className="plan-badge">
              {plan.length}
            </span>
          </a>

          <a
            href="/my-plan"
            className="status-item"
          >
            Saved
            <span className="saved-badge">
              {saved.length}
            </span>
          </a>

        </div>

      </nav>

    
      <section className="plan-header">

        <h1>MY PLAN</h1>

        <p>
          Cap of five lifts for today. Finish them,
          then load more.
        </p>

      </section>

      <section className="plan-stats">

        <div>
          <span>Exercises</span>
          <strong>{plan.length}</strong>
        </div>

        <div>
          <span>Minutes</span>
          <strong>{totalMinutes}</strong>
        </div>

        <div>
          <span>Calories</span>
          <strong>{totalCalories}</strong>
        </div>

      </section>

      <section className="plan-section">

        <div className="plan-toolbar">

          <div className="plan-tabs">

            <button
              className={
                activeTab === "plan"
                  ? "tab-button active"
                  : "tab-button"
              }
              onClick={() => setActiveTab("plan")}
            >
              Today's Plan
            </button>

            <button
              className={
                activeTab === "saved"
                  ? "tab-button active"
                  : "tab-button"
              }
              onClick={() => setActiveTab("saved")}
            >
              Saved
            </button>

          </div>

          <div className="sort-box">
            <span>Sort By</span>

            <select
  value={sortBy}
  onChange={(e) =>
    setSortBy(
      e.target.value as "calories" | "duration" | "rating"
    )
  }
>
  <option value="calories">Calories</option>
  <option value="duration">Duration</option>
  <option value="rating">Rating</option>
</select>

          </div>

        </div>

        
        {currentWorkouts.length === 0 && (

          <div className="empty-plan">

            <h3>
              NOTHING HERE YET
            </h3>

            <p>
              Browse the library and add a lift to
              get today moving.
            </p>

            <a
              href="/"
              className="hero-button"
            >
              GO TO WORKOUTS
            </a>

          </div>

        )}

        {currentWorkouts.length > 0 && (

          <div className="plan-grid">

            {sortedWorkouts.map((workout) => (

              <div
                className="plan-card"
                key={workout.id}
              >

                <div className="plan-card-image">
                  <img
                    src={workout.image}
                    alt={workout.name}
                  />
                </div>

                <div className="plan-card-content">

                  <div className="category-list">

                    {workout.muscleGroups
                      .slice(0, 1)
                      .map((group) => (
                        <span
                          key={group}
                          className="category-tag"
                        >
                          {group}
                        </span>
                      ))}

                  </div>

                  <h3>
                    {workout.name}
                  </h3>

                  <p className="equipment">
                    {workout.equipment}
                  </p>

                  <div className="workout-stats">

                    <span>
                      ◷ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>

                  </div>

                </div>

                <div className="plan-card-actions">

                  <a
                    href={`/workouts/${workout.id}`}
                    className="view-details-button"
                  >
                    View Details
                  </a>

                  {activeTab === "plan" && (
                    <button
                      className={
                        completed.includes(workout.id)
                          ? "done-button completed"
                          : "done-button"
                      }
                      onClick={() =>
                        markAsDone(workout.id)
                      }
                    >
                      {completed.includes(workout.id)
                        ? "✓ Done"
                        : "✓ Mark as Done"}
                    </button>
                  )}

                  <button
                    className="remove-x"
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                    }}
                  >
                    ×
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      <footer className="plan-footer">

  <div className="footer-logo">
    <img src="/assets/logo.png" alt="FitLog" />
  </div>

  <p>
    © 2026 FitLog — Workout Library. Train hard,
    log honest.
  </p>

</footer>

    </div>
  );
}