import { useState, useEffect } from 'react'
import { fetchData, createData } from '../utils/api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchData('teams')
        setTeams(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  const handleAddTeam = async () => {
    try {
      const newTeam = await createData('teams', {
        name: 'New Team',
        description: 'A new fitness team',
      })
      setTeams([...teams, newTeam])
    } catch (err) {
      setError('Failed to create team: ' + err.message)
    }
  }

  return (
    <div className="container py-4">
      <h1>Teams</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddTeam}>
        Create Team
      </button>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading teams...</div>}

      {!loading && teams.length === 0 && (
        <div className="alert alert-info">No teams yet. Create one to get started!</div>
      )}

      {!loading && teams.length > 0 && (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id || team._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <div className="small text-muted">
                    <p>Members: {team.members?.length || 0}</p>
                    <p>Points: {team.points || 0}</p>
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
