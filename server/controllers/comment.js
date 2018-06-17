const commentService = require('./../services/comment')
const  commentCode = require('../codes/comment');

module.exports = {
    /**
     * 创建一条评论
     * @param ctx
     * @return {Promise.<void>}
     */
    async create(ctx){
        const formData = ctx.request.body;
        let result = {
            success:false,
            message:"",
            data:null
        };
        let commentResult = commentService.create(formData);


        if ( commentResult && commentResult.insertId * 1 > 0) {
            result.success = true
        } else {
            result.message = commentCode.ERROR_SYS
        }
        ctx.body = result;
        console.log('result',result)

    },
    /**
     * 初始化时加载 comment 数据
     * @param ctx
     * @return {Promise.<void>}
     */
    async initial(ctx){
        const pid = ctx.request.query.pid;
        console.log(pid);
        const commentResult = await commentService.initial(pid);
        const commentTotalCount =await commentService.getTotalCount(pid);
        console.log('commentMaxLength',commentTotalCount);
        ctx.body= {
            items:commentResult.items,
            isInsufficient:commentResult.isInsufficient,
            totalCount:commentTotalCount
        }
        console.log(commentResult)
    },
    /**
     * 加载新的数据操作
     * @param ctx
     * @return {Promise.<void>}
     */
    async load(ctx){
        const descRow= ctx.request.query.descRow;
        const pid = ctx.request.query.pid;
        console.log('desRow',ctx.query);
        const commentResult = await commentService.load(pid,descRow);
        ctx.body= commentResult
    },
};