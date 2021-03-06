import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'; // 비번 암호화 
import jwt from 'jsonwebtoken'; // jwt 사용 

const UserSchema = new Schema({
    username: String, 
    hashedPassword: String,
});

// 모델에서 사용하는 모델메소드 
/* 인스턴스 메소드 : 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수 
   스태틱 메소드 : 모델에서 바로 사용할 수 있는 함수 
*/
// 암호화 함수 
UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

// 비교 함수(입력한 비번을 암호화하여 일치여부 판단) 
UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
}

// username으로 데이터 찾는 스태틱 메소드(아이디중복 검사)
UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
};

// 응답 데이터에서 비밀번호 안보이게 비밀번호 필드 제거 
UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}

/*
    토큰, 보안 관련(책 697페이지)
     - 로컬, 세션 : 사용, 구현 쉬움. 하지만 페이지에 악성 스크립트 있다면 토큰 쉽게 탈취(XSS(Cross Site Scripting))
     - 쿠키 : 탈취 가능성 있지만 httpOnly 속성 활성화하면 스크립트에서 조회는 방지 가능. 
              하지만 CSRF(Cross Site Request Forgery)에 취약(사용자가 원하지 않는 API 요청 가능하기 때문)
              CSRF는 토큰, Referer 검증 등으로 막을 수 있지만 XSS는 취약점이 많음. 
     - 책에서는 토큰을 쿠키에 담아서 사용 
*/
// jwt 토큰 발급 
UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        // 첫번째 파라미터는 토큰에 넣을 데이터 
        {
            _id: this.id,
            username: this.username,
        },
        // 두번째 파라미터는 jwt 암호(.env에 지정한 암호)
        process.env.JWT_SECRET,
        {
            // 유효기간 (7일동안 유효)
            expiresIn: '7d',
        },
    );
    return token;
};

// DB에 users라는 컬렉션이 생성됨. 무조건 복수로 붙음. 따로 이름을 지정하는 방법은 
// mongoose.model('User', UserSchema, '원하는이름') 형식으로 하면 됨. 
const User = mongoose.model('User', UserSchema);
export default User;