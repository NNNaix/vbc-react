/*
restful api  access 子路由
 */

const router = require('koa-router')();
const accessController = require('./../controllers/access');

const routers = router
    .post('/signup',accessController.signup)
    .post('/login',accessController.login)
    .get('/isLogined', accessController.isLogined)
    .delete('/logout',accessController.logout);



module.exports =routers;