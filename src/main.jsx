import { useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  CircleUserRound,
  Droplets,
  Dumbbell,
  Footprints,
  HeartPulse,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings,
  Target,
  TrendingUp,
  UserRound,
  Weight,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.css";

const weeklyActivity = [
  { day: "Mon", steps: 6200, workout: 32 },
  { day: "Tue", steps: 8400, workout: 48 },
  { day: "Wed", steps: 5100, workout: 22 },
  { day: "Thu", steps: 9200, workout: 56 },
  { day: "Fri", steps: 7500, workout: 40 },
  { day: "Sat", steps: 6800, workout: 35 },
  { day: "Sun", steps: 7500, workout: 28 },
];

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "health", label: "Health tracking", icon: HeartPulse },
  { id: "workouts", label: "Workouts", icon: Dumbbell },
  { id: "goals", label: "Goals", icon: Target },
  { id: "history", label: "History", icon: History },
];

function App() {
  const [activeView, setActiveView] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [metrics, setMetrics] = useState({
    steps: 7500,
    water: 6,
    sleep: 7.2,
    workouts: 4,
  });

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const selectView = (view) => {
    setActiveView(view);
    setMobileNavOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">
            <Activity size={19} />
          </span>
          <span>FitTrack</span>
        </div>
        <div className="workspace-label">YOUR WELLNESS SPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeView === id ? "active" : ""}`}
              onClick={() => selectView(id)}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {activeView === id && (
                <ChevronRight className="nav-arrow" size={16} />
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() =>
              showToast("Settings are ready for the backend integration.")
            }>
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <div className="sidebar-note">
            <Zap size={16} />
            <span>
              <strong>Small steps.</strong>
              <br />
              Steady progress.
            </span>
          </div>
          <button
            className="profile-mini"
            onClick={() => showToast("Profile settings coming next.")}>
            <span className="avatar avatar-small">AR</span>
            <span>
              <strong>Alex Rivera</strong>
              <small>Free plan</small>
            </span>
            <ChevronRight size={15} />
          </button>
        </div>
      </aside>
      {mobileNavOpen && (
        <button
          className="scrim"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobileNavOpen(true)}>
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            <span>My space</span>
            <ChevronRight size={14} />
            <strong>
              {navItems.find((item) => item.id === activeView)?.label}
            </strong>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => showToast("You are all caught up.")}>
              <Bell size={19} />
              <i />
            </button>
            <button className="avatar avatar-top" aria-label="Open profile">
              AR
            </button>
          </div>
        </header>

        <div className="page-wrap">
          {activeView === "overview" && (
            <Overview
              metrics={metrics}
              onAdd={(key, amount) => {
                setMetrics({ ...metrics, [key]: metrics[key] + amount });
                showToast("Today's progress updated.");
              }}
              onNavigate={selectView}
            />
          )}
          {activeView === "health" && (
            <HealthView
              metrics={metrics}
              onSave={(key, amount) => {
                setMetrics({ ...metrics, [key]: amount });
                showToast("Health record saved.");
              }}
            />
          )}
          {activeView === "workouts" && (
            <WorkoutView
              onSave={() => {
                setMetrics({ ...metrics, workouts: metrics.workouts + 1 });
                showToast("Workout logged successfully.");
              }}
            />
          )}
          {activeView === "goals" && (
            <GoalsView onSave={() => showToast("Goal updated successfully.")} />
          )}
          {activeView === "history" && <HistoryView />}
        </div>
      </main>
      {toast && (
        <div className="toast">
          <span className="toast-check">
            <Check size={15} />
          </span>
          {toast}
          <button onClick={() => setToast("")}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

function PageHeading({ eyebrow, title, copy, action }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {copy && <p className="heading-copy">{copy}</p>}
      </div>
      {action}
    </div>
  );
}

function Overview({ metrics, onAdd, onNavigate }) {
  return (
    <>
      <PageHeading
        eyebrow="Wednesday, August 20, 2026"
        title="Good morning, Alex"
        copy="A quick look at how your day is moving."
        action={
          <button
            className="button button-dark"
            onClick={() => onNavigate("health")}>
            <Plus size={17} /> Add entry
          </button>
        }
      />
      <section className="streak-banner">
        <div className="streak-icon">
          <TrendingUp size={21} />
        </div>
        <div>
          <strong>You're on a 6 day streak</strong>
          <span>Consistency beats intensity. Keep your rhythm going.</span>
        </div>
        <div className="streak-days">
          <b>F</b>
          <b>S</b>
          <b>S</b>
          <b>M</b>
          <b>T</b>
          <b className="today">W</b>
          <b>Ｔ</b>
        </div>
      </section>
      <section className="metric-grid">
        <MetricCard
          label="Steps"
          value={metrics.steps.toLocaleString()}
          unit="steps"
          target="10,000"
          icon={Footprints}
          color="mint"
          percent={Math.round(metrics.steps / 100)}
          onClick={() => onAdd("steps", 500)}
        />
        <MetricCard
          label="Water"
          value={metrics.water}
          unit="glasses"
          target="8"
          icon={Droplets}
          color="sky"
          percent={Math.round((metrics.water / 8) * 100)}
          onClick={() => onAdd("water", 1)}
        />
        <MetricCard
          label="Sleep"
          value={metrics.sleep}
          unit="hours"
          target="8"
          icon={Moon}
          color="lilac"
          percent={Math.round((metrics.sleep / 8) * 100)}
          onClick={() => onAdd("sleep", 0.5)}
        />
        <MetricCard
          label="Workouts"
          value={metrics.workouts}
          unit="this week"
          target="5"
          icon={Dumbbell}
          color="peach"
          percent={Math.round((metrics.workouts / 5) * 100)}
          onClick={() => onNavigate("workouts")}
        />
      </section>
      <section className="dashboard-grid">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Your week</p>
              <h2>Activity overview</h2>
            </div>
            <button className="select-button">
              This week <ChevronRight size={15} />
            </button>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-steps" /> Steps
            </span>
            <span>
              <i className="legend-workout" /> Workout minutes
            </span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyActivity}
                margin={{ top: 16, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="stepsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#76c5a2" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#76c5a2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e7ebe6" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#89928c", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#89928c", fontSize: 11 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                  domain={[0, 10000]}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e4e9e3",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="steps"
                  stroke="#3f9f78"
                  strokeWidth={2.5}
                  fill="url(#stepsFill)"
                />
                <Area
                  type="monotone"
                  dataKey="workout"
                  stroke="#e4a56b"
                  strokeWidth={2}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <GoalPanel onNavigate={onNavigate} />
      </section>
      <section className="panel quick-log">
        <div>
          <p className="eyebrow">Log it now</p>
          <h2>Make today count</h2>
          <p>Keep your health record current in a few taps.</p>
        </div>
        <div className="quick-actions">
          <button onClick={() => onAdd("water", 1)}>
            <Droplets size={18} />
            <span>Water</span>
            <small>+ 1 glass</small>
          </button>
          <button onClick={() => onNavigate("workouts")}>
            <Dumbbell size={18} />
            <span>Workout</span>
            <small>Log session</small>
          </button>
          <button onClick={() => onNavigate("health")}>
            <Weight size={18} />
            <span>Weight</span>
            <small>Add reading</small>
          </button>
        </div>
      </section>
    </>
  );
}

function MetricCard({
  label,
  value,
  unit,
  target,
  icon: Icon,
  color,
  percent,
  onClick,
}) {
  return (
    <button className="metric-card" onClick={onClick}>
      <div className={`metric-icon ${color}`}>
        <Icon size={19} />
      </div>
      <div className="metric-info">
        <span>{label}</span>
        <strong>
          {value}
          <small> {unit}</small>
        </strong>
        <div className="metric-progress">
          <i style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
        <em>
          {percent}% of {target}
        </em>
      </div>
      <ChevronRight className="card-arrow" size={17} />
    </button>
  );
}
function GoalPanel({ onNavigate }) {
  return (
    <div className="panel goal-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">One focus</p>
          <h2>Goal progress</h2>
        </div>
        <button className="more-button" onClick={() => onNavigate("goals")}>
          View all <ChevronRight size={15} />
        </button>
      </div>
      <div className="goal-ring">
        <div>
          <strong>75%</strong>
          <span>complete</span>
        </div>
      </div>
      <h3>Daily steps</h3>
      <p className="goal-detail">
        7,500 <span>/ 10,000 steps</span>
      </p>
      <div className="goal-progress">
        <i />
      </div>
      <div className="goal-footer">
        <span>
          <Target size={14} /> Due today
        </span>
        <strong>2,500 to go</strong>
      </div>
    </div>
  );
}

function HealthView({ metrics, onSave }) {
  return (
    <>
      <PageHeading
        eyebrow="Health tracking"
        title="Tune into your body"
        copy="Small daily records make your bigger picture clearer."
      />
      <div className="form-layout">
        <div className="panel form-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Today · Aug 20</p>
              <h2>Daily check-in</h2>
            </div>
            <span className="saved-label">
              <Check size={14} /> Auto-saved
            </span>
          </div>
          <div className="input-grid">
            <Field label="Steps" suffix="steps" defaultValue={metrics.steps} />
            <Field
              label="Water"
              suffix="glasses"
              defaultValue={metrics.water}
            />
            <Field label="Sleep" suffix="hours" defaultValue={metrics.sleep} />
            <Field label="Weight" suffix="kg" defaultValue="68.5" />
          </div>
          <button
            className="button button-dark"
            onClick={() => onSave("steps", metrics.steps)}>
            <Check size={17} /> Save check-in
          </button>
        </div>
        <div className="panel insight-panel">
          <div className="insight-icon">
            <HeartPulse size={21} />
          </div>
          <p className="eyebrow">A little insight</p>
          <h2>Your sleep is trending up</h2>
          <p>
            You've averaged 7.4 hours this week, 18 minutes more than last week.
            Nice work protecting your recovery.
          </p>
          <div className="insight-stat">
            <strong>+18m</strong>
            <span>versus last week</span>
          </div>
        </div>
      </div>
      <section className="panel history-strip">
        <div>
          <p className="eyebrow">Recent health history</p>
          <h2>Last seven days</h2>
        </div>
        <div className="mini-history">
          {["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"].map(
            (day, index) => (
              <div key={day}>
                <span>{day}</span>
                <b style={{ height: `${38 + ((index * 7) % 42)}px` }} />
                <small>
                  {index === 6 ? "Today" : `${7 + index},${index}k`}
                </small>
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
}
function Field({ label, suffix, defaultValue }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div>
        <input type="number" defaultValue={defaultValue} />
        <em>{suffix}</em>
      </div>
    </label>
  );
}
function WorkoutView({ onSave }) {
  return (
    <>
      <PageHeading
        eyebrow="Fitness tracking"
        title="Move with intention"
        copy="Log the work that makes you feel stronger."
        action={
          <button className="button button-dark" onClick={onSave}>
            <Plus size={17} /> Log workout
          </button>
        }
      />
      <div className="workout-layout">
        <div className="panel workout-form">
          <p className="eyebrow">New session</p>
          <h2>What did you do?</h2>
          <div className="workout-types">
            <button className="selected">
              <Dumbbell size={18} /> Strength
            </button>
            <button>
              <Activity size={18} /> Cardio
            </button>
            <button>
              <Moon size={18} /> Mobility
            </button>
          </div>
          <div className="input-grid">
            <Field label="Exercise" suffix="" defaultValue="Full body" />
            <Field label="Duration" suffix="minutes" defaultValue="45" />
            <Field label="Calories" suffix="kcal" defaultValue="320" />
          </div>
          <button className="button button-dark" onClick={onSave}>
            <Check size={17} /> Save workout
          </button>
        </div>
        <div className="panel burn-panel">
          <div className="burn-top">
            <span className="metric-icon peach">
              <FlameIcon />
            </span>
            <span>This week</span>
          </div>
          <strong>
            1,280 <small>kcal burned</small>
          </strong>
          <div className="burn-bars">
            <BarChart width={250} height={110} data={weeklyActivity}>
              <Bar dataKey="workout" fill="#e4a56b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </div>
        </div>
      </div>
      <section className="panel recent-workouts">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Your movement</p>
            <h2>Recent workouts</h2>
          </div>
          <span className="muted-label">4 sessions this week</span>
        </div>
        {["Full body strength", "Morning walk", "Mobility flow"].map(
          (item, index) => (
            <div className="workout-row" key={item}>
              <span className={`workout-dot dot-${index}`}>
                <Dumbbell size={16} />
              </span>
              <div>
                <strong>{item}</strong>
                <small>
                  {index === 0
                    ? "Today · 45 min"
                    : index === 1
                      ? "Yesterday · 32 min"
                      : "Mon · 20 min"}
                </small>
              </div>
              <b>{index === 0 ? "320" : index === 1 ? "180" : "90"} kcal</b>
              <ChevronRight size={16} />
            </div>
          ),
        )}
      </section>
    </>
  );
}
function FlameIcon() {
  return <Zap size={19} />;
}
function GoalsView({ onSave }) {
  return (
    <>
      <PageHeading
        eyebrow="Goals"
        title="Give your effort a direction"
        copy="Clear targets turn good intentions into a routine."
        action={
          <button className="button button-dark" onClick={onSave}>
            <Plus size={17} /> New goal
          </button>
        }
      />
      <div className="goals-grid">
        {[
          ["Daily steps", "7,500", "10,000", "75%", "mint", Footprints],
          ["Weekly workouts", "4", "5", "80%", "peach", Dumbbell],
          ["Hydration", "6", "8", "75%", "sky", Droplets],
        ].map(([name, current, target, percent, color, Icon]) => (
          <div className="panel goal-card" key={name}>
            <div className={`metric-icon ${color}`}>
              <Icon size={19} />
            </div>
            <div className="goal-card-head">
              <h2>{name}</h2>
              <button className="more-button" onClick={onSave}>
                Edit
              </button>
            </div>
            <strong className="goal-number">
              {current}
              <small> / {target}</small>
            </strong>
            <div className="goal-progress">
              <i style={{ width: percent }} />
            </div>
            <div className="goal-footer">
              <span>{percent} complete</span>
              <strong>Keep going</strong>
            </div>
          </div>
        ))}
      </div>
      <div className="panel goals-callout">
        <Target size={24} />
        <div>
          <h2>Goals work better when they feel like yours.</h2>
          <p>
            Start with what is achievable, then let consistency expand the goal.
          </p>
        </div>
      </div>
    </>
  );
}
function HistoryView() {
  return (
    <>
      <PageHeading
        eyebrow="History"
        title="See your progress over time"
        copy="A record of the small choices behind your best days."
        action={
          <button className="select-button">
            Last 30 days <ChevronRight size={15} />
          </button>
        }
      />
      <div className="history-summary">
        <div className="panel">
          <span>Average steps</span>
          <strong>7,840</strong>
          <em>
            <TrendingUp size={14} /> 12% this month
          </em>
        </div>
        <div className="panel">
          <span>Average sleep</span>
          <strong>7.4h</strong>
          <em>
            <TrendingUp size={14} /> 18m this month
          </em>
        </div>
        <div className="panel">
          <span>Workouts</span>
          <strong>16</strong>
          <em>
            <TrendingUp size={14} /> 4 more than June
          </em>
        </div>
      </div>
      <div className="panel history-chart">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Daily activity</p>
            <h2>Your last 30 days</h2>
          </div>
        </div>
        <div className="chart-wrap tall">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyActivity.concat(weeklyActivity, weeklyActivity)}>
              <CartesianGrid vertical={false} stroke="#e7ebe6" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#89928c", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#89928c", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  border: "1px solid #e4e9e3",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="steps" fill="#76c5a2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default App;
