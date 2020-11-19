const Router = require('koa-router');
const posts = new Router();

// JSON 객체를 화면에 반환 
const printInfo = ctx => {
    ctx.body = {
        method : ctx.method, // 현재 요청 메소드 
        path : ctx.path, // 현재 요청 경로 
        params : ctx.params, // 현재 요청 파라미터 
    };
};

// 각 주소가 호출되면 printInfo 함수 호출 
posts.get('/', printInfo);
posts.post('/', printInfo);
posts.get('/:id', printInfo);
posts.delete('/:id', printInfo);
posts.put('/:id', printInfo);
posts.patch('/:id', printInfo);

module.exports = posts;