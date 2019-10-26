import { SITE_URL, CMS_URL, QUEST_TOKEN } from '../../constants';

import { syncPreloader } from '../../plugins/imgsPreloader';
import { getCollection } from '../../plugins/cockpitRequests';


export const initApp = () => dispatch => {

    const start = async () => {

        const settings = await getCollection(CMS_URL, QUEST_TOKEN, 'settings');

        const posts = await getCollection(CMS_URL, QUEST_TOKEN, 'posts');

        const formatedPosts = posts.map( post => { return {...post, preview: { path: `${post.preview.path}`, fullPath: `${post.preview.path ? SITE_URL : ''}${post.preview.path}` }, backview: { path: `${post.backview.path}`, fullPath: `${post.backview.path ? SITE_URL : ''}${post.backview.path}` }, }});
        console.log(formatedPosts);
        let imgsList = [];

        posts.forEach(post => {
            if (post.preview.path && post.backview.path) {
                imgsList.push(SITE_URL + post.preview.path);
                imgsList.push(SITE_URL + post.backview.path);
            }
        });

        await syncPreloader(imgsList, console.log);

        dispatch({
            type: 'INIT',
            payload: {
                posts: formatedPosts,
                isReady: true,
                settings: settings[0]
            }
        });
    }

    start();
}

export const updatePosts = (callback) => dispatch => {

    const start = async () => {

        const posts = await getCollection(CMS_URL, QUEST_TOKEN, 'posts');

        const formatedPosts = posts.map( post => { return {...post, preview: { path: `${post.preview.path}`, fullPath: `${SITE_URL}${post.preview.path}` }, backview: { path: `${post.backview.path}`, fullPath: `${SITE_URL}${post.backview.path}` }, }});
        
        console.log(dispatch);

        dispatch({
            type: 'UPDATE_POSTS',
            payload: {
                posts: formatedPosts
            }
        });
    }

    start().then(callback);
}