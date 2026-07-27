export default function ProgressIndicator({ activeIndex, total, progress }) {
  // Format indices to be zero-padded (e.g. 01 / 05)
  const formattedActive = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div className="project-scroll-progress-container">
      <div className="project-scroll-counter">
        <span className="current-index">{formattedActive}</span>
        <span className="separator">/</span>
        <span className="total-count">{formattedTotal}</span>
      </div>
      <div className="project-progress-bar-track">
        <div 
          className="project-progress-bar-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
