
const Page = () => {
  return (
    <main>
      
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

          <a href= "/my-plan" className="status-item">
            Saved
            <span className="saved-badge">0</span>
          </a>
        </div>
      </nav>

      
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">WORKOUT LIBRARY</p>

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

    </main>
  );
};

export default Page;