// 라우트 모듈화 
import Router from 'koa-router';
import posts from './posts';
import auth from './auth'

const api = new Router();
// /api/test 주소요청에 호출됨 
// api.get('/test', ctx => {
//     ctx.body = 'test 성공';
// });

// posts/index.js 만들고 나서 수정 
// /api/posts 주소로 요청 
api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

// 라우터 내보내기 
export default api;