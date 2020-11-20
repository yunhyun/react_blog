const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();


// 각 주소가 호출되면 printInfo 함수 호출 
posts.get('/', postsCtrl.write);
// posts.post('/', printInfo);
// posts.get('/:id', printInfo);
// posts.delete('/:id', printInfo);
// posts.put('/:id', printInfo);
// posts.patch('/:id', printInfo);

module.exports = posts;