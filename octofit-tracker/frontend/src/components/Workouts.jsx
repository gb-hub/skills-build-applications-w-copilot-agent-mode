import { useState, useEffect } from 'react'
import { getApiBaseUrl } from '../utils/api'

/**
 * API endpoint: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
 * Falls back to http://localhost:8000/api/workouts/ for local development
 */
const API_ENDPOINT = '/api/workouts/'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        setError(null)
        const baseUrl = getApiBaseUrl()
        const response = await fetch(`${baseUrl}${API_ENDPOINT}`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        // Handle paginated responses or direct arrays
        const result = data.results || (Array.isArray(data) ? data : [data])
        setWorkouts(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  const handleAddWorkout = async () => {
    try {
      const baseUrl = getApiBaseUrl()
      const response = await fetch(`${baseUrl}${API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Workout',
          description: 'A new workout routine',
          difficulty: 'intermediate',
        }),
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const newWorkout = await response.json()
      setWorkouts([...workouts, newWorkout])
    } catch (err) {
      setError('Failed to create workout: ' + err.message)
    }
  }

  return (
    <div className="container py-4">
      <h1>Workouts</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddWorkout}>
        Add Workout
      </button>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading workouts...</div>}

      {!loading && workouts.length === 0 && (
        <div className="alert alert-info">No workouts available yet.</div>
      )}

      {!loading && workouts.length > 0 && (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout.id || workout._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description || 'No description'}</p>
                  <div className="small text-muted">
                    <p>
                      Difficulty:{' '}
                      <span className="badge bg-secondary">
                        {workout.difficulty || 'unknown'}
                      </span>
                    </p>
                    <p>Duration: {workout.estimatedDuration || '-'} minutes</p>
                    <p>Exercises: {workout.exercises?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
