require('./db')
const express = require('express');
const course_router = require('./routers/courses')
const author_router = require('./routers/authors')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())

app.use('/api/courses',course_router);
app.use('/api/authors',author_router);

app.listen(port,()=> console.log('Server on ',port))