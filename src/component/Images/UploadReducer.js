export const uploadReducer = (uploadState, action) => {
    switch(action.type) {
        case 'SET_UPLOAD_STATE': {
            const newState = action.payload;
            return newState;
        }
        case 'UPDATED_LIKE': {
            const newState = {...uploadState, 
                    likes: uploadState.status !== 'like' ?  uploadState.likes + 1 : uploadState.likes,
                    dislikes: uploadState.status === 'dislike' ? uploadState.dislikes -1 : uploadState.dislikes,            
                    status: uploadState.status === null ? 'dislike' : 'like',
                }
            console.log(newState);
            return newState;
        }
        case 'UPDATED_DISLIKE': {
            const newState = {...uploadState, 
                    dislikes: uploadState.status !== 'dislike' ?  uploadState.dislikes + 1 : uploadState.dislikes,
                    likes: uploadState.status === 'like' ? uploadState.likes -1 : uploadState.likes,
                    status: uploadState.status === null ? 'like' : 'dislike',
                } 
                console.log(newState);
            return newState;
        }
        default:
            return uploadState
    }
}