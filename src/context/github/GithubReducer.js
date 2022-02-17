const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload , isLoading : false  }
      
    case "GET_USER":
      return { ...state, user: action.payload , isLoading : false  }
    
    case "GET_USER_AND_REPOS":
      return { ...state, user: action.payload.user , repos : action.payload.repos , isLoading : false  }
    
          
    case "SEARCH_USERS":
      return { ...state, users: action.payload , isLoading : false  }
      
    case 'SET_LOADING' : 
        return { ...state , isLoading : true }
    
    case 'CLEAR_USERS' : 
    console.log('being called?')
      return { ...state , users: [] }
      
    case 'GET_REPOS' : 
    return { ...state , repos: action.payload , isLoading : false }

    default:
      return state
  }
}
export default githubReducer
