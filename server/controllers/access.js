const accessService = require('./../services/access');
const  userCode = require('../codes/user');

module.exports = {
    /**
     * 用户注册
     * @param ctx koa上下文
     * @return {Promise.<void>}
     */
    async signup(ctx){
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null
        };


        let existOne  = await accessService.getExistOne(formData);
        console.log( "existOne",existOne );

        if ( existOne  ) {
            if ( existOne .name === formData.username ) {
                result.message = userCode.FAIL_USER_NAME_IS_EXIST;
                ctx.body = result;
                return
            }
            if ( existOne .email === formData.email ) {
                result.message = userCode.FAIL_EMAIL_IS_EXIST;
                ctx.body = result;
                return
            }
        }

        let userResult = await accessService.signup({
            email: formData.email,
            password: formData.password,
            name: formData.username,
            create_time: new Date().getTime(),
            authority: 1,
        });
        console.log("userResult", userResult );

        if ( userResult && userResult.insertId * 1 > 0) {
            result.success = true
        } else {
            result.message = userCode.ERROR_SYS
        }
        ctx.body = result;
        console.log('result',result)
    },
    /**
     * 用户登录
     * @param ctx koa 上下文
     * @return {Promise.<void>}
     */
    async login(ctx){
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null
        };

        let userResult = await accessService.login({
            username: formData.username,
            password: formData.password,
        });
        console.log('userResult',userResult);

        if(userResult&&formData.username === userResult.name){
            result.success = true;
        }else{
            result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        }

        if (  result.success === true ) {
            let session = ctx.session;
            session.isLogin= true;
            session.userName = userResult.name;
            session.userId = userResult.uid;
            ctx.body = result
        } else {
            ctx.body = result
        }

    },

    /**
     * 获取用户信息
     * @param    {obejct} ctx 上下文对象
     */
    async getLoginUserInfo( ctx ) {
        let session = ctx.session;
        let isLogin = session.isLogin;
        let userName = session.userName;

        console.log( 'session=', session );

        let result = {
            success: false,
            message: '',
            data: null,
        };
        if ( isLogin === true && userName ) {
            let userInfo = await accessService.getUserInfoByUserName( userName )
            if ( userInfo ) {
                result.data = userInfo;
                result.success = true
            } else {
                result.message = userCode.FAIL_USER_NO_LOGIN
            }
        } else {
            // TODO
        }
        ctx.body = result
    },

    /**
     * 校验用户是否登录
     * @Usage back-end interface
     * @param  {obejct} ctx 上下文对象
     */
    validateLogin( ctx ) {
        let result = {
            success: false,
            message: userCode.FAIL_USER_NO_LOGIN,
            data: null,
            code: 'FAIL_USER_NO_LOGIN',
        };
        let session = ctx.session;
        if( session && session.isLogin === true  ) {
            result.success = true;
            result.message = '';
            result.code = ''
        }
        return result
    },
    /**
     * 检测用户是否登陆并返回相关信息
     * @Usage front-end interface
     * @param ctx   koa上下文对象
     * @return {Promise.<void>}
     */
    async isLogined ( ctx ) {
        // 判断是否有session
        if ( ctx.session && ctx.session.isLogin === true) {
            console.log(ctx.session);
            ctx.body =ctx.session;
        }else {
            ctx.body ={
                isLogin:false
            }
        }
    },

    /**
     * 退出登录态
     * @param ctx koa上下文对象
     * @return {Promise.<void>}
     */
    async logout(ctx){
        const session = ctx.session;
        session.isLogin=false;
        ctx.status= 200;
    }
};