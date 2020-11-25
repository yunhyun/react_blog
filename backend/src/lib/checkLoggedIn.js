// 로그인 체크를 위한 미들웨어 

const checkLoggedIn = (ctx, next) => {
    if(!ctx.state.user) {
        ctx.status = 401;
        return;
    } 
    return next();
}

export default checkLoggedIn;