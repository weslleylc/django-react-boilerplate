import { put } from 'redux-saga/effects';

import { receivePosts} from 'ducks/posts';
import api from "../../services/api";

export default function* fetchUserPosts() {
    try {
        const posts = yield api.posts.list.fetch();
        yield put(receivePosts(posts));
    } catch (err) {
        console.error('Something went wrong!');
    };
}
