import { useState, useEffect } from 'react'
import { fetchData, createData } from '../utils/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchData('users')
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const handleAddUser = async () => {
    try {
      const newUser = await createData('users', {
        username: `user${Date.now()}`,
        email: `user${Date.now()}@example.com`,
      })
      setUsers([...users, newUser])
    } catch (err) {
      setError('Failed to create user: ' + err.message)
    }
  }

  return (
    <div className="container py-4">
      <h1>Users</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddUser}>
        Add User
      </button>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading users...</div>}

      {!loading && users.length === 0 && (
        <div className="alert alert-info">No users yet.</div>
      )}

      {!loading && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{user.username || user.name || 'Unknown'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.points || 0}</td>
                  <td>{user.activityCount || 0}</td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
