import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register', authCtrl.register); // 회원가입 
auth.post('/login', authCtrl.login); // 로그인
auth.get('/check', authCtrl.check); // 로그인여부 체크
auth.post('/logout', authCtrl.logout); // 로그아웃 

export default auth;

