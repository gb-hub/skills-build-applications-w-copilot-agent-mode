import { useState, useEffect } from 'react'
import { fetchData, createData } from '../utils/api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchData('workouts')
        setWorkouts(data)
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
      const newWorkout = await createData('workouts', {
        name: 'New Workout',
        description: 'A new workout routine',
        difficulty: 'intermediate',
      })
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
