import { combineReducers } from 'redux';

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const RECEIVE_COMMENTS = 'posts/RECEIVE_COMMENTS';

const postsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts.data;
        default:
            return state;
    }
};

const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        default:
            return state;
    }
};

export default combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
});

// Action creators

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts,
});

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments,
});

export const receiveDetailPost = (posts) => ({
    type: RECEIVE_POSTS,
    posts,
});

