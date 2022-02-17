import { useContext } from "react"
import Spinner from '../../components/layout/Spinner.jsx'
import UserItem from './UserItem.jsx'

import GithubContext from '../../context/github/GithubContext'

const UserResults = () => {
  
  const { isLoading , users } = useContext(GithubContext)
  


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
