// backend의 메인 파일. nodemon을 추가하면 수정하고 저장만해도 알아서 서버 재시작 

const Koa = require('koa');
// app 은 미들웨어 
const app = new Koa();
// node src로 실행하면 서버가 가동되며, 브라우저로 localhost:4000 으로 접속하면 hello world 출력 
// ctx 는 요청과 응답에 관한 정보(Context 줄임)
// app.use(ctx => {
//     ctx.body = 'hello world';
// });

// app.use 는 ctx, next를 함께 받을 수 있음. next는 다음 app.use를 호출하라는 의미. Promise를 반환함 
// 요청 주소에 authorized=1 이 있으면 다음 요청(app.use)을 호출하고 아니면 호출하지 않음. 
// 호출이 제대로 되면 브라우저에 hello world 출력 
// async 사용을 위해 async 추가 
app.use(async (ctx, next) => {
    console.log(ctx.url);
    console.log(1);
    
    if(ctx.query.authorized !== '1') {
        ctx.status = 401;
        return;
    }
    // next().then(() => { //Promise 활용 1,2를 모두 출력하고 나서 END 가 출력됨 
    //     console.log('END');
    // });

    // Promise 대신 async await 사용 
    await next();
    console.log('await END!!');

});
app.use((ctx, next) => {
    console.log(2);
    next();
});

app.use(ctx => {
ctx.body = 'hello world';
});

// 터미널에 콘솔 내용 출력 
app.listen(4000, () => {
    console.log('4000 포트 연결');
});