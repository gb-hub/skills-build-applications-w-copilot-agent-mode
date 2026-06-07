import { useState, useEffect } from 'react'
import { fetchData } from '../utils/api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchData('leaderboard')
        setLeaderboard(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <div className="container py-4">
      <h1>Leaderboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading leaderboard...</div>}

      {!loading && leaderboard.length === 0 && (
        <div className="alert alert-info">No leaderboard data available yet.</div>
      )}

      {!loading && leaderboard.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Total Duration</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || entry._id}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.username || entry.name || 'Unknown'}</td>
                  <td>{entry.points || 0}</td>
                  <td>{entry.activityCount || 0}</td>
                  <td>{entry.totalDuration || 0} minutes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
