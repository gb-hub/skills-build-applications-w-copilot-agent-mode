import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
          <img src={heroImg} className="img-fluid" width="170" height="179" alt="" />
        </div>
        <div className="col-md-8">
          <h1>OctoFit Tracker</h1>
          <p className="lead">Get started — edit <code>src/App.jsx</code> and save to test HMR</p>
          <button type="button" className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
            Count is {count}
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h2>Docs</h2>
          <ul>
            <li><a href="https://vite.dev/" target="_blank">Explore Vite</a></li>
            <li><a href="https://react.dev/" target="_blank">Learn React</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="container py-4">
      <h1>About OctoFit</h1>
      <p>Lightweight starter for the OctoFit Tracker front-end.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div>
            <Link className="nav-link d-inline-block me-2" to="/">Home</Link>
            <Link className="nav-link d-inline-block" to="/about">About</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
