export const likesReducer = (state, action) => {
  switch(action.type) {
    case 'SET_STATE': {
      const newState = action.payload;
      return newState;
    }
    case 'HANDLE_LIKE': {
      const newState = state.map((imgState) => (
        imgState._id === action.payload.id
        ? {
          ...imgState, 
          likes: imgState.status !== 'like' ?  imgState.likes + 1 : imgState.likes,
          dislikes: imgState.status === 'dislike' ? imgState.dislikes -1 : imgState.dislikes,            
          status: imgState.status === null ? 'dislike' : 'like',
        }
        : imgState
        ))
      return newState;
    }
    case 'HANDLE_DISLIKE': {
      const newState = state.map((imgState) => (
        imgState._id === action.payload.id
          ? {...imgState, 
            dislikes: imgState.status !== 'dislike' ?  imgState.dislikes + 1 : imgState.dislikes,
            likes: imgState.status === 'like' ? imgState.likes -1 : imgState.likes,
            status: imgState.status === null ? 'like' : 'dislike',
          }  
          : imgState
      ))
      return newState;
    }
    default:
      return state
  }
}