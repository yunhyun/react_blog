import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

/* 글조회, 글수정, 글삭제는 id를 받아와야 하는데 
   id는 db에서 부여하는 것인데 양식이 복잡함(5fbb5b4159b11a1d800c20c2). 각 함수는 id가 맞지 않으면 404를 냄. 
   따라서 id를 먼저 검증하고 글조회, 글수정, 글삭제 함수를 처리하도록 함 */

// ObjectId 검증 함수 
const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    return next();
};
   
// 글작성 
export const write = async ctx => {
    // 제목, 본문 등이 작성됐는지 검증 
    // const schema = Joi.object().keys({
    //     // required()는 필수항목
        
    //     title: Joi.string().required(),
    //     body: Joi.string().required(),
    //     // 배열에 대한 검증 
    //     tags: Joi.array()
    //         .items(Joi.string())
    //         .required(),
    // });

    // // 검증 실패시 
    // const result = Joi.valid(ctx.request.body, schema);
    // if(result.error) {
    //     ctx.status = 400;
    //     ctx.body = result.error;
    //     return;
    // }

    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title, 
        body, 
        tags,
    });
    try {
        await post.save(); // save() : db에 저장하는 함수. await로 저장을 완료할 때 까지 대기함 
        // await를 쓰려면 3번 라인처럼 async를 사용해야 함. 
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 글목록 
export const list = async ctx => {
    // 주소로 page 번호를 받아오고 없으면 1페이지로 
    // 주소는 string이라 숫자로 변환 
    const page = parseInt(ctx.query.page || '1', 10);
    if(page < 1){
        ctx.status = 400;
        return;
    }

    try {
        // find 호출 후 exec를 호출해야 서버에 쿼리를 요청함 
        const posts = await Post.find()
            .sort({ _id: -1 }) // 페이징을 위해 id 내림차순 정렬. 1이면 오름차순
            .limit(3) // 한번에 3개씩
            .skip((page-1) * 3) // 다음 페이지 3개 가져오기 
            //.lean()  lean 함수를 쓰면 mongoDB에서 바로 JSON으로 가져옴 
            .exec();
        // 마지막 페이지 알려주기 
        const postCount = await Post.countDocuments().exec();
        ctx.set('Last-Page', Math.ceil(postCount / 3)); // http 헤더에 담음 
        // body의 길이가 2자 이상이면 뒤에 ... 붙이기 
        // mongoDB에서 조회한 내용을 json으로 변환 
        ctx.body = posts
            .map(post => post.toJSON())
            .map(post => ({
                ...post,
                body:
                    post.body.length < 2 ? post.body : `${post.body.slice(0, 2)}...`, // 싱글쿼터가 아니라 키보드 1왼쪽에 있는 키 
            }));
    } catch (e)  {
        ctx.throw(500, e);
    }
};

// 글조회 
export const read = async ctx => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 글삭제 
export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        /*  remove() : 특정 조건 만족하는 데이터 모두 지움 
            findByIdAndRemove() : id를 찾아서 지움 
            findOneAndRemove() : 특정 조건 만족하는 데이터 하나 지움 */
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 글수정
export const update = async ctx => {
    const { id } = ctx.params;
    // const schema = Joi.object().keys({
    //     title: Joi.string(),
    //     body: Joi.string(),
    //     tags: Joi.array().items(Joi.string()),  
    // });
    // const result = Joi.valid(ctx.request.body, schema);
    // if (result.error) {
    //     ctx.status = 400; // Bad Request
    //     ctx.body = result.error;
    //     return;
    // }
    try {
        /* findByIdAndUpdate함수는 매개변수가 3개 
            첫번째: id
            두번째: 수정할 내용
            세번째: true면 수정 후 데이터 post에 저장 
                    false면 수정 전 데이터 post에 저장*/
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, { new: true, }).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

