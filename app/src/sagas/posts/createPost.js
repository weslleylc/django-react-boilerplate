/* eslint-disable */

import { push } from 'connected-react-router';
import { takeEvery, put } from 'redux-saga/effects';
import api from "../../services/api";

const CREATE_POST = 'CREATE_POST';

export const createPost = (quantity, link) => ({
    type: CREATE_POST,
    quantity,
    link,
});

function* createPostSaga(createPostAction) {
    try {
        const { quantity, link } = createPostAction;
        yield api.posts.list.post(null, { "number_comments": quantity,
                                          "link": link });
        yield put(push('/posts/'));
    } catch (e) {
        console.log(e);
    }
}

export default function* createPostWatcher() {
    yield takeEvery(CREATE_POST, createPostSaga);
}
