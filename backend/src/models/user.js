import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'; // 비번 암호화 

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

// 비교 함수 
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

const User = mongoose.model('User', UserSchema);
export default User;