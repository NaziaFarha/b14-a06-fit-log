
"use client";

import { useEffect, useState } from "react";

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

const Page = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/fitlog"
        );

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <main>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-mark">★</span>
          <span>FITLOG</span>
        </div>

        <div className="nav-links">
          <a href="/" className="nav-link active">
            Workouts
          </a>

          <a href="/my-plan" className="nav-link">
            My Plan
          </a>
        </div>

        <div className="nav-status">
          <a href="/my-plan" className="status-item">
            Plan
            <span className="plan-badge">0</span>
          </a>

          <a href="/my-plan" className="status-item">
            Saved
            <span className="saved-badge">0</span>
          </a>
        </div>
      </nav>


      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <p className="hero-eyebrow">
            WORKOUT LIBRARY
          </p>

          <h1>
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <a href="#library" className="hero-button">
            BROWSE WORKOUTS <span>→</span>
          </a>

        </div>

         <div className="hero-image">
          <img src="/assets/banner.png" alt="Workout exercise" />
        </div>
      </section>
    
      {/* LIBRARY SECTION */}
      <section id="library" className="library-section">

        <div className="section-heading">
          <h2>THE LIBRARY</h2>
          <p>
            Twelve lifts covering every major muscle group.
          </p>
        </div>


        {/* LOADING */}
        {loading && (
          <p style={{ color: "#777b82" }}>
            Loading workouts...
          </p>
        )}


        {/* WORKOUT CARDS */}
        {!loading && (
          <div className="workout-grid">

            {workouts.map((workout) => (

              <a
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="workout-card"
              >

                {/* IMAGE */}
                <div className="workout-image">
                  <img
                    src={workout.image}
                    alt={workout.name}
                  />
                </div>


                {/* CONTENT */}
                <div className="workout-content">

                  {/* CATEGORY */}
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


                  {/* NAME */}
                  <h3>
                    {workout.name}
                  </h3>


                  {/* EQUIPMENT */}
                  <p className="equipment">
                    {workout.equipment}
                  </p>


                  {/* STATS */}
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

              </a>

            ))}

          </div>
        )}

      </section>

    </main>
  );
};

export default Page;