const convertDate  = require( './../util/convertDate');
const postService = require('./../services/post')
const  postCode = require('../codes/post');
module.exports = {
    /**
     * 发布帖子
     * @param ctx
     * @return {Promise.<void>}
     */
    async publish(ctx){
        let formData=ctx.request.body;
        let result = {
            success:false,
            message:"",
            data:null
        };

        const postResult = await postService.publish({
            post_title:formData.title,
            post_author:ctx.session.userName,
            post_categroy:formData.categroy,
            post_publish_time:convertDate(new Date()),
            post_content:formData.content
        })

        if ( postResult && postResult.insertId * 1 > 0) {
            result.success = true
        } else {
            result.message = postCode.ERROR_SYS
        }
        ctx.body = result;
    },

    /**
     * 初始化时加载post数据
     * @param ctx
     * @return {Promise.<void>}
     */
    async initial(ctx){
        const postResult = await postService.descLoad();
        // const postTotalCount =await postService.getTotalCount();
        const officialNews = await postService.initialOfficialNews();
        ctx.body= {
            items:postResult.items,
            isInsufficient:postResult.isInsufficient,
            officialItems:officialNews,
        }
    },
    /**
     * 添加新的post数据操作
     * @param ctx
     * @return {Promise.<void>}
     */
    async load(ctx){
        const pid= ctx.request.query.pid;
        const postResult = await postService.descLoad(pid);
        console.log(pid)
        ctx.body= postResult
    },
    /**
     * 查询操作
     * @param ctx
     * @return {Promise.<void>}
     */
    async find(ctx){
        const pid = ctx.request.query.pid;
        const postResult = await postService.find(pid);
        console.log(postResult)
        ctx.body = postResult;
    },
    /**
     * 通过条件 初始化post
     * @param ctx
     * @return {Promise.<void>}
     */
    async filterInitial(ctx){
        const filter = ctx.request.query.filter;
        let postResult =await postService.filterLoad(filter);

        // const postTotalCount =await postService.getTotalCount(filter);
        ctx.body= {
            items:postResult.items,
            isInsufficient:postResult.isInsufficient,
        }
    },
    async filterLoad(ctx){
        const filter =ctx.request.query.filter;
        const pid= ctx.request.query.pid;

        let postResult =await postService.filterLoad(filter,pid);

        ctx.body= postResult
    }
};