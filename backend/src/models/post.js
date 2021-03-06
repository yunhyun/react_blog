import mongoose, { Schema } from 'mongoose';
// 스키마 만드는 모듈
// const { Schema } = mongoose;

// DB에 저장될 스키마 설정(일종의 테이블 개념)
// 필드명:데이터타입
const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String], //문자열로 이루어진 배열 
    publishedDate: {
        type: Date,
        default: Date.now, 
    },
    // 회원제 게시판을 위해 스키마 수정 
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

// 모델 생성 
// model(스키마이름, 스키마객체)
const Post = mongoose.model('Post', PostSchema);
export default Post;

