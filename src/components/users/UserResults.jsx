import { useEffect, useState } from "react"
import Spinner from '../../components/layout/Spinner.jsx'
import UserItem from './UserItem.jsx'

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users?`, {
      method: "GET",
      headers: {
        // 'Content-Type' : 'application/json' ,
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()

    setUsers(data)
    setIsLoading(false)
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2">
      {users.map((user,i ) => (
        <UserItem key={i} user={user} />
      ))}
    </div>
  )
}

export default UserResults
