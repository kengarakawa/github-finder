import { createContext , useReducer } from 'react'
import githubReducer from './GithubReducer'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubContext = createContext()


export const GithubProvider = ({children}) => {
  
  const initialState = {
    users : [] , 
    user : {} , 
    repos : [] , 
    isLoading : false 
  }
  
  
  const [state, dispatch ] = useReducer(githubReducer, initialState)
  
  const setLoading = () => {
    dispatch({type: 'SET_LOADING'})
  }
  
  const fetchUsers = async () => {    
    setLoading()    
    const response = await fetch(`${GITHUB_URL}/users?`, {
      method: "GET",
      headers: {
        // 'Content-Type' : 'application/json' ,
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()    
    dispatch({
      type: 'GET_USERS' , 
      payload: data 
    })
    
  }
  
  // 
  const searchUsers = async (text) => {    
    setLoading()    
    const param = new URLSearchParams({      
      q: text 
    })
    
    const response = await fetch(`${GITHUB_URL}/search/users?${param}`, {
      method: "GET",
      headers: {
        // 'Content-Type' : 'application/json' ,
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
    })
    const { items } = await response.json()    
    dispatch({
      type: 'GET_USERS' , 
      payload: items 
    })    
  }
  
  // Get single user
  const getUser = async (login) => {    
    setLoading()    
    
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      method: "GET",
      headers: {
        // 'Content-Type' : 'application/json' ,
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
    })
    
    if(response.status === 404) {
      window.location = '/notfound'
    } else {
    const data = await response.json()    
      dispatch({
        type: 'GET_USER' , 
        payload: data  
      })      
      }      
  }
  
  const getUserRepos = async (login) => {    
    setLoading()    
    
    const param = new URLSearchParams({      
      sort: 'created', 
      per_page : 10 , 
      
    })
    
    
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${param}`, {
      method: "GET",
      headers: {
        // 'Content-Type' : 'application/json' ,
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()    
    dispatch({
      type: 'GET_REPOS' , 
      payload: data
    })    
  }  
  
  
  const clearUsers = () => {
     dispatch({
       type: 'CLEAR_USERS'
     })
  }
  
  
  return <GithubContext.Provider  value={{
      fetchUsers , 
      users : state.users , 
      isLoading : state.isLoading ,
      searchUsers ,  
      clearUsers , 
      user : state.user , 
      repos : state.repos , 
      getUser  , 
      getUserRepos , 
  }}>
  {children}
  </GithubContext.Provider>
  
  
  
  
  

}

export default GithubContext