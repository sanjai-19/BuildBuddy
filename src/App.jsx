import { useState, useEffect } from "react";
import {
  careerPaths,
  careerInfo,
} from "./roadmapData";
function App() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [compareCareer, setCompareCareer] =
  useState("");

  useEffect(() => {
    const savedRoadmap = localStorage.getItem("roadmap");

    if (savedRoadmap) {
      setRoadmap(JSON.parse(savedRoadmap));
    }
  }, []);
  const loadCareer = (career) => {
  setGoal(career);

  const newRoadmap = careerPaths[career];

  setRoadmap(newRoadmap);

  localStorage.setItem(
    "roadmap",
    JSON.stringify(newRoadmap)
  );
};

  const generatePlan = () => {
    const text = goal.toLowerCase();

    const matchedCareer = Object.keys(careerPaths).find(
      (career) => text.includes(career)
    );

    if (matchedCareer) {
      const newRoadmap = careerPaths[matchedCareer];

      setRoadmap(newRoadmap);

      localStorage.setItem(
        "roadmap",
        JSON.stringify(newRoadmap)
      );
    } else {
      alert(
        "Career not found. Try: ai engineer or data analyst"
      );
    }
  };

  const toggleComplete = (index) => {
    const updatedRoadmap = [...roadmap];

    updatedRoadmap[index].completed =
      !updatedRoadmap[index].completed;

    setRoadmap(updatedRoadmap);

    localStorage.setItem(
      "roadmap",
      JSON.stringify(updatedRoadmap)
    );
  };

  const resetProgress = () => {
    const resetRoadmap = roadmap.map((step) => ({
      ...step,
      completed: false,
    }));

    setRoadmap(resetRoadmap);

    localStorage.setItem(
      "roadmap",
      JSON.stringify(resetRoadmap)
    );
  };

  const completedCount = roadmap.filter(
    (step) => step.completed
  ).length;

  const progressPercentage =
    roadmap.length > 0
      ? (completedCount / roadmap.length) * 100
      : 0;
      const filteredCareers = Object.keys(careerPaths).filter(
  (career) =>
    career.toLowerCase().includes(goal.toLowerCase())
);

  return (
    <div className="container">
      <h1>🚀 BuildBuddy</h1>
      <p>Your AI Career GPS</p>

<p>
  {Object.keys(careerPaths).length} Careers Available
</p>

     <input
        type="text"
        placeholder="Enter career (AI Engineer, Data Analyst...)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      {goal && (
  <div className="suggestions">
    {filteredCareers.slice(0, 5).map((career) => (
      <div
        key={career}
        className="suggestion-item"
        onClick={() => loadCareer(career)}
      >
        {career}
      </div>
    ))}
  </div>
)}

      <br />
      <br />

      <button onClick={generatePlan}>
        Generate Plan
      </button>

      <button
  onClick={resetProgress}
  style={{ marginLeft: "10px" }}
>
  Reset Progress
</button>
<div style={{ marginTop: "20px" }}>
  <h3>Compare Careers</h3>

  <select
    value={compareCareer}
    onChange={(e) =>
      setCompareCareer(e.target.value)
    }
  >
    <option value="">
      Select Career
    </option>

    {Object.keys(careerInfo).map((career) => (
      <option key={career} value={career}>
        {career}
      </option>
    ))}
  </select>
</div>

<div className="career-grid">
  {Object.keys(careerPaths).map((career) => (
    <button
  key={career}
  className={`career-card ${
    goal === career ? "selected-career" : ""
  }`}
      onClick={() => loadCareer(career)}
    >
      <h3>{career}</h3>

      <p>
        {careerPaths[career].length} Steps
      </p>

      <small>Click to view roadmap</small>
    </button>
  ))}
</div>

<h2 style={{ marginTop: "30px" }}>
  Your Goal:
</h2>

<p>{goal}</p>

{careerInfo[goal] && (
  <div className="career-stats">
  <div className="stat-card">
    <h4>💰 Salary</h4>
    <p>{careerInfo[goal].salary}</p>
  </div>

  <div className="stat-card">
    <h4>📈 Demand</h4>
    <p>{careerInfo[goal].demand}</p>
  </div>
  <div className="stat-card">
  <h4>🔥 Difficulty</h4>
  <p>{careerInfo[goal].difficulty}</p>
</div>

  <div className="stat-card">
  <h4>⏳ Learning Time</h4>
  <p>{careerInfo[goal].learningTime}</p>
</div>
</div>
)}
{goal &&
  compareCareer &&
  careerInfo[goal] &&
  careerInfo[compareCareer] && (
    <div className="comparison-card">
      <h2>
        {goal} vs {compareCareer}
      </h2>

      <p>
        💰 Salary:
        {" "}
        {careerInfo[goal].salary}
        {" vs "}
        {careerInfo[compareCareer].salary}
      </p>

      <p>
        📈 Demand:
        {" "}
        {careerInfo[goal].demand}
        {" vs "}
        {careerInfo[compareCareer].demand}
      </p>

      <p>
        🔥 Difficulty:
        {" "}
        {careerInfo[goal].difficulty}
        {" vs "}
        {careerInfo[compareCareer].difficulty}
      </p>

      <p>
        ⏳ Learning Time:
        {" "}
        {careerInfo[goal].learningTime}
        {" vs "}
        {careerInfo[compareCareer].learningTime}
      </p>
    </div>
)}
      {roadmap.length > 0 && (
        <>
          <h2>Your Learning Path</h2>

          <p className="progress-text">
            Progress: {completedCount} / {roadmap.length}
            {" "}Completed (
            {Math.round(progressPercentage)}%)
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progressPercentage}%`,
              }}
            ></div>
          </div>

          {roadmap.map((step, index) => (
            <div
              className="roadmap-card"
              key={index}
            >
              <div className="card-header">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() =>
                    toggleComplete(index)
                  }
                />

                <h3
                  className={
                    step.completed
                      ? "completed-title"
                      : ""
                  }
                >
                  {step.title}
                </h3>
              </div>

              <div className="card-content">
                <p>
                  <strong>Why:</strong> {step.why}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {step.duration}
                </p>

                <p>
                  <strong>Project:</strong>{" "}
                  {step.project}
                </p>

                <p>
                  <strong>Resources:</strong>
                </p>

               <ul>
  {step.resources.map((resource, i) => (
    <li key={i}>
      {typeof resource === "string" ? (
        resource
      ) : (
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
        >
          {resource.name}
        </a>
      )}
    </li>
  ))}
</ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;