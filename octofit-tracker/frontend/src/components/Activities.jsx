import { useState, useEffect } from 'react'
import { fetchData, createData } from '../utils/api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchData('activities')
        setActivities(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  const handleAddActivity = async () => {
    try {
      const newActivity = await createData('activities', {
        name: 'New Activity',
        date: new Date().toISOString().split('T')[0],
        duration: 0,
      })
      setActivities([...activities, newActivity])
    } catch (err) {
      setError('Failed to create activity: ' + err.message)
    }
  }

  return (
    <div className="container py-4">
      <h1>Activities</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddActivity}>
        Add Activity
      </button>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading activities...</div>}

      {!loading && activities.length === 0 && (
        <div className="alert alert-info">No activities logged yet.</div>
      )}

      {!loading && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>Duration</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id || activity._id}>
                  <td>{activity.date}</td>
                  <td>{activity.name}</td>
                  <td>{activity.duration} minutes</td>
                  <td>{activity.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
