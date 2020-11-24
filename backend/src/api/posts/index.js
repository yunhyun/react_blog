import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();


// 각 주소가 호출되면 해당 함수 호출 
posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
// id 검증 함수 추가 
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);
// posts.put('/:id', postsCtrl.replace);

// /api/posts/:id 용 라우터를 따로 만들어서 사용하는 방식 
// const post = new Router();
// post.get('/:id', postsCtrl.read);
// post.delete('/:id', postsCtrl.remove);
// post.patch('/:id', postsCtrl.update);

// posts.use('/:id', postsCtrl.checkObjectId, post.routes());

export default posts;