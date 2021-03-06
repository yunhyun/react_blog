import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
// 로그인 체크 미들웨어 사용(글작성, 글수정, 글삭제시 체크)
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();


// 각 주소가 호출되면 해당 함수 호출 
posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);
// id 검증 함수 추가
// 사용자 추가 후 checkObjectId 함수 대신 getPostById 함수 사용 
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
posts.delete('/:id', postsCtrl.getPostById, checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
posts.patch('/:id', postsCtrl.getPostById, checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);
// posts.put('/:id', postsCtrl.replace);

// /api/posts/:id 용 라우터를 따로 만들어서 사용하는 방식 
// const post = new Router();
// post.get('/:id', postsCtrl.read);
// post.delete('/:id', postsCtrl.remove);
// post.patch('/:id', postsCtrl.update);

// posts.use('/:id', postsCtrl.checkObjectId, post.routes());

export default posts;