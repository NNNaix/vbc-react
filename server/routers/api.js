/*
restful api 子路由
 */

const router = require('koa-router')();
const access = require('./access');
const post =require('./post');
const comment = require('./comment');

router.use('/access', access.routes(), access.allowedMethods())
    .use('/post',post.routes(),post.allowedMethods())
    .use('/comment',comment.routes(),comment.allowedMethods());

module.exports = router;
