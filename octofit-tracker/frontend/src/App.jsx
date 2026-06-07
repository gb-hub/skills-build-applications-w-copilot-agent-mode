import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import heroImg from './assets/hero.png'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBaseUrl } from './utils/api'
import './App.css'

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
          <img src={heroImg} className="img-fluid" width="170" height="179" alt="OctoFit" />
        </div>
        <div className="col-md-8">
          <h1>OctoFit Tracker</h1>
          <p className="lead">Track your fitness activities and compete with friends!</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCount((c) => c + 1)}
          >
            Count is {count}
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <h2>Features</h2>
          <ul>
            <li>Log your activities</li>
            <li>View the leaderboard</li>
            <li>Create and join teams</li>
            <li>Get personalized workout suggestions</li>
            <li>Compete with other users</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h2>API Configuration</h2>
          <p>
            <strong>Base URL:</strong> <code>{getApiBaseUrl()}</code>
          </p>
          <p className="small text-muted">
            Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use production API.
          </p>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="container py-4">
      <h1>About OctoFit</h1>
      <p>
        OctoFit Tracker is a multi-tier fitness tracking application built with React, Node.js, and
        MongoDB.
      </p>
      <h3>Technology Stack</h3>
      <ul>
        <li>
          <strong>Frontend:</strong> React 19 with Vite, react-router-dom, Bootstrap
        </li>
        <li>
          <strong>Backend:</strong> Node.js with Express and TypeScript
        </li>
        <li>
          <strong>Database:</strong> MongoDB with Mongoose
        </li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🐙 OctoFit
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
