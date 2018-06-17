const postModel = require('./../models/post');

module.exports={
    /**
     * 创建新的post
     * @param post
     * @return {Promise.<*>}
     */
    async publish(post){
        let resultData = await postModel.create(post);
        return resultData;
    },
    /**
     * 返回最新的5条post数据
     * @return {Promise.<*>}
     */
    async initialOfficialNews(){
        let resultData = await postModel.getOfficialPost();
        return resultData;
    },
    async descLoad(row){
        let resultData = await postModel.descLoad(row);
        return resultData;
    },
    /**
     * 根据pid查询post数据
     * @param pid
     * @return {Promise.<void>}
     */
    async find(pid){
        let resultData = await postModel.find(pid);
        return resultData;
    },
    /**
     * 获取所有post数据的数量总数
     * @return {Promise.<*>}
     */
    async getTotalCount(categroy){
        let resultData = await postModel.totalCount();
        return resultData;
    },
    async filterLoad(categroy,row){
        let resultData = await postModel.filterLoad(categroy,row);
        return resultData;
    }

};