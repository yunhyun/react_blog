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