const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 기본주소 요청 
router.get('/', ctx => {
    ctx.body = '홈';
});

// about 주소 요청 
router.get('/about', ctx => {
    ctx.body = '소개';
});

// /about/aaa 요청 
router.get('/about/:name?', ctx => {
    const { name } = ctx.params;
    ctx.body = name ? '${name} 소개' : '소개';
});

// /posts?id=10 요청 
router.get('/posts', ctx => {
    const { id } = ctx.query;
    ctx.body = id ? '포스트 #${id}' : '포스트 아이디가 없습니다';
});

// app 인스턴스에 라우터 적용 
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('4000 포트 시작');
})