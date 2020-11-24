import Joi from 'joi';
import User from '../../models/user';

// 회원가입 
export const register = async ctx => {
    // request body 검증 
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { username, password } = ctx.request.body;
    try {
        // 아이디 중복 확인 
        const exist = await User.findByUsername(username);
        if(exist) {
            ctx.status = 409;
            return;
        }
        const user = new User({
            username,
        });
        await user.setPassword(password);
        await user.save(); // db 저장 

        // 응답 데이터에서 hashedPassword 필드 제거 함수 호출 후 출력 
        ctx.body = user.serialize();
    } catch (e) {
        ctx.throw(500, e);
    }

};

// 로그인
export const login = async ctx => {
    const { username, password } = ctx.request.body;
    // 둘 중에 하나라도 입력 안됐으면 에러 처리 
    if(!username || !password) {
        ctx.status = 401;
        return;
    }
    try {
        // 해당 계정이 있는지 없으면 에러 처리 
        const user = await User.findByUsername(username);
        if(!user) {
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password);
        // 잘못된 비밀번호 
        if(!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();
        
    } catch (e) {
        ctx.throw(500, e);
    }
};


// 로그인 상태 확인 
export const check = async ctx => {

};
// 로그아웃 
export const logout = async ctx => {

};