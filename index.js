console.log('Hello World');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/posts',require('./routes/postsRoute'));
app.use('/authors', require('./routes/authorsRoute'));

app.listen(4000, () => {
    console.log('server is listening on 4000');
})