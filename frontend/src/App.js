import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import assignments from "./data/assignments";
import "./styles/App.scss";

/* =====================
   AUTO-CHECK FUNCTION
===================== */
function checkCorrectness(result, assignment) {
  if (!result || !assignment) {
    return { ok: false, reason: "No result" };
  }

  if (!assignment.expectedColumns) {
    return { ok: true };
  }

  const normalize = (col) =>
    col.toLowerCase().replace(/_/g, "");

  const actualCols = result.columns.map(normalize);
  const expectedCols = assignment.expectedColumns.map(normalize);

  const isMatch =
    expectedCols.length === actualCols.length &&
    expectedCols.every((col) => actualCols.includes(col));

  if (!isMatch) {
    return {
      ok: false,
      reason: `Expected columns: ${assignment.expectedColumns.join(", ")}`
    };
  }

  return { ok: true };
}

function App() {
  const { user, logout } = useContext(AuthContext);
  

  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState({});
  const [difficulty, setDifficulty] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  /* =====================
   LOAD PROGRESS FROM localStorage
===================== */
useEffect(() => {
  const saved = localStorage.getItem("sqlstudio-progress");
  if (saved) {
    setCompleted(JSON.parse(saved));
  }
}, []);

/* =====================
   SAVE PROGRESS TO localStorage
===================== */
useEffect(() => {
  localStorage.setItem(
    "sqlstudio-progress",
    JSON.stringify(completed)
  );
}, [completed]);

/* =====================
     AUTH GUARD (IMPORTANT)
  ===================== */
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  /* =====================
   RESET PROGRESS (OPTIONAL)
===================== */
  const resetProgress = () => {
    localStorage.removeItem("sqlstudio-progress");
    setCompleted({});
  };

  /* =====================
     PROGRESS CALCULATION
  ===================== */
  const totalAssignments =
    difficulty ? assignments[difficulty].length : 0;

  const completedCount = Object.keys(completed).filter((key) =>
    key.startsWith(difficulty)
  ).length;

  const progressPercent =
    totalAssignments === 0
      ? 0
      : Math.round((completedCount / totalAssignments) * 100);

  /* =====================
     EXECUTE QUERY
  ===================== */
  const executeQuery = async () => {
    if (!sql.trim() || !selectedAssignment) return;

    setFeedback(null);

    try {
      const response = await fetch("http://127.0.0.1:5050/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Query failed");
        return;
      }

      setResult(data);

      const verdict = checkCorrectness(data, selectedAssignment);

      if (verdict.ok) {
        setFeedback({ type: "success", message: "✅ Correct answer" });

        const key = `${difficulty}-${selectedAssignment.id}`;
        setCompleted((prev) => ({
          ...prev,
          [key]: true,
        }));
      } else {
        setFeedback({ type: "error", message: verdict.reason });
      }

      fetch("http://127.0.0.1:5050/api/attempts/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: "demo-user-1", // temporary until auth
    assignmentId: selectedAssignment.id,
    difficulty,
    sql,
    correct: verdict.ok,
  }),
}).catch(() => {});

      setHistory((prev) => [sql, ...prev].slice(0, 5));
    } catch {
      alert("Backend not reachable");
    }
  };

  /* =====================
     ✅ ADDITION 1: NAV LOGIC
  ===================== */
  const goToAssignment = (index) => {
    const list = assignments[difficulty];
    if (!list || index < 0 || index >= list.length) return;

    setCurrentIndex(index);
    setSelectedAssignment(list[index]);
    setResult(null);
    setSql("");
    setFeedback(null);
  };

  return (
    <div className="app">
      <div className="container">

        {/* HEADER */}
        <header className="header">
  <h1 className="title">SQL STUDIO</h1>
</header>

        <div className="divider" />
        <div className="toolbar">
  {/* DIFFICULTY + MODE SWITCH ROW */}
<div className="top-controls">
  <div className="difficulty-select">
    <label>Difficulty Level</label>
    <select
      value={difficulty}
      onChange={(e) => {
        setDifficulty(e.target.value);
        setSelectedAssignment(null);
        setResult(null);
        setSql("");
        setHistory([]);
        setFeedback(null);
      }}
    >
      <option value="" disabled>Select difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </div>
  
  

  {/* =====================
   MODE SWITCH + LOGOUT
===================== */}
<div className="mode-switch">

  <div
    className={`switch-indicator ${showDashboard ? "right" : "left"}`}
  />

  <button
    className={!showDashboard ? "active" : ""}
    onClick={() => setShowDashboard(false)}
  >
    🧪 Practice
  </button>

  <button
    className={showDashboard ? "active" : ""}
    onClick={() => setShowDashboard(true)}
  >
    📊 Dashboard
  </button>

  {/* 🔴 LOGOUT BUTTON */}
  <button
    className="logout-btn"
    onClick={logout}
  >
    🚪 Logout
  </button>

</div>
</div>
</div>
{showDashboard ? (
  /* =====================
     DASHBOARD VIEW
  ===================== */
  <div className="dashboard">
  <h2 className="dashboard-title">Your Dashboard</h2>

  {/* STATS */}
  <div className="dashboard-stats">
    <div className="stat-card">
      <h3>Total Completed</h3>
      <p>{Object.keys(completed).length}</p>
    </div>

    <div className="stat-card">
      <h3>Current Difficulty</h3>
      <p>{difficulty ? difficulty.toUpperCase() : "—"}</p>
    </div>
  </div>

  {/* COMPLETED LIST */}
  {Object.keys(completed).length === 0 ? (
    <div className="dashboard-empty">
      <p>No assignments completed yet.</p>
    </div>
  ) : (
    <ul className="completed-list">
      {Object.keys(completed).map((key) => (
        <li key={key}>✔ {key}</li>
      ))}
    </ul>
  )}
</div>
) : (
  /* =====================
     PRACTICE VIEW
  ===================== */
  <>
    {!difficulty && (
      <div className="intro-card">
        <h2>Welcome to SQL Studio 👋</h2>
        <p>
          Practice SQL queries with real-world assignments.
          Choose a difficulty level to begin.
        </p>
        <ul>
          <li>✔ 45 curated SQL problems</li>
          <li>✔ Auto-check correctness</li>
          <li>✔ Progress tracking</li>
        </ul>
      </div>
    )}

    {/* EVERYTHING below stays EXACTLY as you already have */}
    {/* progress card */}
    {/* assignment list */}
    {/* assignment details */}
    {/* workspace */}
    {/* result table */}
  </>
)}

        {difficulty && !selectedAssignment && (
          <p className="difficulty-info">
            Showing <strong>{difficulty.toUpperCase()}</strong> assignments.
            Select one to continue ↓
          </p>
        )}

       {/* PROGRESS */}
{difficulty && (
  <div className="progress-card">
    <div className="progress-header">
      <div className="progress-text">
        Progress: {completedCount} / {totalAssignments}
      </div>

      {/* ✅ RESET BUTTON */}
      <button
        className="reset-btn"
        onClick={resetProgress}
      >
        Reset
      </button>
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  </div>
)}

        {/* ASSIGNMENT LIST */}
        {difficulty && !selectedAssignment && (
          <div className="assignment-list">
            <h2 className="list-heading">
              {difficulty.toUpperCase()} ASSIGNMENTS
            </h2>

            {assignments[difficulty].map((a, index) => {
              const key = `${difficulty}-${a.id}`;
              return (
                <div
                  key={a.id}
                  className={`assignment-item ${completed[key] ? "done" : ""}`}
                  onClick={() => {
                    setSelectedAssignment(a);
                    setCurrentIndex(index);
                    setResult(null);
                    setSql("");
                    setFeedback(null);
                  }}
                >
                  <span className="assignment-index">{index + 1}.</span>
                  <span className="assignment-title">{a.title}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* ASSIGNMENT DETAILS */}
        {selectedAssignment && (
          <div className="assignment-card">
            <h2>{selectedAssignment.title}</h2>

            <p className="description">
              {selectedAssignment.description}
            </p>

            <pre className="schema-box">
              {selectedAssignment.schema}
            </pre>

            {selectedAssignment.expectedColumns && (
              <div className="expected-output">
                <h4>Expected Output</h4>
                <p>
                  Columns:{" "}
                  <strong>
                    {selectedAssignment.expectedColumns.join(", ")}
                  </strong>
                </p>

                {selectedAssignment.expectedOutput && (
                  <pre className="expected-box">
                    {selectedAssignment.expectedOutput}
                  </pre>
                )}
              </div>
            )}

            {/* =====================
               ✅ ADDITION 2: NAV UI
            ===================== */}
            <div className="assignment-navigation">
              <button
                className="nav-btn"
                disabled={currentIndex === 0}
                onClick={() => goToAssignment(currentIndex - 1)}
              >
                ← Previous
              </button>

              <span className="nav-indicator">
                {currentIndex + 1} / {assignments[difficulty].length}
              </span>

              <button
                className="nav-btn"
                disabled={currentIndex === assignments[difficulty].length - 1}
                onClick={() => goToAssignment(currentIndex + 1)}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* WORKSPACE */}
        {selectedAssignment && (
          <div className="workspace">
            {/* SQL EDITOR */}
            <div className="editor-card">
              <h3 className="section-title">SQL Editor</h3>

              <textarea
                placeholder="Write your SQL query here..."
                value={sql}
                onChange={(e) => setSql(e.target.value)}
              />

              <button className="run-btn" onClick={executeQuery}>
                Run
              </button>

              {feedback && (
                <p className={`feedback ${feedback.type}`}>
                  {feedback.message}
                </p>
              )}

              {feedback?.type === "error" && selectedAssignment.hint && (
                <p className="hint">
                  💡 Hint: {selectedAssignment.hint}
                </p>
              )}
            </div>

            {/* HISTORY */}
            <div className="history-card">
              <h3 className="section-title">History</h3>

              <div className="history-list">
                {history.length === 0 ? (
                  <p className="empty">No queries yet</p>
                ) : (
                  history.map((q, i) => {
                    const firstLine = q.split("\n")[0];
                    const preview =
                      firstLine.length > 80
                        ? firstLine.slice(0, 80) + "..."
                        : firstLine;

                    return (
                      <div
                        key={i}
                        className="history-item"
                        title={q}
                        onClick={() => setSql(q)}
                      >
                        {preview}
                      </div>
                    );
                  })
                )}
              </div>

              <button
                className="clear-btn"
                onClick={() => setHistory([])}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* RESULT TABLE */}
        {selectedAssignment && result?.rows && (
          <div className="result-card">
            <table>
              <thead>
                <tr>
                  {result.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i}>
                    {result.columns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;