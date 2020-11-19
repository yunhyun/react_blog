const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// api 폴더에 생성한 index.js 사용 
const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우트 설정 
router.use('/api', api.routes());

// app에 라우터 적용전에 bodyParser 적용 
app.use(bodyParser());

// app 인스턴스에 라우터 적용 
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('4000 포트 시작');
})