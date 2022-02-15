import React from "react"
import UserSearch from '../components/users/UserSearch'
import UserResults from '../components/users/UserResults'

const Home = () => {
  return (
    <div>
      <UserSearch />      
      <UserResults />
    </div>
  )
}

export default Home
