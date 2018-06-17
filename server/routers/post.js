/*
restful api  post子路由
 */

const router = require('koa-router')();
const postController = require('./../controllers/post');

const routers = router.post('/publish',postController.publish)
    .get('/initial',postController.initial)
    .get('/load',postController.load)
    .get('/find',postController.find)
    .get('/filterInitial',postController.filterInitial)
    .get('/filterLoad',postController.filterLoad);


module.exports = routers;