# FitTrack

Personal health and fitness tracking system for the CAL project. This repository currently contains a polished React/Vite demo of the MVP experience described in the project presentation.

## Run the demo

```bash
npm install
npm run dev
```

The demo uses local mock data. It is intentionally ready for the planned REST API, but it does not require MongoDB or authentication to explore the UI.

## Technical Architecture

```text
React + Vite frontend
	Pages, reusable components, forms, responsive dashboard, Recharts
				|
				| Axios + JWT bearer token
				v
Node.js + Express API
	Routes -> JWT middleware -> validation -> controllers -> responses
				|
				v
MongoDB + Mongoose
	users, health, workouts, goals
```

### Planned modules

- Authentication: register, login, logout, protected routes, bcrypt password hashing, JWT sessions.
- Profile: basic personal information and preferences.
- Health: steps, water, sleep, weight/BMI, and health history.
- Workouts: exercise type, duration, calories, and workout history.
- Goals: target, current value, deadline, completion progress.
- Dashboard: today's summary cards, weekly activity chart, streak, and goal progress.

### Data model

| Collection | Core fields                                           |
| ---------- | ----------------------------------------------------- |
| `users`    | `name`, `email`, `passwordHash`, `profile`            |
| `health`   | `userId`, `date`, `steps`, `water`, `sleep`, `weight` |
| `workouts` | `userId`, `date`, `exercise`, `duration`, `calories`  |
| `goals`    | `userId`, `type`, `target`, `current`, `deadline`     |

Every record is scoped by the verified `userId`. The frontend never connects directly to MongoDB.

### API blueprint

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/profile
PUT    /api/profile
GET    /api/health?from=&to=
POST   /api/health
GET    /api/workouts?from=&to=
POST   /api/workouts
GET    /api/goals
POST   /api/goals
PATCH  /api/goals/:id
GET    /api/dashboard/summary
```

Example workout flow: the React form sends `POST /api/workouts` with the JWT; Express verifies the token, validates exercise/duration/calories, stores the document with the authenticated user's ID, and returns the updated record for the dashboard.

## UI Blueprint

The demo follows a calm, professional wellness workspace with a dark green navigation rail, warm off-white canvas, and mint/sky/peach metric accents.

- Overview: greeting, streak banner, four summary cards, weekly activity chart, goal ring, and quick-log actions.
- Health tracking: daily check-in form for steps, water, sleep, and weight, plus a trend insight and seven-day history.
- Workouts: workout type selector, session form, weekly calorie chart, and recent sessions.
- Goals: editable goal cards for steps, workouts, and hydration, with completion bars.
- History: average metrics, month selector, and longer-term activity chart.
- Shared shell: responsive sidebar, breadcrumb, notifications, profile affordance, toast feedback, and mobile navigation drawer.

## Next implementation slice

1. Add the Express server and Mongoose schemas.
2. Replace mock state with Axios service modules.
3. Add register/login screens and JWT-protected routing.
4. Add API validation, test coverage, and MongoDB environment configuration.

FitTrack is a wellness tracker and does not claim to diagnose medical conditions.
