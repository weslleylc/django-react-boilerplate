import { takeEvery, put } from 'redux-saga/effects';
import { receiveDetailPost } from 'ducks/posts';
import api from "../../services/api";

const DETAIL_POST = 'DETAIL_POST';

export const detailPost = (id) => ({
    type: DETAIL_POST,
    id
});

function* detailPostSaga(action) {
    try {
        const post = yield api.comments.detail.fetch({ pk: action.id });
        console.log(post)

        yield put(receiveDetailPost(post));
    } catch (e) {
        console.log('Something went wrong!');
    }
}

export default function* detailPostWatcher() {
    yield takeEvery(DETAIL_POST, detailPostSaga);
}
