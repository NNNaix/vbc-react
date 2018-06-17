const commentModel = require('./../models/comment');

module.exports={
    async create(comment){
        let result = await commentModel.create(comment);
        return result;
    },
    async initial(pid){
        let result =await commentModel.descLoad(pid);
        return result
    },
    async load(pid,row){
        let reuslt = await commentModel.descLoad(pid,row);
        return reuslt
    },
    async getTotalCount(pid){
        let result = await commentModel.getTotalCount(pid);
        return result

    }
}