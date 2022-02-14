import { createContext , useState } from 'react'


const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubContext = createContext()


export const GithubProvider = ({children}) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users?`, {
      method: "GET",
      headers: {
        // 'Content-Type' : 'application/json' ,
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()

    setUsers(data)
    setIsLoading(false)
  }
  
  
  return <GithubContext.Provider  value={{
      fetchUsers , 
      users , 
      isLoading , 
  }}>
  {children}
  </GithubContext.Provider>

}

export default GithubContext