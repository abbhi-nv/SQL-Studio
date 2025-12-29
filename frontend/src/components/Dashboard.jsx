import { useEffect, useState } from "react";

function Dashboard() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5050/api/attempts/demo-user-1")
      .then((res) => res.json())
      .then(setAttempts);
  }, []);

  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  const wrong = total - correct;

  return (
    <div className="dashboard">
      <h2>Your Dashboard</h2>

      <div className="stats">
        <div>Total Attempts: {total}</div>
        <div>Correct: {correct}</div>
        <div>Wrong: {wrong}</div>
      </div>

      <h3>Recent Attempts</h3>
      <ul>
        {attempts.slice(0, 5).map((a) => (
          <li key={a._id}>
            [{a.difficulty}] Assignment {a.assignmentId} —{" "}
            {a.correct ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;