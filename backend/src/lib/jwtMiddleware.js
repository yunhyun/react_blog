// 토큰 검증용 미들웨어
import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
    const token = ctx.cookies.get('access_token');
    if(!token) return next(); // 토큰 없음 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username,
        };
        // 토큰이 3.5일 미만으로 남았으면 재발급 
        const now = Math.floor(Date.now() / 1000);
        if(decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            ctx.cookies.set('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }
        console.log(decoded); // 로그인 하면 터미널에 id, username, iat(토큰생성시간), exp(토큰만료시간) 가 출력됨 
        return next();
    } catch (e) {
        // 토큰 검증 실패 
        return next();
    }
};

export default jwtMiddleware;