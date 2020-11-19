// 라우트 모듈화 
const Router = require('koa-router');
const api = new Router();

const posts = require('./posts');

// /api/test 주소요청에 호출됨 
// api.get('/test', ctx => {
//     ctx.body = 'test 성공';
// });

// posts/index.js 만들고 나서 수정 
// /api/posts 주소로 요청 
api.use('/posts', posts.routes());

// 라우터 내보내기 
module.exports = api;