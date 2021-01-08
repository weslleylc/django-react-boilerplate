import { push } from 'connected-react-router';
import { takeEvery, put } from 'redux-saga/effects';
import api from "../../services/api";

const DELETE_POST = 'DELETE_POST';

export const deletePost = (id) => ({
    type: DELETE_POST,
    id
});

function* deletePostSaga(action) {
    try {
        yield api.posts.detail.del({ pk: action.id });

        yield put(push('/posts/'));
    } catch (e) {
        console.log('Something went wrong!');
    }
}

export default function* deletePostWatcher() {
    yield takeEvery(DELETE_POST, deletePostSaga);
}
