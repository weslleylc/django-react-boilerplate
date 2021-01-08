import { push } from 'connected-react-router';
import { takeEvery, put } from 'redux-saga/effects';

import api from "../../services/api";

const UPDATE_POST = 'UPDATE_POST';

export const updatePost = (id) => ({
    type: UPDATE_POST,
    id
});

function* updatePostSaga(action) {
    try {
        yield api.posts.detail.put({ pk: action.id });

        yield put(push('/posts/'));
    } catch (e) {
        console.log('Something went wrong!');
    }
}

export default function* updatePostWatcher() {
    yield takeEvery(UPDATE_POST, updatePostSaga);
}
