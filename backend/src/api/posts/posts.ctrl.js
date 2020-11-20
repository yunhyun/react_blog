let postId = 1;

const posts = [
    {
        id: 1,
        title: '제목1',
        body: '내용',
    },
];

// 글작성 
exports.write = ctx => {
    // rest api 의 요청 데이터는 ctx.request.body에 들어있음. 
    const { title, body } = ctx.request.body;
    postId += 1;
    const post = { id: postId, title, body };
    // 위에서 선언한 posts 배열에 추가 
    posts.push(post);
    ctx.body = post;
};

// 글목록 
exports.list = ctx => {
    ctx.body = posts;
};

// 글조회 
exports.read = ctx => {
    const { id } = ctx.params;
    const post = posts.find(p => p.id.toString() === id);
    if(!post){
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    // 전체 글을 화면에 띄움 
    ctx.body = post;
};

// 글삭제 
exports.remove = ctx => {
    const { id } = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);  
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    posts.slice(index, 1);
    ctx.status = 204; // no content
};

// 글수정(전체 덮어쓰기) 
exports.replace = ctx => {
    const { id } = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    posts[index] = {
        id,
        ...ctx.request.body,
    };
    // 해당 글을 화면에 띄움 
    ctx.body = posts[index];
}

// 글수정(일부 수정)
exports.update = ctx => {
    const { id } = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.',
        };
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index];

};



