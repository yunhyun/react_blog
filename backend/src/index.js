const Koa = require('koa');
const app = new Koa();
// node src로 실행하면 서버가 가동되며, 브라우저로 localhost:4000 으로 접속하면 hello world 출력 
app.use(ctx => {
    ctx.body = 'hello world';
});

// 터미널에 콘솔 내용 출력 
app.listen(4000, () => {
    console.log('4000 포트 연결');
});