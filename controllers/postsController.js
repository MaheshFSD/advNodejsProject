const { post } = require("../routes/postsRoute");

const posts = [
    {
    id:1,
    title: 'Title1',
    comment: 'comment1',
    likes: 10,
    verified: true
},
    {
    id:2,
    title: 'Title2',
    comment: 'comment2',
    likes: 20,
    verified: false
},
    {
    id:3,
    title: 'Title3',
    comment: 'comment3',
    likes: 30,
    verified: true
}
];

exports.getAllPosts = (request, response) => {
response.json(posts);
}

exports.getPost = (request, response) => {
    const post = posts.find(post => post.id === +request.params.id);
    if(!post) return response.status(404).json({message: 'post not found'}); // can't send a response if we use status code 204
    response.status(200).json(post);
}

exports.createPost = (request, response) => {
    const {title, comment, likes, verified} = request.body;
    if(!title && !comment && !likes && 'verified' in request.body) return response.status(422).json('Mandatory fields are needed');
    posts.push({
        id: posts.length+1,
        title,
        comment,
        likes,
        verified
    })
    response.status(201).json({message: 'successfully created post'});
}

exports.updatePost = (request, response) => {
    const {title,comment,likes,verified} = request.body;
    const post = posts.find(post => post.id === +request.params.id)
    if(!post) return response.status(404).json({message: 'post not found'});
    if(title) post.title = title;
    if(likes) post.likes = likes;
    if(comment) post.comment = comment;
    if('verified' in request.body) post.verified = verified;
    response.status(200).json({message: 'Successfully updated'});
}

exports.deletePost = (request, response) => {
    const postIndex = posts.findIndex(post => post.id === +request.params.id);
    if(postIndex === -1) return response.status(404).json({message: 'Not found'});
    posts.splice(postIndex, 1);
    response.status(200).json({message: 'Post Successfully deleted..'});
}