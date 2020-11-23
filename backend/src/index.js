// 실행 yarn start:dev (수정하면 자동 리로드)
// dotenv는 환경변수를 파일에 넣고 사용할 수 있게 하는 개발도구 
// 서버 계정, 비번 등을 소스에 직접 쓰지 않고 환경변수 파일을 가지고 관리
// (환경변수 파일은 gitignore 파일로 깃에 안올리도록)
// require = require('esm')(module /*, options*/);
require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

// mongoose 가져오기 
import mongoose from 'mongoose';

// api 폴더에 생성한 index.js 사용 
import api from './api';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기 
// .env에 지정한 PORT 값을 가져옴(PORT = 4000)
// MONGO_URI=mongodb://localhost:27017/blog 에서 /blog가 DB 이름이 됨 
// 따로 만들지 않아도 자동으로 생성됨. 이름을 test로 바꾸면 test가 생성됨 
// 생성된 것은 Compass에서 확인 ㄴ
const { PORT, MONGO_URI } = process.env;

// mongoDB 접속 
// 아래 코드 작성 후 yarn start:dev 실행하면 MongoDB 연결 성공 콘솔 메시지 출력됨 
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
        .then(() => {
            console.log('MongoDB 연결 성공');
        })
        .catch(e => {
            console.error(e);
        });


const app = new Koa();
const router = new Router();

// 라우트 설정(api 폴더에 있는 index.js를 사용하기 위함, 
// node는 파일명을 지정하지 않고 폴더만 지정해도 해당 폴더의 index.js를 자동으로 실행함)
router.use('/api', api.routes());

// app에 라우터 적용전에 bodyParser 적용 
app.use(bodyParser());

// app 인스턴스에 라우터 적용 
app.use(router.routes()).use(router.allowedMethods());

// .env에 PORT 지정 안되어있으면 4000을 사용하도록 
const port = PORT || 4000;
app.listen(port, () => {
    console.log('%d 포트 시작', port);
});