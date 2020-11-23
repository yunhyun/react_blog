import Post from '../../models/post';

// 글작성 
export const write = async ctx => {
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
    try {
        // find 호출 후 exec를 호출해야 서버에 쿼리를 요청함 
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch (e)  {
        ctx.throw(500, e);
    }
};

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

export const update = async ctx => {
    const { id } = ctx.params;
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

