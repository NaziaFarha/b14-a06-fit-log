
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
    </main>
  );
};

export default Page;