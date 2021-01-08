import loadable from '@loadable/component';
import '@tg-resources/fetch-runtime';
import { buildUrlCache, resolvePath } from 'tg-named-routes';

import App from 'containers/AppShell';
import PageNotFound from 'views/PageNotFound';

import permissionCheck from 'sagas/auth/permissionCheckSaga';
import activateLanguage from 'sagas/user/activateLanguage';
import fetchUserDetails from 'sagas/user/fetchUserDetails';
import fetchUserPosts from 'sagas/posts/fetchUserPosts';


import { createAuthenticationRoutes } from './routes/authentication';
import createPostWatcher from "../sagas/posts/createPost";
import deletePostWatcher from "../sagas/posts/deletePost";
import commentsFromPostWatcher from "../sagas/posts/fetchPostComments";
import CommentsFromPost from "../views/instagramania/CommentsFromPost";

const Home = loadable(() => import('views/Home'));
const RestrictedView = loadable(() => import('views/RestrictedView'));
const PostsList = loadable(() => import('views/instagramania/PostsLists'));
const CreateInstagramPost = loadable(() => import('views/instagramania/CreateInstagramPost'));

const NotFoundRoute = {
    name: '404',
    path: '*',
    component: PageNotFound,
};

const routes = [
    {
        component: App,
        initial: [fetchUserDetails],
        watcher: [activateLanguage],
        routes: [
            {
                path: '/',
                exact: true,
                name: 'landing',
                component: Home,
            },
            {
                path: '/restricted',
                exact: true,
                name: 'restricted',
                component: RestrictedView,
                initial: permissionCheck,
            },
            createAuthenticationRoutes(NotFoundRoute),
            {
                path: '/posts',
                exact: true,
                name: 'posts-list',
                component: PostsList,
                initial: [fetchUserPosts],
                watcher: [
                    deletePostWatcher,
                    commentsFromPostWatcher,
                ],
            },
            {
                path: '/posts/create',
                exact: true,
                name: 'create-post',
                component: CreateInstagramPost,
                watcher: createPostWatcher,
            },
            {
                path: '/posts/comments/',
                exact: true,
                name: 'posts-detail',
                component: CommentsFromPost
            },
            NotFoundRoute,
        ],
    },
];

buildUrlCache(routes);

/**
 * Resolve url name to valid path.
 *   Also known as `resolveUrl` or `reverseUrl`.
 *
 * Providing query string can be done with object or string.
 * Caveat with string is that it should be formatted correctly e.g `foo=bar` or `foobar`
 *
 * @deprecated
 * @param name URL name
 * @param [kwargs=null] URL parameters
 * @param [query=null] URL query string
 * @param [state=null] URL state object to pass to next url
 * @returns URL matching name and kwargs
 */
export const urlResolve = resolvePath;

export default routes;
