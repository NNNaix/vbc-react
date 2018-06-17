/*
restful api  comment 子路由
 */
const commentController =require('./../controllers/comment');
const router = require('koa-router')();
const routers = router.post('/create',commentController.create)
    .get('/initial',commentController.initial)
    .get('/load',commentController.load)

module.exports  = routers;