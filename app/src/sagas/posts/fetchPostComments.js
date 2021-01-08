import { takeEvery, put } from 'redux-saga/effects';
import { receiveComments } from 'ducks/posts';
import api from "../../services/api";

const COMMENTS_POST = 'COMMENTS_POST';

export const commentsFromPost = (id) => ({
    type: COMMENTS_POST,
    id
});

function* commentsFromPostSaga(action) {
    try {
        const comments = yield api.comments.from_post.fetch({ pk: action.id });
        console.log(comments)
        yield put(receiveComments(comments));
    } catch (e) {
        console.log('Something went wrong!');
    }
}

export default function* commentsFromPostWatcher() {
    yield takeEvery(COMMENTS_POST, commentsFromPostSaga);
}
